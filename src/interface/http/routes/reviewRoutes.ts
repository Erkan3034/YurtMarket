import { FastifyInstance } from "fastify";
import { ReviewController } from "../controllers/ReviewController";

export async function reviewRoutes(app: FastifyInstance, controller: ReviewController) {
  app.post("/review", controller.create);
  app.get("/review/product/:id", controller.listByProduct);
}

