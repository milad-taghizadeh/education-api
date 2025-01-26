import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { PrismaModule } from '@app/prisma';
import { OtpRepository } from './repositories/otp.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, OtpRepository, JwtService],
})
export class AuthModule {}
