import { Module } from '@nestjs/common';
import { EpisodeService } from './services/episode.service';
import { EpisodeController } from './episode.controller';
import { PrismaService } from '@app/prisma';
import { EpisodeRepository } from './repositories/episode.repository';
import { CourseRepository } from '../course/repositories/course.repository';

@Module({
  controllers: [EpisodeController],
  providers: [EpisodeService, PrismaService, EpisodeRepository, CourseRepository],
})
export class EpisodeModule {}
