import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseController } from './course.controller';
import { PrismaService } from '@app/prisma';
import { CourseRepository } from './repositories/course.repository';
import { VerifyToken } from '@app/common';
import { UserRepository } from 'apps/user/src/repositories/user.repository';
import { TokenService } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';

@Module({
  controllers: [CourseController],
  providers: [
    CourseService,
    PrismaService,
    CourseRepository,
    VerifyToken,
    UserRepository,
    TokenService,
    JwtService,
  ],
})

export class CourseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes('*')
      .apply(VerifyToken)
      .forRoutes('*');
  }
}
