import { FastifyInstance } from "fastify";
import { SellerController } from "../controllers/SellerController";

export async function sellerRoutes(app: FastifyInstance, controller: SellerController) {
  app.post("/seller/apply", controller.apply);
  app.get("/seller/me", controller.me);
  app.get("/seller/:id", controller.getById);
  app.get("/seller/popular", controller.popular);
  app.post("/seller/approve", controller.approve);
}

