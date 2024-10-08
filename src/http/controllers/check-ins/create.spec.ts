import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateAdmin } from '@/utils/test/create-and-authenticate-admin';
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const { admin } = await createAndAuthenticateAdmin(app); 

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
        admin_id: admin.id,
      },
    });

    const response = await request(app.server)
      .post(`/check-ins/user/create/${gym.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
