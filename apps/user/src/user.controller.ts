import { Controller } from '@nestjs/common';
import { UserService } from './services/user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ICheckUserExist, ICreateUserData } from './interfaces/user.interface';
import { User } from '@prisma/client';
import { GRPC } from './enums/grpc.enum';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @GrpcMethod(GRPC.PROTO_USER_SERVICE, GRPC.CHECK_USER_EXIST)
  async checkUserExist(data: ICheckUserExist): Promise<User | {}> {
    const user = await this.userService.checkUserExist(data);
    return user ? user : {};
  }

  @GrpcMethod(GRPC.PROTO_USER_SERVICE, GRPC.CREATE_USER)
  async createUser(data: ICreateUserData): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }
}
