import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = createCheckInParamsSchema.parse(request.params);

  const checkInService = makeValidateCheckInUseCase();

  await checkInService.execute({
    checkInId,
  });

  return reply.status(204).send();
}
