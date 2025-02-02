import { Injectable, NotFoundException } from '@nestjs/common';
import { ICheckUserExist } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkUserExist(data: ICheckUserExist): Promise<User> {
    const user = await this.userRepository.findByPhone(data.phone);

    // Return the user wrapped in an object with 'user' property
    return user
  }

  async createUser(data: { phone: string }): Promise<User> {
    const user = await this.userRepository.create(data.phone);
    await this.userRepository.createIndex(user.id);
    return {
      id: user.id,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
