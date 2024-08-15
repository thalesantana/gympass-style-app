import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRule } from "@/http/middlewares/verify-user-role";
import { create } from "./create.controller";
import { nearby } from "./nearby.controller";
import { search } from "./search.controller";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms", { onRequest: [verifyUserRule("ADMIN")] }, create);
}
