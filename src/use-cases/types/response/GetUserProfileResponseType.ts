import { User } from "@prisma/client";

export interface GetUserProfileResponseType {
  user: User;
}
