import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
  //   transport: Transport.GRPC,
  //   options: {
  //     url: 'localhost:5001',
  //     package: 'auth',
  //     protoPath: join(__dirname, 'auth/proto/auth.proto'),
  //   },
  // });
  // app.connectMicroservice({
  //   transport: Transport.GRPC,
  //   options: {
  //     url: 'localhost:5001',
  //     package: 'auth',
  //     protoPath: join(__dirname, 'auth/proto/auth.proto'),
  //   },  
  // })
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  
  console.log('auth started ::: 5001');
  console.log('auth started ::: 3000');
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
