import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './../dto/create-lesson.dto';
import { UpdateLessonDto } from './../dto/update-lesson.dto';
import { Lesson } from '@prisma/client';
import { LessonRepository } from '../repositories/lesson.repository';
import { LessonMessage } from '../messages/lesson.message';
import { CreateLesson } from '../types/lesson.type';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository
  ) {}

  async create(data : CreateLesson) : Promise<Lesson> {
    const { title, description, media_path } = data;
    await this._checkDuplicateTitle(title);
    // TODO: configure multer uploader
    return await this.lessonRepository.create({
      title,
      description,
      media_path
    });
  }

  findAll() {
    return `This action returns all lesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }

  private async _checkDuplicateTitle(title: string) : Promise<void> {
    const lesson = await this.lessonRepository.findByTitle(title);
    if (lesson) {
      throw new Error(LessonMessage.CHECK_DUPLICATE);
    }
  }

}
