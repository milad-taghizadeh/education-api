import { Episode } from '@prisma/client';
import { IEpisodeRepository } from '../interfaces/episode.interface';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EpisodeRepository implements IEpisodeRepository<Episode> {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<Episode, 'id' | 'createdAt' | 'updatedAt'>): Promise<Episode> {
    console.log(data);
    return await this.prisma.episode.create({
      data,
    });
  }

  async update(id: string, data: Partial<Episode>): Promise<Episode> {
    return await this.prisma.episode.update({
      where: {
        id,
      },
      data,
    });
  }
  
  async findById(id: string): Promise<Episode> {
    return await this.prisma.episode.findUnique({
      where :{ 
        id
      }
    })
  }

  async findByTitle(title: string): Promise<Episode> {
    return await this.prisma.episode.findFirst({
      where :{ 
        title
      }
    })
  }

  async findAll(courseId: string): Promise<Episode[]> {
    return await this.prisma.episode.findMany({
      where : {
        courseId
      }
    })
  }

  async remove(id: string): Promise<Episode> {
    return await this.prisma.episode.delete({
      where :{
        id
      }
    })
  }
  
}
