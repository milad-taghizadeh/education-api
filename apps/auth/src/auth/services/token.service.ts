import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookiePayload } from '../types/payload';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService
  ) { }

  createOtpToken(payload: CookiePayload): string {
    const token = this.jwtService.sign(payload, {
      secret: process.env.OTP_TOKEN_SECRET,
      expiresIn: 60 * 3,
    });
    console.log(token);
    return token;
  }

  verifyToken(token: string): CookiePayload  {
    try {
      const payload: CookiePayload  = this.jwtService.verify(token)
      console.log(payload);
      return payload
    } catch {
      return
    }
  }
}
