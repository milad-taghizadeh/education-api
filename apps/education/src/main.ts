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

  Logger.verbose('::::::::::: Education : 3001 =======> STARTED :::::::::::');
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
