import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCourseDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  title : string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  description : string;

  @IsString()
  @IsNotEmpty()
  lessonId : string;
}
