import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInService } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
  const gymsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInService(gymsRepository);

  return useCase;
}
