import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class OwnCourseDto {
  
  @IsArray()
  @IsNotEmpty()
  courseId: string;

}