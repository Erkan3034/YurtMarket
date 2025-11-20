import { Order } from "../entities/Order";
import { OrderStatus } from "../entities/Order";

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  listByBuyer(buyerId: string): Promise<Order[]>;
  updateStatus(id: string, status: OrderStatus): Promise<void>;
}

