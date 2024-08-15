import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { FetchCheckInsResponseType } from "./types/response/FetchCheckInsResponseType";
import { FetchUserCheckInsRequestType } from "./types/response/FetchUserCheckInsRequestType";

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async findManyByUserId({
    userId,
    page,
  }: FetchUserCheckInsRequestType): Promise<FetchCheckInsResponseType> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
