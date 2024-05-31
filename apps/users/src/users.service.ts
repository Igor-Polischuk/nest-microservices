import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'proto/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createUser(createUserDTO: CreateUserDto) {
    return this.userRepository.save(createUserDTO);
  }

  async findById(id: string) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
