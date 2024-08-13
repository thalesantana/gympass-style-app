import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface CreateGymRequestType {
  title: string;
  description?: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymResponseType {
  gym: Gym;
}
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