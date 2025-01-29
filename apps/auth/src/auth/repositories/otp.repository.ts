import { Injectable } from "@nestjs/common";
import { Otp } from "@prisma/client";
import { PrismaService } from "libs/prisma/src/prisma.service";
import { IOtpRepository } from "../interfaces/auth.interface";

@Injectable()
export class OtpRepository implements IOtpRepository<Otp> {

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(data: Omit<Otp, "id" | "createdAt" | "updatedAt">): Promise<Otp> {
    return await this.prismaService.otp.create({
      data: {
        ...data
      }
    })
  }

  async update(id: string, data: Partial<Otp>): Promise<Otp> {
    return await this.prismaService.otp.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
  }

  async findById(id: string): Promise<Otp> {
    return await this.prismaService.otp.findUnique({
      where: {
        id
      }
    })
  }

  async findByPhone(phone: string): Promise<Otp> {
    return await this.prismaService.otp.findFirst({
      where: {
        phone,
        isUsed: false,
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  async findLastOtp(phone: string, code: string): Promise<Otp> {
    return await this.prismaService.otp.findFirst({
      where: {
        phone,
        isUsed: false,
        code,
      },
      orderBy: {
        expiresIn: "desc"
      }
    })
  }

}