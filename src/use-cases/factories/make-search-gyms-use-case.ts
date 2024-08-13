import { SearchGymService } from '../searchGyms.service';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymService(gymsRepository);

  return useCase;
}
