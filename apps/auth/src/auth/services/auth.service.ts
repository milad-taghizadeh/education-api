import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  ServiceUnavailableException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { TokenService } from '@app/common';
import { OtpRepository } from '../repositories/otp.repository';
import { CheckOtpDto, SendOtpDto } from '../dto/auth.dto';
import { User } from '@prisma/client';
import { AuthMessage, ServerMessages } from '../messages/auth.messages';
import { AuthUserType } from '../enums/user-type.enum';
import { ISendOtp } from '../interfaces/auth.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { IGRPCService } from '../interfaces/grpc.interface';
import { GRPC } from '../enums/grpc.enum';

@Injectable()
export class AuthService {
  private userService: IGRPCService;
  constructor(
    private readonly otpRepository: OtpRepository,
    private tokenService: TokenService,
    @Inject(GRPC.USER_SERVICE) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<IGRPCService>(
      GRPC.PROTO_USER_SERVICE,
    );
  }
  async sendOtp(data: ISendOtp): Promise<{ code: string }> {
    const existingOtp = await this.otpRepository.findByPhone(data.phone);

    if (
      existingOtp &&
      existingOtp.createdAt > new Date(Date.now() - 2 * 60 * 1000)
    ) {
      throw new BadRequestException('retry latter.');
    }

    const code = Math.floor(Math.random() * 90000) + 10000;
    const TWO_MINUTES = 2 * 60 * 1000;
    throw "jhxhs"

    const otp = await this.otpRepository.create({
      code: String(code),
      expiresIn: new Date(Date.now() + TWO_MINUTES),
      isUsed: false,
      phone: data.phone,
    });

    //TODO send otp via sms
    return { code: otp.code };
  }

  async confirmOtp(data: CheckOtpDto) {
    const dbOtp = await this.otpRepository.findLastOtp(data.phone, data.code);

    if (!dbOtp || dbOtp.expiresIn < new Date()) {
      throw new BadRequestException(AuthMessage.INVALID_OTP_CODE);
    }

    await this.otpRepository.update(dbOtp.id, { isUsed: true });

    if (data.userType == AuthUserType.Guest) {
      try {
        const response = await firstValueFrom(
          this.userService.checkUserExist({ phone: data.phone }),
        );
        // Check if user exists in the response
        if (response.id) {
          return this.tokenService.createOtpToken({ UserId: response.id });
        }
        const newUserResponse = await firstValueFrom(
          this.userService.createUser({ phone: data.phone }),
        );
        return this.tokenService.createOtpToken({
          UserId: newUserResponse.id,
        });
      } catch (error) {
        console.error('gRPC error:', error);
        throw new ServiceUnavailableException(
          ServerMessages.SERVICE_UNAVAILABLE,
        );
      }
    }

    throw new ServiceUnavailableException(ServerMessages.SERVICE_UNAVAILABLE);
  }

}
