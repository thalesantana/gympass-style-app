import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface SearchGymRequestType {
  query: string;
  page: number;
}

interface SearchGymResponseType {
  gyms: Gym[];
}
export class SearchGymService{
  constructor(private gymsRepository: GymsRepository){}
  async SearchManyGyms({
    query,
    page
  }: SearchGymRequestType): Promise<SearchGymResponseType> {
    const gyms = await this.gymsRepository.searchMany(query,page)
    
    return { gyms }
  }

}