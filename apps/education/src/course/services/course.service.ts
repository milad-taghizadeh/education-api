import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './../dto/create-course.dto';
import { UpdateCourseDto } from './../dto/update-course.dto';
import { Course } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { CourseRepository } from '../repositories/course.repository';
import { CourseMessage, LessonMessage } from '../messages/course.message';
import { LessonRepository } from '../../lesson/repositories/lesson.repository';
import { CreateCourse } from '../types/course.type';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly lessonRepository: LessonRepository,
  ) {}

  async create(createCourse: CreateCourse): Promise<Course> {
    const episodeQTY: number = 0;
    await this._checkCourseExist(createCourse.title);
    await this._checkLessonExist(createCourse.lessonId);
    return await this.courseRepository.create({
      ...createCourse,
      episodeQty: episodeQTY,
    });
  }

  async findAllCourses(lessonId: string): Promise<Course[]> {
    await this._checkLessonExist(lessonId);
    return await this.courseRepository.findByLessonId(lessonId);
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException(CourseMessage.COURSE_NOT_FOUND);
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) : Promise<Course> {
    await this.findOne(id);
    console.log(updateCourseDto.title);
    if (updateCourseDto.lessonId){
      await this._checkLessonExist(updateCourseDto.lessonId);
    }
    if (updateCourseDto.title){
      await this._checkTitleDuplicate(updateCourseDto.title);
    }
    return await this.courseRepository.update(id, {
      ...updateCourseDto,
    });
  }

  async remove(id: string): Promise<{ message: string; course: Course }> {
    await this.findOne(id);
    const course = await this.courseRepository.remove(id);
    return { message: CourseMessage.COURSE_REMOVED, course };
  }


  private async _checkCourseExist(title: string ): Promise<void> {
    const course = await this.courseRepository.findByTitle(title);
    if (course) {
      throw new ConflictException(CourseMessage.COURSE_EXIST);
    }
  }

  private async _checkTitleDuplicate(title: string): Promise<void> {
    const course = await this.courseRepository.findByTitle(title)

    if (course?.title == title) {
      throw new ConflictException(CourseMessage.COURSE_TITLE_DUPLICATE);
    }
  }

  private async _checkLessonExist(lessonId: string): Promise<void> {
    const lesson = await this.lessonRepository.findById(lessonId);
    if (!lesson) {
      throw new NotFoundException(LessonMessage.LESSON_NOT_FOUND);
    }
  }
}
