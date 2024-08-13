import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsProfileUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics ( request: FastifyRequest, reply: FastifyReply ) {
  const getUserMetricsService = makeGetUserMetricsProfileUseCase()

  const { checkInsCount } = await getUserMetricsService.findManyByUserId({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount
  })
}