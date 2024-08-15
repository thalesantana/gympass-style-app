import { UsersRepository } from "@/repositories/users-repository";
import { CreateUserResponseType } from "@/use-cases/types/response/CreateUserResponseType";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { ResgisterRequestType } from "./types/request/registerRequestType";

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}
  async createUser({
    name,
    email,
    password,
    role,
  }: ResgisterRequestType): Promise<CreateUserResponseType> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role,
    });

    return { user };
  }
}
