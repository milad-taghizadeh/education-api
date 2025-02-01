import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { EpisodeService } from './services/episode.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode } from '@prisma/client';
import { routes } from './routes/routes';

@Controller(routes.mainRoute)
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post(routes.create)
  async create(@Body() createEpisodeDto: CreateEpisodeDto) : Promise<Episode> {
    return this.episodeService.create(createEpisodeDto); 
  }

  @Get(routes.findAll)
  async findAll(@Query('courseId') courseId: string): Promise<Episode[]> {
    return this.episodeService.findAll(courseId);
  }

  @Get(routes.findOne)
  async findOne(@Query('id') id: string): Promise<Episode> {
    return this.episodeService.findOne(id);
  }

  @Put(routes.update)
  async update(@Query('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto): Promise<Episode> {
    return this.episodeService.update(id, updateEpisodeDto);
  }

  @Delete(routes.remove)
  async remove(@Query('id') id: string): Promise<{ message: string, episode: Episode }> {
    return this.episodeService.remove(id);
  }
}