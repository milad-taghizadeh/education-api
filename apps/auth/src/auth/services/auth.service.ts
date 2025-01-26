import { BadRequestException, Injectable, Scope, ServiceUnavailableException } from '@nestjs/common';

import { TokenService } from './token.service';
import { OtpRepository } from '../repositories/otp.repository';
import { CheckOtpDto, SendOtpDto } from '../dto/auth.dto';
import { User } from '@prisma/client';
import { AuthMessage, ServerMessages } from '../messages/auth.messages';
import { AuthUserType } from '../enums/user-type.enum';
import { ISendOtp } from '../interfaces/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly otpRepository: OtpRepository,
    private tokenService: TokenService,
  ) {}

  async sendOtp(data: ISendOtp) : Promise<{code : string}> {
    const existingOtp = await this.otpRepository.findByPhone(data.phone);

    console.log(existingOtp);
    if (
      existingOtp &&
      existingOtp.createdAt > new Date(Date.now() - 2 * 60 * 1000)
    ) {
      throw new BadRequestException('retry latter.');
    }

    const code = Math.floor(Math.random() * 90000) + 10000;
    const TWO_MINUTES = 2 * 60 * 1000;

    const otp = await this.otpRepository.create({
      code: String(code),
      expiresIn: new Date(Date.now() + TWO_MINUTES),
      isUsed: false,
      phoneNumber: data.phone,
    });

    //TODO send otp via sms
    return { code : otp.code};
  }

  // async confirmOtp(data: CheckOtpDto) {
  //   const dbOtp = await this.otpRepository.findLastOtp(
  //     data.phoneNumber,
  //     data.code,
  //   );

  //   if (!dbOtp || dbOtp.expiresIn < new Date()) {
  //     throw new BadRequestException(AuthMessage.INVALID_OTP_CODE);
  //   }

  //   await this.otpRepository.update(dbOtp.id, { isUsed: true });

  //   if (data.userType == AuthUserType.Guest) {

  //     const user = await this.userRepository.findByPhone(data.phoneNumber);

  //     if (user) {
  //       return this.tokenService.createOtpToken({ UserId: user.id });
  //     } else {
  //       const user = await this.userRegister(data.phoneNumber);
  //       return this.tokenService.createOtpToken({ UserId: user.id });
  //     }
  //   }else throw new ServiceUnavailableException(ServerMessages.SERVICE_UNAVAILABLE)
  // }

  // private async userRegister(phoneNumber: string): Promise<User> {
  //   return await this.userRepository.create({
  //     phone: phoneNumber,
  //     email: null,
  //     firstName: null,
  //     lastName: null,
  //     discountId: null,
  //     status:'NOT_VALIDATED'
  //   });
  // }
}
