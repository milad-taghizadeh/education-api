import { NestFactory } from '@nestjs/core';
import { EnrollModule } from './enroll.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(EnrollModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      credentials: true,
      origin: '*',
    });

    app.use(cookieParser(process.env.COOKIE_SECRET));
    
    Logger.verbose('::::::::::: ENROLL : 3002 =======> STARTED :::::::::::');
    await app.listen(3002, '0.0.0.0');
}
bootstrap();
