import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController";

export async function productRoutes(app: FastifyInstance, controller: ProductController) {
  app.post("/product", controller.create);
  app.put("/product/:id", controller.update);
  app.delete("/product/:id", controller.delete);
  app.get("/product/:id", controller.getById);
  app.get("/product", controller.list);
}

