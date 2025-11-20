import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/OrderController";

export async function orderRoutes(app: FastifyInstance, controller: OrderController) {
  app.post("/order", controller.create);
  app.put("/order/:id/status", controller.updateStatus);
  app.get("/order/me", controller.listMine);
}

