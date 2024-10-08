import { InMemoryCheckInsRepository } from "@/repositories/inMemory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/inMemory/in-memory-gyms-repository";
import { CheckInService } from "@/use-cases/checkIn";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;
describe("Get User Profile Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Typescript Gym",
      description: null,
      phone: null,
      latitude: -19.1225294,
      longitude: -43.9353343,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to get check in ", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -19.1225295,
      userLongitude: -43.9353344,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not to be able to get check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -19.1225295,
      userLongitude: -43.9353344,
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -19.1225295,
        userLongitude: -43.9353344,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to get check in twice in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -19.1225295,
      userLongitude: -43.9353344,
    });

    vi.setSystemTime(new Date(2024, 0, 22, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -19.1225295,
      userLongitude: -43.9353344,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to get check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Typescript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-19.9105056),
      longitude: new Decimal(-43.9028046),
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: -19.1225295,
        userLongitude: -43.9353344,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
