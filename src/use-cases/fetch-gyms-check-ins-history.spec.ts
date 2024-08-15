import { InMemoryCheckInsRepository } from "@/repositories/inMemory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchGymCheckInsHistoryService } from "./fetch-gyms-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchGymCheckInsHistoryService;
describe("Fetch Gym Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchGymCheckInsHistoryService(checkInsRepository);
  });

  it("should be able to get gym check-in history", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-02",
    });

    const { checkIns } = await sut.findManyByGymId({
      gymId: "gym-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ user_id: "user-01" }),
      expect.objectContaining({ user_id: "user-02" }),
    ]);
  });

  it("should be able to get paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-01`,
        user_id: `user-${i}`,
      });
    }
    const { checkIns } = await sut.findManyByGymId({
      gymId: "gym-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ user_id: "user-21" }),
      expect.objectContaining({ user_id: "user-22" }),
    ]);
  });
});
