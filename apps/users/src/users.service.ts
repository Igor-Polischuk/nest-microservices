import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'proto/user';
import { GrpcError, GrpcException } from 'libs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDto) {
    const isUserExist = await this.userRepository.findOne({
      where: {
        email: createUserDTO.email,
      },
    });
    if (isUserExist) {
      throw new GrpcException({
        code: GrpcError.INVALID_ARGUMENT,
        message: 'Email is taken',
      });
    }

    return this.userRepository.save(createUserDTO);
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new GrpcException({
        code: GrpcError.NOT_FOUND,
        message: 'User not found',
      });
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new GrpcException({
        code: GrpcError.NOT_FOUND,
        message: 'User not found',
      });
    }

    return user;
  }
}
