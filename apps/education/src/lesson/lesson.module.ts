import { Module } from '@nestjs/common';
import { LessonService } from './services/lesson.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from '@config/config';
import { LessonController } from './lesson.controller';
import { PrismaService } from '@app/prisma';
import { LessonRepository } from './repositories/lesson.repository';

@Module({
  controllers: [LessonController],
  imports: [MulterModule.register(multerOptions)],
  providers: [LessonService, PrismaService, LessonRepository],
})
export class LessonModule {}
