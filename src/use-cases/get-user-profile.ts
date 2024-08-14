import { GetUserProfileRequestType } from './types/request/GetUserProfileRequestType';
import { GetUserProfileResponseType } from './types/response/GetUserProfileResponseType';
import { ResourseNotFoundError } from './errors/resouse-not-found-error';
import { UsersRepository } from '@/repositories/users-repository';

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