import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  title? : string;
  
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  description? : string;

}
