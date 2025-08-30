import { HttpException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repository/users.repository';
import { Types } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @Inject(UsersRepository) private usersRepository: UsersRepository
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.create(createUserDto);
      return user;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Error creating user');
    }

  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAll();
    try {
      return users;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      Logger.error(error);
      throw new InternalServerErrorException('Error retrieving users');
    }
  }

  async findOne(id: Types.ObjectId): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ _id: id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      Logger.error(error);
      throw new InternalServerErrorException('Error retrieving user');
    }
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.update({ _id: id }, updateUserDto);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      Logger.error(error);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async remove(id: Types.ObjectId): Promise<User> {
    try {
      const user = await this.usersRepository.remove({ _id: id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      Logger.error(error);
      throw new InternalServerErrorException('Error removing user');
    }
  }
}