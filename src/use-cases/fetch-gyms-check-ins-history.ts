import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { FetchGymCheckInsRequestType } from "./types/request/FetchGymCheckInsRequestType";
import { FetchCheckInsResponseType } from "./types/response/FetchCheckInsResponseType";

export class FetchGymCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async findManyByGymId({
    gymId,
    page,
  }: FetchGymCheckInsRequestType): Promise<FetchCheckInsResponseType> {
    const checkIns = await this.checkInsRepository.findManyByGymId(gymId, page);

    return { checkIns };
  }
}
