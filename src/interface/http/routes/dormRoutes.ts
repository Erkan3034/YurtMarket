import { FastifyInstance } from "fastify";
import { DormController } from "../controllers/DormController";

export async function dormRoutes(app: FastifyInstance, controller: DormController) {
  app.get("/dorm/:id/sellers", controller.listSellers);
  app.get("/dorm/list", controller.listDorms);
}

