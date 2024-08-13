import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymService } from '../searchGyms.service'

export function makeValidateCheckInUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymService(gymsRepository)
  
  return useCase;
}