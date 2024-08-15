import { Gym } from "@prisma/client";

export interface SearchGymResponseType {
  gyms: Gym[];
}
