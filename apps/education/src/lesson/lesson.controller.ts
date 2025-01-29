import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { LessonService } from './services/lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { routes } from './routes/routes';
import { Lesson } from '@prisma/client';

@Controller(routes.mainRoute)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post(routes.create)
  async create(@Body() createLessonDto: CreateLessonDto) : Promise<Lesson> {
    return this.lessonService.create(createLessonDto);
  }

  @Get(routes.findAll)
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(routes.findOne)
  findOne(@Query('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Put(routes.update)
  async update(@Query('id') id: string, @Body() updateLessonDto: UpdateLessonDto) : Promise<Lesson> {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(routes.remove)
  remove(@Query('id') id: string) {
    return this.lessonService.remove(id);
  }
}
