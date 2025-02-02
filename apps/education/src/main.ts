import { NestFactory } from '@nestjs/core';
import { EducationModule } from './education.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(EducationModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: '*',
  });

  const port = parseInt(process.env.EDUCATION_SERVER, 10) || 3001;

  Logger.verbose(`::::::::::: Education : ${port} =======> STARTED :::::::::::`);
  try {
    await app.listen(port, '0.0.0.0');
  } catch (error) {
    Logger.error(`Failed to start Education server on port ${port}:`, error);
    process.exit(1);
  }
}
bootstrap();
