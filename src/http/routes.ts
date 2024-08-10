import { FastifyInstance } from 'fastify';
import { register } from './controllers/register.controller';
import { authenticate } from './controllers/authenticate.controller';
import { GetUserProfileService } from '@/services/getUserProfile.service';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.get('/user/:id', GetUserProfileService)
}