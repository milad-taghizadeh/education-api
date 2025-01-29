export interface IUserRepository<T> {
  create(phone: string): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  findByPhone(phone: string): Promise<T>
  findById(id: string): Promise<T>
  findMany?(filters: Partial<T>): Promise<T[]>
}

export interface ICheckUserExist {
  phone: string;
}

export interface ICreateUserData {
  phone: string;
}

export interface IUserResponse {
  user: {
    id: string;
    phone: string;
    created_at: string;
    updated_at: string;
  } | null;
}