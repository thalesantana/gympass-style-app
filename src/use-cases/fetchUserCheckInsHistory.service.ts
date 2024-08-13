import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface FetchUserCheckInsRequestType {
  userId: string;
  page: number;
}

interface FetchUserCheckInsResponseType {
  checkIns: CheckIn[]
}

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