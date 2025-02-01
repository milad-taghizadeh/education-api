import { IsArray, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateEpisodeDto {

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  description: string;
  
  @IsArray()
  @IsOptional()
  media_path?: string[];

  @IsString()
  @IsNotEmpty()
  courseId: string;
}
