import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import { OrderStatus } from "../../../domain/entities/Order";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export interface UpdateOrderStatusDTO {
  orderId: string;
  status: OrderStatus;
}

export class UpdateOrderStatus {
  constructor(private orderRepo: IOrderRepository) {}

  async execute(dto: UpdateOrderStatusDTO) {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    order.updateStatus(dto.status);
    return this.orderRepo.save(order);
  }
}

