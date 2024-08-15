import { UsersRepository } from "@/repositories/users-repository";
import { ResourseNotFoundError } from "./errors/resouse-not-found-error";
import { GetUserProfileRequestType } from "./types/request/GetUserProfileRequestType";
import { GetUserProfileResponseType } from "./types/response/GetUserProfileResponseType";

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequestType): Promise<GetUserProfileResponseType> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourseNotFoundError();
    }

    return { user };
  }
}
