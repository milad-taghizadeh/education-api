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

  @Post('login/send-otp')
  async sendOtp(
    @Body() data: SendOtpDto
  ) {
    return await this.authService.sendOtp(data)
  }

  @Post('login/confirm-otp')
  async confirmOtp(
    @Body() data: CheckOtpDto,
    @Res() res: Response
  ) {
    const token = await this.authService.confirmOtp(data)

    res.cookie("accessToken", token, {
      // expires: ,
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: false
    })
    res.status(200).json({
      message: "Login Successfully",
    })
    res.end()
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie("accessToken")
    res.status(200).json({
      message: "Logout Successfully",
    })
    res.end()
  }
}
