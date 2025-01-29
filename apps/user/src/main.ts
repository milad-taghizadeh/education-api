import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5002',
      package: 'user',
      protoPath: 'libs/proto/user.proto',
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  console.log('user started ::: 5002');
  await app.listen();
}
bootstrap();
