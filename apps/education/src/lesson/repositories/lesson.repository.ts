import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Lesson } from '@prisma/client';
import { ILessonRepository } from '../interfaces/lesson.interface';

@Injectable()
export class LessonRepository implements ILessonRepository<Lesson> {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Omit<Lesson, "id" | "createdAt" | "updatedAt">): Promise<Lesson> {
    return await this.prismaService.lesson.create({
      data: {
        ...data
      }
    })
  }

  async update(id: string, data: Lesson): Promise<Lesson> {
    return await this.prismaService.lesson.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
  }

  async findById(id: string): Promise<Lesson> {
    return await this.prismaService.lesson.findUnique({
      where : {
        id
      }
    })
  }

  async index(id: string): Promise<Lesson> {
    throw new Error('Method not implemented.');
  }

  async findByTitle(title: string): Promise<Lesson> {
    return await this.prismaService.lesson.findFirst({
      where: {
        title: title
      }
    })
  }

  async remove(id: string): Promise<Lesson> {
    return await this.prismaService.lesson.delete({
      where: {
        id: id
      }
    })
  }

}
