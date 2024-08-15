import { InMemoryGymsRepository } from "@/repositories/inMemory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymService } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymService;
describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymService(gymsRepository);
  });

  it("should be able to able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -19.1225294,
      longitude: -43.9353343,
    });

    await gymsRepository.create({
      title: "Java Gym",
      description: null,
      phone: null,
      latitude: -19.1225284,
      longitude: -43.9353343,
    });

    const { gyms } = await sut.SearchManyGyms({
      query: "JavaScript",
      page: 1,
    });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to get paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -19.1225284,
        longitude: -43.9353343,
      });
    }
    const { gyms } = await sut.SearchManyGyms({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
