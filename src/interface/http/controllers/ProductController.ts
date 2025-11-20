import { FastifyReply, FastifyRequest } from "fastify";
import { AddProduct, AddProductDTO } from "../../../application/useCases/product/AddProduct";
import { UpdateProduct, UpdateProductDTO } from "../../../application/useCases/product/UpdateProduct";
import { DeleteProduct, DeleteProductDTO } from "../../../application/useCases/product/DeleteProduct";
import { ListProducts } from "../../../application/useCases/product/ListProducts";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";

export class ProductController {
  constructor(
    private addProduct: AddProduct,
    private updateProduct: UpdateProduct,
    private deleteProductUC: DeleteProduct,
    private listProducts: ListProducts,
    private productRepo: IProductRepository,
  ) {}

  create = async (request: FastifyRequest<{ Body: AddProductDTO }>, reply: FastifyReply) => {
    const product = await this.addProduct.execute(request.body);
    reply.status(201).send(product.toJSON());
  };

  update = async (request: FastifyRequest<{ Params: { id: string }; Body: UpdateProductDTO }>, reply: FastifyReply) => {
    const product = await this.updateProduct.execute({ ...request.body, productId: request.params.id });
    reply.send(product.toJSON());
  };

  delete = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    await this.deleteProductUC.execute({ productId: request.params.id });
    reply.status(204).send();
  };

  getById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const product = await this.productRepo.findById(request.params.id);
    if (!product) {
      reply.status(404).send({ message: "Product not found" });
      return;
    }

    reply.send(product.toJSON());
  };

  list = async (request: FastifyRequest<{ Querystring: { dormId?: string; category?: string } }>, reply: FastifyReply) => {
    const products = await this.listProducts.execute({
      dormId: request.query.dormId,
      category: request.query.category,
      isActive: true,
    });

    reply.send(products.map((product) => product.toJSON()));
  };
}

