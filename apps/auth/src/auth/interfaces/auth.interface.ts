import { AuthUserType } from "../enums/user-type.enum"

export interface IOtpRepository<T> {
  create(data: T): Promise<T>
  update(id: string | number, data: Partial<T>): Promise<T>
  findById(id: string | number): Promise<T>
  findMany?(filters: Partial<T>): Promise<T[]>
}

export interface ISendOtp {
  phone: string,
}

export interface IConfirmOtp {
  phone: string,
  code: string,
  userType: AuthUserType
}