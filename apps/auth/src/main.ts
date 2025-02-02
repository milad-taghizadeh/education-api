import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  
  const port = parseInt(process.env.AUTH_SERVER, 10) || 3000;
  
  Logger.verbose(`::::::::::: AUTH : ${port} =======> STARTED :::::::::::`);
  try {
    await app.listen(port, '0.0.0.0');
  } catch (error) {
    Logger.error(`Failed to start Auth server on port ${port}:`, error);
    process.exit(1);
  }
}
bootstrap();
