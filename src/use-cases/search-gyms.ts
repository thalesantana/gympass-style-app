import { GymsRepository } from "@/repositories/gyms-repository";
import { SearchGymRequestType } from "./types/request/SearchGymRequestType";
import { SearchGymResponseType } from "./types/response/SearchGymResponseType";

export class SearchGymService {
  constructor(private gymsRepository: GymsRepository) {}
  async SearchManyGyms({
    query,
    page,
  }: SearchGymRequestType): Promise<SearchGymResponseType> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
