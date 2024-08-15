import { makeFetchCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function pending(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryParamsSchema = z.object({
    gymId: z.string().uuid(),
  });
  const checkInHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { gymId } = checkInHistoryParamsSchema.parse(request.params);
  const { page } = checkInHistoryBodySchema.parse(request.query);

  const fetchGymCheckInsHistoryService = makeFetchCheckInsHistoryUseCase();

  const { checkIns } =
    await fetchGymCheckInsHistoryService.gymUseCase.findManyByGymId({
      gymId,
      page,
    });

  return reply.status(200).send({
    checkIns,
  });
}
