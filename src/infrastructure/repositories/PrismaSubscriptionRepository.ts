import { prisma } from "../database/prismaClient";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { Subscription, SubscriptionPlan } from "../../domain/entities/Subscription";

type SubscriptionRecord = Awaited<ReturnType<typeof prisma.subscription.findUnique>>;

export class PrismaSubscriptionRepository implements ISubscriptionRepository {
  async upsert(sub: Subscription) {
    const data = sub.toJSON();

    await prisma.subscription.upsert({
      where: { sellerId: data.sellerId },
      update: {
        plan: data.plan,
        activeUntil: data.activeUntil,
        autoRenew: data.autoRenew,
      },
      create: {
        id: data.id,
        sellerId: data.sellerId,
        plan: data.plan,
        activeUntil: data.activeUntil,
        autoRenew: data.autoRenew,
      },
    });

    return sub;
  }

  async findBySellerId(sellerId: string) {
    const record = await prisma.subscription.findUnique({ where: { sellerId } });
    return record ? this.toDomain(record) : null;
  }

  async hasActivePremium(sellerId: string) {
    const record = await prisma.subscription.findFirst({
      where: {
        sellerId,
        plan: { not: "free" },
        activeUntil: { gt: new Date() },
      },
    });

    return Boolean(record);
  }

  private toDomain(record: NonNullable<SubscriptionRecord>) {
    return Subscription.create({
      id: record.id,
      sellerId: record.sellerId,
      plan: record.plan as SubscriptionPlan,
      activeUntil: record.activeUntil,
      autoRenew: record.autoRenew,
      createdAt: record.createdAt ?? undefined,
    });
  }
}

