import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchGymCheckInsHistoryService } from "../fetch-gyms-check-ins-history";
import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history";

export function makeFetchCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const userUseCase = new FetchUserCheckInsHistoryService(checkInsRepository);
  const gymUseCase = new FetchGymCheckInsHistoryService(checkInsRepository);

  return { userUseCase, gymUseCase };
}
