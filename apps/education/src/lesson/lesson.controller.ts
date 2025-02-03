import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { LessonService } from './services/lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { routes } from './routes/routes';
import { Lesson } from '@prisma/client';
import { multerOptions } from '@config/config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(routes.mainRoute)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post(routes.create)
  @UseInterceptors(FileInterceptor('media_path', multerOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<Lesson> {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.lessonService.create({...createLessonDto, media_path: file?.filename});
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
  @UseInterceptors(FileInterceptor('media_path', multerOptions))
  async update(
    @Query('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<Lesson> {
    return this.lessonService.update(id, {...updateLessonDto, media_path: file?.filename});
  }

  @Delete(routes.remove)
  remove(@Query('id') id: string) {
    return this.lessonService.remove(id);
  }
}
