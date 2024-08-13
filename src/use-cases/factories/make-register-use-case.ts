import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '../register.service'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(usersRepository)
  
  return registerService
}