import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    title? : string;
  
    @IsString()
    @IsNotEmpty()
    @Length(1, 1000)
    description? : string;
  
    @IsString()
    @IsNotEmpty()
    lessonId? : string;
}
