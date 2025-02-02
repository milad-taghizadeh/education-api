import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'apps/user/src/repositories/user.repository';
import { TokenService } from '../token/token.service';
import { VerifyToken } from './verify-token.middleware';

@Module({
  providers: [UserRepository, TokenService, JwtService, VerifyToken],
  exports: [UserRepository, TokenService, VerifyToken],
})
export class VerifyTokenMiddlewareModule {}
