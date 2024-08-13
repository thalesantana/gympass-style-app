import { GymsRepository } from '@/repositories/gyms-repository';
import { CreateGymRequestType } from './types/request/CreateGymRequestType';
import { CreateGymResponseType } from './types/response/CreateGymResponseType';

export class CreateGymService{
  constructor(private gymsRepository: GymsRepository){}
  async createGym({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequestType): Promise<CreateGymResponseType> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}