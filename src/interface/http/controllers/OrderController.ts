import { FastifyReply, FastifyRequest } from "fastify";
import { CreateOrder, CreateOrderDTO } from "../../../application/useCases/order/CreateOrder";
import { CancelOrder } from "../../../application/useCases/order/CancelOrder";
import { UpdateOrderStatus, UpdateOrderStatusDTO } from "../../../application/useCases/order/UpdateOrderStatus";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";

export class OrderController {
  constructor(
    private createOrder: CreateOrder,
    private cancelOrder: CancelOrder,
    private updateOrderStatus: UpdateOrderStatus,
    private orderRepo: IOrderRepository,
  ) {}

  create = async (request: FastifyRequest<{ Body: CreateOrderDTO }>, reply: FastifyReply) => {
    const order = await this.createOrder.execute({
      ...request.body,
      buyerId: (request.user as any)?.id ?? request.body.buyerId,
    });
    reply.status(201).send(order.toJSON());
  };

  updateStatus = async (
    request: FastifyRequest<{ Params: { id: string }; Body: { status: UpdateOrderStatusDTO["status"] } }>,
    reply: FastifyReply,
  ) => {
    const { status } = request.body;
    let order;

    if (status === "cancelled") {
      const buyerId = (request.user as any)?.id;
      if (!buyerId) {
        reply.status(401).send({ message: "Unauthorized" });
        return;
      }

      order = await this.cancelOrder.execute({
        orderId: request.params.id,
        buyerId,
      });
    } else {
      order = await this.updateOrderStatus.execute({ orderId: request.params.id, status });
    }

    reply.send(order.toJSON());
  };

  listMine = async (request: FastifyRequest, reply: FastifyReply) => {
    const buyerId = (request.user as any)?.id;
    if (!buyerId) {
      reply.status(401).send({ message: "Unauthorized" });
      return;
    }

    const orders = await this.orderRepo.listByBuyer(buyerId);
    reply.send(orders.map((order) => order.toJSON()));
  };
}

