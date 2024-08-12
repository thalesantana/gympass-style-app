import { vi, expect, describe, it, beforeEach, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/in-memory-check-ins-repository';
import { CheckInService } from '@/services/checkIn.service';
import { InMemoryGymsRepository } from '@/repositories/inMemory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';


let checkInsRepository: InMemoryCheckInsRepository 
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Typescript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers();
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get check in ', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 19.1225295,
      userLongitude: -43.9353344,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not to be able to get check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 19.1225295,
      userLongitude: -43.9353344,
    })

    await expect(() =>
     sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: 19.1225295,
        userLongitude: -43.9353344,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to get check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 19.1225295,
      userLongitude: -43.9353344,
    })

    vi.setSystemTime(new Date(2024, 0, 22, 8, 0, 0))

    const { checkIn } = await  sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 19.1225295,
      userLongitude: -43.9353344,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

})