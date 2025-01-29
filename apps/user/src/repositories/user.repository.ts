import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user.interface';
import { PrismaService } from 'libs/prisma/src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository<User> {
  constructor(private readonly prismaService: PrismaService) {}

  async create(phone: string): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        phone,
      },
    });
  }

  update(id: string | number, data: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByPhone(phone: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        phone,
      },
    });
  }

  findMany?(filters: User): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
