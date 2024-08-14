import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { GetUserMetricsService } from '../get-user-metrics';

export function makeGetUserMetricsProfileUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsService(checkInsRepository);

  return useCase;
}
