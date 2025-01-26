import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5001',
      package: 'auth',
      protoPath: join(__dirname, 'proto/auth.proto'),
    },
  });
  console.log('auth started ::: 5001');
  await app.listen();
}
bootstrap();
