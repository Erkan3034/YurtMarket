import { FastifyInstance } from "fastify";
import { SubscriptionController } from "../controllers/SubscriptionController";

export async function subscriptionRoutes(app: FastifyInstance, controller: SubscriptionController) {
  app.post("/subscription/upgrade", controller.upgrade);
  app.get("/subscription/me", controller.me);
}

