import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { DomainError } from "../../../shared/errors/DomainError";

export interface CancelOrderDTO {
  orderId: string;
  buyerId: string;
}

export class CancelOrder {
  constructor(private orderRepo: IOrderRepository) {}

  async execute(dto: CancelOrderDTO) {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (order.snapshot.buyerId !== dto.buyerId) {
      throw new DomainError("Forbidden");
    }

    order.updateStatus("cancelled");
    return this.orderRepo.save(order);
  }
}

