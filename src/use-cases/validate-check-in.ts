import dayjs from 'dayjs';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { ResourseNotFoundError } from './errors/resouse-not-found-error';
import { LateCheckInValidationrror } from './errors/late-check-in-validation-error';
import { ValidateCheckInRequestType } from './types/request/ValidateCheckInRequestType';
import { ValidateCheckInResponseType } from './types/response/ValidateCheckInResponseType';

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequestType): Promise<ValidateCheckInResponseType> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourseNotFoundError();
    }

    const distanceInMinutesCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    );

    if (distanceInMinutesCheckInCreation > 20) {
      throw new LateCheckInValidationrror();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
