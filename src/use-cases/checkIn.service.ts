import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { ResourseNotFoundError } from './errors/resouse-not-found-error';
import { getDistanceBetweenCoordinates } from './utils/get-distance-between-coordenates';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';

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
    gymId,
    userLatitude,
    userLongitude
  }: CheckInRequestType): Promise<CheckInResponseType> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym){
      throw new ResourseNotFoundError()
    }

    // calculate distance between user and gym
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
      {
        latitude: userLatitude,
        longitude: userLongitude,
      }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if( distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if(checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();  
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return { checkIn }
  }
}