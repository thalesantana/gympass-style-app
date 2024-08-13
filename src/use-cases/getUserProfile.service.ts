import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { ResourseNotFoundError } from './errors/resouse-not-found-error';

interface GetUserProfileRequestType {
  userId: string;
}

interface GetUserProfileResponseType {
  user: User
}

export class GetUserProfileService {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute({userId}: GetUserProfileRequestType): Promise<GetUserProfileResponseType> {
    const user = await this.usersRepository.findById(userId)

    if(!user) {
      throw new ResourseNotFoundError
    }

    return { user }
  }
}