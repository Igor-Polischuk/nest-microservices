import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { callGrpcService } from 'libs/common';
import { SignInDto, TokensDTO } from 'proto/auth';
import {
  CreateUserDto,
  User,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from 'proto/user';
import * as bcrypt from 'bcrypt';
import { GrpcError, GrpcException } from 'libs/common/exceptions';
import { TokenPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  private userGrpcService: UserServiceClient;
  constructor(
    @Inject(USER_PACKAGE_NAME) private grpcClient: ClientGrpc,
    private configService: ConfigService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {
    this.userGrpcService =
      grpcClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }
  async validateUser(credentials: SignInDto): Promise<null | User> {
    const user = await callGrpcService(
      this.userGrpcService.findUserByEmail({ email: credentials.email }),
    );

    if (!user) {
      throw new GrpcException({
        code: GrpcError.UNAUTHENTICATED,
        message: 'Invalid credentials',
      });
    }

    const valid = await bcrypt.compare(credentials.password, user.password);

    if (!valid) {
      throw new GrpcException({
        code: GrpcError.UNAUTHENTICATED,
        message: 'Invalid credentials',
      });
    }
    return user;
  }
  async sigUp(createUserDto: CreateUserDto): Promise<TokensDTO> {
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      Number(this.configService.get<string>('SALT')),
    );

    const user = await callGrpcService(
      this.userGrpcService.createUser({
        ...createUserDto,
        password: hashPassword,
      }),
    );

    return {
      accessToken: user.id,
      refreshToken: user.email,
    };
  }
  async signIn(credentials: SignInDto): Promise<TokensDTO> {
    const user = await this.validateUser(credentials);

    const tokens = this.generateTokens({ email: user.email, id: user.id });

    return tokens;
  }

  private async generateTokens({
    email,
    id,
  }: TokenPayload): Promise<TokensDTO> {
    const payload: TokenPayload = { email, id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken =
      await this.refreshTokenService.generateRefreshToken(payload);
    //TODO: handle when user sign-ups from different devices and delete invalid tokens
    await this.refreshTokenService.saveRefreshToken(id, refreshToken);

    return {
      refreshToken,
      accessToken,
    };
  }
}
