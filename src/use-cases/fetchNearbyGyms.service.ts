import { GymsRepository } from '@/repositories/gyms-repository';
import { FetchNearbyGymsRequestType } from './types/request/FetchNearbyGymsRequestType';
import { FetchNearbyGymsResponseType } from './types/response/FetchNearbyGymsResponseType';

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