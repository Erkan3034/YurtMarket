import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";

export async function userRoutes(app: FastifyInstance, controller: UserController) {
  app.post("/auth/register", controller.register);
  app.post("/auth/login", controller.login);
}

