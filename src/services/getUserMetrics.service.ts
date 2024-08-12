import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface GetUserMetricsRequestType {
  userId: string;
}

interface GetUserMetricsResponseType {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async findManyByUserId({
    userId, 
  }: GetUserMetricsRequestType): Promise<GetUserMetricsResponseType> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount }
  }
}