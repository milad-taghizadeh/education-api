import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { CommonModule, TokenService } from '@app/common';
import { PrismaModule } from '@app/prisma';
import { OtpRepository } from './repositories/otp.repository';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC } from './enums/grpc.enum';
import { VerifyToken } from '@app/common';
import { UserRepository } from 'apps/user/src/repositories/user.repository';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
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
  providers: [AuthService, OtpRepository],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyToken).forRoutes('*');
  }
}
