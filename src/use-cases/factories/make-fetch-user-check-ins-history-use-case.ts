import { FetchUserCheckInsHistoryService } from '../fetchUserCheckInsHistory.service';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

export function makeFetchCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryService(checkInsRepository);

  return useCase;
}
