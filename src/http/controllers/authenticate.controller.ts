import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case'

export async function authenticate ( request: FastifyRequest, reply: FastifyReply ) {
  const authenticaterBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const {email, password} = authenticaterBodySchema.parse(request.body)

  try {
    const authenticateService =  makeAuthenticateUseCase()

    await authenticateService.execute({
      email,
      password,
    })
  } catch (err) {
    if(err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message
      })
    }

    throw err
  }

  return reply.status(200).send()
}