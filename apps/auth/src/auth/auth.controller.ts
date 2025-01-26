import {
  Controller,
  Post,
  Body,

  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('v1/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('send-otp')
  async sendOtp(
    @Body() data: SendOtpDto
  ) {
    return await this.authService.sendOtp(data)
  }

  // @Post('confirm-otp')
  // async confirmOtp(
  //   @Body() data: CheckOtpDto,
  //   @Res() res: Response
  // ) {
  //   const token = await this.authService.confirmOtp(data)

  //   res.cookie("accessToken", token, {
  //     // expires: ,
  //     httpOnly: true,
  //     path: "/",
  //     sameSite: "none",
  //     secure: false
  //   })
  //   res.end()
  // }
}
