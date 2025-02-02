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
    
    const port = parseInt(process.env.ENROLL_SERVER, 10) || 3002;
    
    Logger.verbose(`::::::::::: ENROLL : ${port} =======> STARTED :::::::::::`);
    try {
      await app.listen(port, '0.0.0.0');
    } catch (error) {
      Logger.error(`Failed to start Enroll server on port ${port}:`, error);
      process.exit(1);
    }
}
bootstrap();
