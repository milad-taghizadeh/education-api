import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5002',
      package: 'user',
      protoPath: join(__dirname, 'proto/user.proto'),
    },
  });
  console.log('user started ::: 5002');
  await app.listen();
}
bootstrap();
