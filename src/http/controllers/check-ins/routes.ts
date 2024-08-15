import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRule } from "@/http/middlewares/verify-user-role";
import { create } from "./create.controller";
import { history } from "./history.controller";
import { metrics } from "./metrics.controller";
import { pending } from "./pending.controller";
import { validate } from "./validate.controller";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get(
    "/check-ins/:gymId/pending",
    { onRequest: [verifyUserRule("ADMIN")] },
    pending,
  );
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRule("ADMIN")] },
    validate,
  );

  app.get("/check-ins/user/history", history);
  app.get("/check-ins/user/metrics", metrics);
  app.post(
    "/check-ins/user/create/:gymId",
    { onRequest: [verifyUserRule("MEMBER")] },
    create,
  );
}
