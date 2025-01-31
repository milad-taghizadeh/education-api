import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from '@prisma/client';
import { routes } from './routes/routes';

@Controller(routes.mainRoute)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post(routes.create)
  async create(@Body() createCourseDto: CreateCourseDto) : Promise<Course> {
    return this.courseService.create(createCourseDto);
  }

  @Get(routes.findAll)
  async findAllCourses(@Query('id') lessonId: string): Promise<Course[]> {
    return this.courseService.findAllCourses(lessonId);
  }

  @Get(routes.findOne)
  async findOne(@Query('id') id: string): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Put(routes.update)
  async update(@Query('id') id: string, @Body() updateCourseDto: UpdateCourseDto) : Promise<Course> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(routes.remove)
  async remove(@Query('id') id: string) : Promise<{ message: string; course: Course }> {
    return this.courseService.remove(id);
  }
}
