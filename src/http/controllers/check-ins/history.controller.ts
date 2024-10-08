import { makeFetchCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryBodySchema.parse(request.query);

  const fetchUserCheckInsHistoryService = makeFetchCheckInsHistoryUseCase();

  const { checkIns } =
    await fetchUserCheckInsHistoryService.userUseCase.findManyByUserId({
      userId: request.user.sub,
      page,
    });

  return reply.status(200).send({
    checkIns,
  });
}
