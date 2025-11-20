import { prisma } from "../database/prismaClient";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { Order, OrderStatus } from "../../domain/entities/Order";
import { Quantity } from "../../domain/valueObjects/Quantity";

type OrderRecord = Awaited<ReturnType<typeof prisma.order.findUnique>>;

export class PrismaOrderRepository implements IOrderRepository {
  async create(order: Order) {
    await prisma.order.create({ data: this.toPersistence(order) });
    return order;
  }

  async save(order: Order) {
    await prisma.order.update({
      where: { id: order.snapshot.id },
      data: this.toPersistence(order),
    });

    return order;
  }

  async findById(id: string) {
    const record = await prisma.order.findUnique({ where: { id } });
    return record ? this.toDomain(record) : null;
  }

  async listByBuyer(buyerId: string) {
    const records = await prisma.order.findMany({ where: { buyerId }, orderBy: { createdAt: "desc" } });
    return records.map((record) => this.toDomain(record as NonNullable<OrderRecord>));
  }

  async updateStatus(id: string, status: OrderStatus) {
    await prisma.order.update({ where: { id }, data: { status } });
  }

  private toPersistence(order: Order) {
    const json = order.toJSON();
    return {
      id: json.id,
      buyerId: json.buyerId,
      sellerId: json.sellerId,
      productId: json.productId,
      quantity: json.quantity,
      status: json.status,
    };
  }

  private toDomain(record: NonNullable<OrderRecord>) {
    return Order.create({
      id: record.id,
      buyerId: record.buyerId,
      sellerId: record.sellerId,
      productId: record.productId,
      quantity: Quantity.create(record.quantity),
      status: record.status as OrderStatus,
      createdAt: record.createdAt ?? undefined,
    });
  }
}

