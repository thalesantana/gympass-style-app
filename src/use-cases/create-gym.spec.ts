import { InMemoryGymsRepository } from '@/repositories/inMemory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymService } from './create-gym';

let usersRepository: InMemoryGymsRepository;
let sut: CreateGymService;
describe('Create Gym Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(usersRepository);
  });
  it('should hash user password upon registration', async () => {
    const { gym } = await sut.createGym({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -19.1225294,
      longitude: -43.9353343,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
