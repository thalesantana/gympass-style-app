import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterService} from './register.service'
import { InMemoryUsersRepository } from '../repositories/inMemory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository)

    const email = 'johndoe@example.com'

    await registerService.createUser({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerService.createUser({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})