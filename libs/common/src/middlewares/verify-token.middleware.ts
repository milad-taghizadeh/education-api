import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { TokenService } from '../token/token.service';
import { UserRepository } from 'apps/user/src/repositories/user.repository';
import { CookiePayload } from '@app/common';

@Injectable() // Add this decorator
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
    console.log(payload);
    if (!payload) {
      return next();
    }
    const user = await this.userRepository.findById(payload.UserId);

    //set user in req
    req.user = { UserId: user.id };

    next();
  }
}
