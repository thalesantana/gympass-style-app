import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { AuthenticateRequestType } from "./types/request/AuthenticateRequestType";
import { AuthenticateResponseType } from "./types/response/AuthenticateResponseType";

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequestType): Promise<AuthenticateResponseType> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPassowrdMatches = await compare(password, user.password_hash);

    if (!doesPassowrdMatches) throw new InvalidCredentialsError();

    return {
      user,
    };
  }
}
