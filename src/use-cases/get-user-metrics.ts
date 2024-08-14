import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GetUserMetricsRequestType } from './types/request/GetUserMetricsRequestType';
import { GetUserMetricsResponseType } from './types/response/GetUserMetricsResponseType';

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async findManyByUserId({
    userId,
  }: GetUserMetricsRequestType): Promise<GetUserMetricsResponseType> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
