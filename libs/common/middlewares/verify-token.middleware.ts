import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'apps/auth/src/auth/services/token.service';
import { UserRepository } from 'apps/user/src/repositories/user.repository';
import { CookiePayload } from "apps/auth/src/auth/types/payload";
import { JwtService } from '@nestjs/jwt';

export class VerifyToken implements NestMiddleware {
  //DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  // USE func.
  async use(
    req: Request & { user: CookiePayload },
    res: any,
    next: NextFunction,
  ) {
    const token = req.cookies.accessToken;
    if (!token) {
      return next();
    }

    // verify token and get the user
    const payload = this.tokenService.verifyToken(token);
    if (!payload) {
      return next();
    }
    const user = await this.userRepository.findById(payload.UserId);

    //set user in req
    req.user = { UserId: user.id };

    next();
  }
}
