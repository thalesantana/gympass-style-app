import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { search } from './search.controller';
import { nearby } from './nearby.controller';
import { create } from './create.controller';
import { verifyUserRule } from '@/http/middlewares/verify-user-role';

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRule('ADMIN')]}, create)
}