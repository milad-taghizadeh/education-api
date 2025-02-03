import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateLessonDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  title : string;
  
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  description : string;
}
