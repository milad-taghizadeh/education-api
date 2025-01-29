import { Module } from '@nestjs/common';

import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { EpisodeModule } from './episode/episode.module';

@Module({
  imports: [CourseModule, LessonModule, EpisodeModule],
  controllers: [],
  providers: [],
})
export class EducationModule {}
