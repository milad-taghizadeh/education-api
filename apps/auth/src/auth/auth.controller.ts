import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { Response } from 'express';
import { LoginMessage, LogOutMessage } from './messages/auth.messages';
import { routes } from './routes/routes';

@Controller(routes.mainRoute)
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post(routes.sendOtp)
  async sendOtp(
    @Body() data: SendOtpDto
  ) {
    return await this.authService.sendOtp(data)
  }

  @Post(routes.confirmOtp)
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
      message: LoginMessage.LOGIN_SUCCESSFULLY,
    })
    res.end()
  }

  @Post(routes.logout)
  async logout(@Res() res: Response) {
    res.clearCookie("accessToken")
    res.status(200).json({
      message: LogOutMessage.LOGOUT_SUCCESSFULLY,
    })
    res.end()
  }
}
