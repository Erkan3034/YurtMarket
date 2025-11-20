import { randomUUID } from "crypto";
import { Order } from "../../../domain/entities/Order";
import { Quantity } from "../../../domain/valueObjects/Quantity";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { DomainError } from "../../../shared/errors/DomainError";

export interface CreateOrderDTO {
  buyerId: string;
  productId: string;
  quantity: number;
}

export class CreateOrder {
  constructor(private orderRepo: IOrderRepository, private productRepo: IProductRepository) {}

  async execute(dto: CreateOrderDTO) {
    const product = await this.productRepo.findById(dto.productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const snapshot = product.snapshot;
    if (!snapshot.isActive) {
      throw new DomainError("Product is inactive");
    }

    if (snapshot.stock.value < dto.quantity) {
      throw new DomainError("Insufficient stock");
    }

    const order = Order.create({
      id: randomUUID(),
      buyerId: dto.buyerId,
      sellerId: snapshot.sellerId,
      productId: dto.productId,
      quantity: Quantity.create(dto.quantity),
      status: "pending",
    });

    return this.orderRepo.create(order);
  }
}

