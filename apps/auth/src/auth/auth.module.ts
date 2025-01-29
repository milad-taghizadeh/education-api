import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { PrismaModule } from '@app/prisma';
import { OtpRepository } from './repositories/otp.repository';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, GrpcService, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC } from './enums/grpc.enum';

@Module({
  imports: [PrismaModule,
    ClientsModule.register([
      {
        name: GRPC.USER_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: GRPC.USER_PACKAGE,
          protoPath: 'libs/proto/user.proto',
          url: 'localhost:5002',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, OtpRepository, JwtService],
})
export class AuthModule {}
