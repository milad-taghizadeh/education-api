import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OwnCourse } from '../types/course.type';
import { CourseUser } from '@prisma/client';
import { CourseRepository } from '../repositories/course.repository';
import { CourseMessage } from '../messages/course.message';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}
  async ownCourse(data: OwnCourse, userId: string): Promise<CourseUser> {
    await this._checkCourseExist(data.courseId);
    const ownedCourse = await this.courseRepository.findOwnedCourses(userId);
    if (!ownedCourse) {
      await this.courseRepository.createIndex(userId);
    }
    return await this.courseRepository.ownCourse(userId, data);
  }

  private async _checkCourseExist(courseId: string): Promise<void> {
    const course = await this.courseRepository.findCourse(courseId);
    if (!course) {
      throw new NotFoundException(CourseMessage.COURSE_NOT_FOUND);
    }
  }
}
