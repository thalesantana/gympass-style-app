import { Gym } from '@prisma/client';

export interface FetchNearbyGymsResponseType {
  gyms: Gym[];
}
