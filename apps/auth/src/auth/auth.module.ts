import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { CommonModule, TokenService } from '@app/common';
import { PrismaModule } from '@app/prisma';
import { OtpRepository } from './repositories/otp.repository';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GRPC } from './enums/grpc.enum';
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
          url: `localhost:${process.env.USER_MICROSERVICE}`,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, OtpRepository],
})
export class AuthModule {}
