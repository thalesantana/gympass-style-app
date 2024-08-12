import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/inMemory/in-memory-gyms-repository';
import { FetchNearbyGymsService } from './fetchNearbyGyms.service';

let gymsRepository: InMemoryGymsRepository 
let sut: FetchNearbyGymsService
describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService (gymsRepository)
  })

  it('should be able to able to fetch nearby gyms', async () => {
    await gymsRepository.create({
     title: "Near Gym",
     description: null,
     phone: null,
     latitude: -19.1225294,
     longitude: -43.9353343,
    })

    await gymsRepository.create({
       title: "Far Gym",
       description: null,
       phone: null,
       latitude: -56.1225284,
       longitude: -60.9353343,
    })

    const { gyms } = await sut.SearchManyGyms({
      userLatitude: -19.1225295,
      userLongitude: -43.9353344,
    })
    
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym'})
    ])
  })

  it.skip('should be able to get paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -19.1225284,
        longitude: -43.9353343,
      })
    }
    const { gyms } = await sut.SearchManyGyms({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21'}),
      expect.objectContaining({ title: 'JavaScript Gym 22'}),
    ])
  })
})
