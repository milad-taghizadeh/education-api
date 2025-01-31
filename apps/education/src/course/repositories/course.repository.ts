import { Injectable } from '@nestjs/common';
import { ICourseRepository } from '../interfaces/course.interface';
import { Course } from '@prisma/client';
import { PrismaService } from '@app/prisma';

@Injectable()
export class CourseRepository implements ICourseRepository<Course> {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<Course, 'id' | "createdAt" | "updatedAt">): Promise<Course> {
    return await this.prisma.course.create({
      data,
    });
  }

  async update(id: string, data: Partial<Course>): Promise<Course> {
    return await this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async findById(id: string): Promise<Course> {
    return await this.prisma.course.findUnique({
      where: { id },
    });
  }

  async findByTitle(title: string): Promise<Course> {
    return await this.prisma.course.findFirst({
      where: { title },
    });
  }

  async findByLessonId(lessonId: string): Promise<Course[]> {
    return await this.prisma.course.findMany({
      where: { lessonId },
    });
  }

  async remove(id: string): Promise<Course> {
    return await this.prisma.course.delete({
      where: { id },
    });
  }
}
