import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/in-memory-check-ins-repository';
import { CheckInService } from './checkin.service';


let checkInsRepository: InMemoryCheckInsRepository 
let sut: CheckInService
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInsRepository)
  })

  it('should be able to get check in ', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

})