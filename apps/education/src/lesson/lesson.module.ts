import { Module } from '@nestjs/common';
import { LessonService } from './services/lesson.service';
import { LessonController } from './lesson.controller';
import { PrismaService } from '@app/prisma';
import { LessonRepository } from './repositories/lesson.repository';

@Module({
  controllers: [LessonController],
  providers: [LessonService, PrismaService, LessonRepository],
})
export class LessonModule {}
