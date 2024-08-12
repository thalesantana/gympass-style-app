import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface FetchNearbyGymsRequestType {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsResponseType {
  gyms: Gym[];
}
export class FetchNearbyGymsService{
  constructor(private gymsRepository: GymsRepository){}
  async SearchManyGyms({
    userLatitude,
    userLongitude
  }: FetchNearbyGymsRequestType): Promise<FetchNearbyGymsResponseType> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude:userLatitude,
      longitude: userLongitude,
    })
    
    return { gyms }
  }

}