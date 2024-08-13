import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/services/factories/make-search-gyms-use-case'

export async function search ( request: FastifyRequest, reply: FastifyReply ) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQuerySchema.parse(request.query)

  const searchGymService = makeSearchGymsUseCase()

  const { gyms } = await searchGymService.SearchManyGyms({
    query,
    page
  })

  return reply.status(200).send({
    gyms
  })
}