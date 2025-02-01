import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { OwnCourseDto } from './dto/own-course.dto';
import { routes } from './routes/routes';
import { JwtGuard, User } from 'libs/common';
import { CookiePayload } from 'apps/auth/src/auth/types/payload';
import { CourseUser } from '@prisma/client';

@Controller(routes.mainRoute)
@UseGuards(JwtGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  
  @Post(routes.ownCourse)
  async ownCourse(@Body() data: OwnCourseDto, @User() payload: CookiePayload): Promise<CourseUser> {
    const userId = payload.UserId;
    console.log(userId);
    return await this.courseService.ownCourse(data, userId);
  }
}
