import { makeGetUserProfileUseCase } from '@/services/factories/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile ( 
  request: FastifyRequest, 
  reply: FastifyReply 
) {
  const getUseProfile = makeGetUserProfileUseCase()
  
  const { user } = await getUseProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  })
}