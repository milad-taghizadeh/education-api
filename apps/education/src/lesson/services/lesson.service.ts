import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './../dto/create-lesson.dto';
import { UpdateLessonDto } from './../dto/update-lesson.dto';
import { Lesson } from '@prisma/client';
import { LessonRepository } from '../repositories/lesson.repository';
import { LessonMessage } from '../messages/lesson.message';
import { CreateLesson, UpdateLesson } from '../types/lesson.type';
import { NotFoundError } from 'rxjs';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async create(data: CreateLesson): Promise<Lesson> {
    const { title, description, media_path } = data;
    await this._checkDuplicateTitle(title);
    // TODO: configure multer uploader
    return await this.lessonRepository.create({
      title,
      description,
      media_path,
    });
  }

  async findAll(): Promise<Lesson[]> {
    return await this.lessonRepository.index();
  }

  async findOne(id: string): Promise<Lesson> {
    return await this.lessonRepository.findById(id);
  }

  async update(id: string, updateLesson: UpdateLesson): Promise<Lesson> {
    const { title, description, media_path } = updateLesson;
    await this._checkLessonExist(id);
    await this._checkDuplicateTitle(title);
    // TODO: configure multer uploader
    return await this.lessonRepository.update(id, { ...updateLesson });
  }

  async remove(id: string): Promise<{ message: string, id: string }> {
    await this._checkLessonExist(id);
    await this.lessonRepository.remove(id);
    return { message: LessonMessage.DELETED , id};
  }

  private async _checkDuplicateTitle(title: string): Promise<void> {
    const lesson = await this.lessonRepository.findByTitle(title);
    if (lesson) {
      throw new BadRequestException(LessonMessage.CHECK_DUPLICATE);
    }
  }

  private async _checkLessonExist(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findById(id);
    if (!lesson) {
      throw new NotFoundException(LessonMessage.NOT_FOUND);
    }
    return lesson;
  }
}
