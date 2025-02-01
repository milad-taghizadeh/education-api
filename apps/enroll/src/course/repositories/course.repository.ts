import { Injectable } from '@nestjs/common';
import { ICourseRepository } from '../interfaces/course.interface';
import { PrismaService } from '@app/prisma';
import { OwnCourse } from '../types/course.type';
import { CourseUser } from '@prisma/client';

@Injectable()
export class CourseRepository  {
  constructor(private readonly prisma: PrismaService) {}

  async createIndex(userId : string): Promise<CourseUser> {
    return await this.prisma.courseUser.create({
      data: {
        userId,
        courseId: [],
      }
    }); 
  }

  async ownCourse(userId : string, data: Omit<OwnCourse, "id" | "createdAt" | "updatedAt">): Promise<CourseUser> {
    const userIndex = await this.findOwnedCourses(userId);
    return await this.prisma.courseUser.upsert({
      where: { id: userIndex.id },
      update: {
        courseId: [data.courseId],
      },
      create: null
    }); 
  }

  async findOwnedCourses(userId : string): Promise<CourseUser> {
    return await this.prisma.courseUser.findFirst({
      where: {
        userId,      
      }
    }); 
  }

  async findCourse(userId : string): Promise<CourseUser> {
    return await this.prisma.courseUser.findFirst({
      where: {
        userId,      
      }
    }); 
  }
}