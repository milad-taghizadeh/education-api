import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEpisodeDto } from './../dto/create-episode.dto';
import { UpdateEpisodeDto } from './../dto/update-episode.dto';
import { EpisodeRepository } from '../repositories/episode.repository';
import { CreateEpisode, UpdateEpisode } from '../types/episode.type';
import { CourseRepository } from '../../course/repositories/course.repository';
import { EpisodeMessage } from '../messages/episode.message';
import { Episode } from '@prisma/client';

@Injectable()
export class EpisodeService {
  constructor(
    private readonly episodeRepository: EpisodeRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

  async create(createEpisode: CreateEpisode): Promise<Episode> {
    const { courseId, title, description, media_path } = createEpisode;
    await this._checkCourseExist(courseId);
    await this._checkDuplicateTitle(title);
    return await this.episodeRepository.create({
      title,
      description,
      media_path,
      courseId,
    });
  }

  async findAll(courseId: string): Promise<Episode[]> {
    await this._checkCourseExist(courseId);
    return await this.episodeRepository.findAll(courseId);
  }

  async findOne(id: string): Promise<Episode> {
    const episode = await this.episodeRepository.findById(id);
    if (!episode) {
      throw new NotFoundException(EpisodeMessage.EPISODE_NOT_FOUND);
    }
    return episode;
    
  }

  async update(id: string, updateEpisode: UpdateEpisode): Promise<Episode> {
    await this._checkEpisodeExist(id);
    if (updateEpisode.title) {
      await this._checkDuplicateTitle(updateEpisode.title);
    }
    if (updateEpisode.courseId) {
      await this._checkCourseExist(updateEpisode.courseId);
    }

    return this.episodeRepository.update(id, updateEpisode);
  }

  async remove(id: string): Promise<{ message: string; episode: Episode }> {
    await this._checkEpisodeExist(id);
    const episode = await this.episodeRepository.remove(id);
    return { message: EpisodeMessage.EPISODE_REMOVED, episode };
  }

  private async _checkCourseExist(courseId: string): Promise<void> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException(EpisodeMessage.COURSE_NOT_FOUND);
    }
  }

  private async _checkDuplicateTitle(title: string): Promise<void> {
    const lesson = await this.episodeRepository.findByTitle(title);
    if (lesson?.title == title) {
      throw new ConflictException(EpisodeMessage.EPISODE_TITLE_DUPLICATE);
    }
  }

  private async _checkEpisodeExist(episodeId: string): Promise<void> {
    const episode = await this.episodeRepository.findById(episodeId);
    if (!episode) {
      throw new NotFoundException(EpisodeMessage.EPISODE_NOT_FOUND);
    }
  }
}
