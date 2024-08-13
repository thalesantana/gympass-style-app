import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { create } from './create.controller';
import { validate } from './validate.controller';
import { history } from './history.controller';
import { metrics } from './metrics.controller';
import { verifyUserRule } from '@/http/middlewares/verify-user-role';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/gyms/:gymId/check-ins', create);

  app.get('/check-ins/history', history);
  app.get('/check-ins/metrics', metrics);
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRule('ADMIN')] },
    validate,
  );
}
