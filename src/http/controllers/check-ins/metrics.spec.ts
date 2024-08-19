import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateAdmin } from '@/utils/test/create-and-authenticate-admin';
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Check-in Metrics (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get the total count of validated check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);
    const { admin } = await createAndAuthenticateAdmin(app); 

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
        admin_id: admin.id,
      },
    });
    
    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
          created_at: '2024-08-18T16:00:14.064Z',
          validated_at: '2024-08-18T16:00:14.064Z',
        },
        {
          gym_id: gym.id,
          user_id: user.id,
          created_at: '2024-08-19T16:00:14.064Z',
          validated_at: '2024-08-19T16:00:14.064Z',
        }
      ],
    });
    
    const response = await request(app.server)
      .get("/check-ins/user/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();
    
    expect(response.statusCode).toEqual(200);
    expect(response.body.checkInsCount).toEqual(2);
  });
});
