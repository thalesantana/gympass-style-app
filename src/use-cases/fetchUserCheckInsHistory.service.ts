import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { FetchUserCheckInsRequestType } from './types/response/FetchUserCheckInsRequestType';
import { FetchUserCheckInsResponseType } from './types/request/FetchUserCheckInsResponseType';

export class FetchUserCheckInsHistoryService {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async findManyByUserId({
    userId, 
    page,
  }: FetchUserCheckInsRequestType): Promise<FetchUserCheckInsResponseType> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

    return { checkIns }
  }
}