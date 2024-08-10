import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface CheckInRequestType {
  userId: string;
  gymId: string;
}

interface CheckInResponseType {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    userId, 
    gymId
  }: CheckInRequestType): Promise<CheckInResponseType> {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return { checkIn }
  }
}