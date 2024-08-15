import { InMemoryUsersRepository } from "@/repositories/inMemory/in-memory-user-repository";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { RegisterService } from "./register";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService;
describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  });
  it("should hash user password upon registration", async () => {
    const { user } = await sut.createUser({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      role: "MEMBER",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.createUser({
      name: "John Doe",
      email,
      password: "123456",
      role: "MEMBER",
    });

    await expect(() =>
      sut.createUser({
        name: "John Doe",
        email,
        password: "123456",
        role: "MEMBER",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const { user } = await sut.createUser({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      role: "MEMBER",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
