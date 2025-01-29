import { Module } from '@nestjs/common';

import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [CourseModule, LessonModule],
  controllers: [],
  providers: [],
})
export class EducationModule {}
