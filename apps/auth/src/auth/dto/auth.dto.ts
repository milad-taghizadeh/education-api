import { AuthType } from '../enums/type.enum';
import { AuthUserType } from '../enums/user-type.enum';
import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SendOtpDto {

  @IsPhoneNumber("IR")
  @IsNotEmpty()
  @IsString()
  phone: string
}

export class CheckOtpDto {

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("IR")
  phone: string

  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  code: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(AuthUserType)
  userType: AuthUserType
}
