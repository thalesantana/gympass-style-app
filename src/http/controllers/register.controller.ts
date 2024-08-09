import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '@/services/register.service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register ( request: FastifyRequest, reply: FastifyReply ) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const {name, email, password} = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.createUser({
      name,
      email,
      password,
    })
  } catch (err) {
    if(err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message
      })
    }

    throw err
  }

  return reply.status(201).send()
}