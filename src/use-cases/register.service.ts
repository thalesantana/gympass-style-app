import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { UsersRepository } from '@/repositories/users-repository';
import { ResgisterRequestType } from '@/types/request/registerRequestType';
import { CreateUserResponseType } from '@/types/response/CreateUserResponseType';
import { hash } from 'bcryptjs';

export class RegisterService{
  constructor(private usersRepository: UsersRepository){}
  async createUser({
    name,
    email,
    password,
  }: ResgisterRequestType): Promise<CreateUserResponseType> {
    const password_hash = await hash(password, 6)
    
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }

}