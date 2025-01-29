import { Controller, Get } from '@nestjs/common';
import { UserService } from './services/user.service';
import { promises } from 'dns';
import { GrpcMethod } from '@nestjs/microservices';
import { ICheckUserExist, ICreateUserData } from './interfaces/user.interface';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @GrpcMethod('UserService', 'checkUserExist')
  async checkUserExist(data: ICheckUserExist): Promise<User | {}> {
    const user = await this.userService.checkUserExist(data);
    return user ? user : {};
  }

  @GrpcMethod('UserService', 'createUser')
  async createUser(data: ICreateUserData): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }
}
