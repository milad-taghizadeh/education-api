import { User } from "@prisma/client";
import { Observable } from "rxjs";

export interface IGRPCService {
  checkUserExist(data: { phone: string }): Observable<User | null>;
  createUser(data: { phone: string }): Observable<User>;
}