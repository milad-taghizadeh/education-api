import { Injectable } from '@nestjs/common';
import { ICourseRepository } from '../interfaces/course.interface';
import { PrismaService } from '@app/prisma';
import { OwnCourse } from '../types/course.type';
import { Course, CourseUser } from '@prisma/client';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createIndex(userId: string): Promise<CourseUser> {
    return await this.prisma.courseUser.create({
      data: {
        userId,
        courseId: [],
      },
    });
  }

  async ownCourse(
    userId: string,
    data: Omit<OwnCourse, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CourseUser> {
    // First find the CourseUser entry
    const courseUser = await this.prisma.courseUser.findFirst({
      where: { userId },
    });

    // Then update using the id
    return await this.prisma.courseUser.update({
      where: { id: courseUser?.id },
      data: {
        courseId: {
          push: data.courseId,
        },
      },
    });
  }

  async findOwnedCourses(userId: string): Promise<CourseUser> {
    return await this.prisma.courseUser.findFirst({
      where: {
        userId,
      },
    });
  }

  async findCourse(courseId: string): Promise<Course> {
    return await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
  }
}
