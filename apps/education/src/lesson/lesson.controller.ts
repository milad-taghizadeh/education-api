import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }

  @Patch(routes.update)
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(routes.remove)
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}
