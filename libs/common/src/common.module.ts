import { Module } from '@nestjs/common';

import { TokenService } from './token/token.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'apps/user/src/repositories/user.repository';

@Module({
  imports: [],
  providers: [TokenService, JwtService, UserRepository],
  exports: [UserRepository, TokenService],
})
export class CommonModule {}
