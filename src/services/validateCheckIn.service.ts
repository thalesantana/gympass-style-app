import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { ResourseNotFoundError } from './errors/resouse-not-found-error';

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

    checkIn.validated_at = new Date()
    
    await this.checkInsRepository.save(checkIn)
    
    return { checkIn }
  }
}