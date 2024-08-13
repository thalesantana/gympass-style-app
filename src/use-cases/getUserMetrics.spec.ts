import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/in-memory-check-ins-repository';
import { GetUserMetricsService } from './getUserMetrics.service';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;
describe('Fetch User Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkInsCount } = await sut.findManyByUserId({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
