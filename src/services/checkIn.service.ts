import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { ResourseNotFoundError } from './errors/resouse-not-found-error';

interface CheckInRequestType {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInResponseType {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId, 
    gymId
  }: CheckInRequestType): Promise<CheckInResponseType> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym){
      throw new ResourseNotFoundError()
    }

    // calculate distance between user and gym


    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if(checkInOnSameDay) {
      throw new Error()
    }
    
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return { checkIn }
  }
}