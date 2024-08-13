import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { ResourseNotFoundError } from './errors/resouse-not-found-error';
import dayjs from 'dayjs';
import { LateCheckInValidationrror } from './errors/late-check-in-validation-error';

interface ValidateCheckInRequestType {
  checkInId: string;
}

interface ValidateCheckInResponseType {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    checkInId
  }: ValidateCheckInRequestType): Promise<ValidateCheckInResponseType> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if(!checkIn){
      throw new ResourseNotFoundError()
    }

    const distanceInMinutesCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if(distanceInMinutesCheckInCreation > 20){
      throw new LateCheckInValidationrror()
    }

    checkIn.validated_at = new Date()
    
    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}