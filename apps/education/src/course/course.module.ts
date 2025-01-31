import { Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseController } from './course.controller';
import { PrismaService } from '@app/prisma';
import { CourseRepository } from './repositories/course.repository';
import { LessonRepository } from '../lesson/repositories/lesson.repository';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, CourseRepository, LessonRepository],
})
export class CourseModule {}
