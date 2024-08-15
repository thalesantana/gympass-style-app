import { User } from "@prisma/client";

export interface AuthenticateResponseType {
  user: User;
}
