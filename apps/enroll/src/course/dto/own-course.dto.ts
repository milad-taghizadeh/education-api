import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class OwnCourseDto {
  
  @IsString()
  @IsNotEmpty()
  courseId: string;

}