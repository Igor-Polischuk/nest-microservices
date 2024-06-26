import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { TokenEntity } from './database/entities/token.entity';
import { TokenPayload } from './types';

@Injectable()
export class RefreshTokenService {
  private readonly refreshTokenSecret: string;
  private readonly refreshTokenLive: string;

  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private configService: ConfigService,
  ) {
    this.refreshTokenSecret = configService.get<string>('REFRESH_TOKEN_SECRET');
    this.refreshTokenLive = configService.get<string>('REFRESH_TOKEN_MAX_AGE');
  }

  async generateRefreshToken(payload: TokenPayload): Promise<string> {
    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenLive,
    });
    return refreshToken;
  }

  async saveRefreshToken(userId: string, token: string): Promise<string> {
    await this.tokenRepository.save({ userId, token });

    return token;
  }

  async findRefreshToken(token: string): Promise<TokenEntity | null> {
    return this.tokenRepository.findOne({ where: { token } });
  }

  async validateRefreshToken(
    refreshToken: string,
  ): Promise<{ email: string; id: number }> {
    try {
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret);
      return decoded as { email: string; id: number };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async clearRefreshToken(token: string): Promise<void> {
    const tokenData = await this.tokenRepository.findOne({
      where: {
        token,
      },
    });

    if (!tokenData) {
      throw new UnauthorizedException('Token doesn`t exist');
    }

    await this.tokenRepository.remove(tokenData);
  }
}
