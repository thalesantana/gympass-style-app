import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/services/factories/make-validate-check-in-use-case'

export async function validate ( request: FastifyRequest, reply: FastifyReply ) {
  
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = createCheckInParamsSchema.parse(request.params)

  const checkInService = makeValidateCheckInUseCase()

  await checkInService.execute({
    checkInId
  })

  return reply.status(204).send()
}