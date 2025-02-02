import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = parseInt(process.env.USER_MICROSERVICE, 10) || 5002;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      url: `localhost:${port}`,
      package: 'user',
      protoPath: 'libs/proto/user.proto',
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  Logger.verbose(`::::::::::: User : ${port} =======> STARTED :::::::::::`);
  try {
    await app.listen();
  } catch (error) {
    Logger.error(`Failed to start microservice on port ${port}:`, error);
    process.exit(1);
  }
}
bootstrap();
