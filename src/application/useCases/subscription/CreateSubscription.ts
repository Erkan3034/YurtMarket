import { randomUUID } from "crypto";
import { Subscription, SubscriptionPlan } from "../../../domain/entities/Subscription";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { ISellerRepository } from "../../../domain/repositories/ISellerRepository";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export interface CreateSubscriptionDTO {
  sellerId: string;
  plan: SubscriptionPlan;
  durationInDays: number;
  autoRenew: boolean;
}

export class CreateSubscription {
  constructor(
    private subscriptionRepo: ISubscriptionRepository,
    private sellerRepo: ISellerRepository,
  ) {}

  async execute(dto: CreateSubscriptionDTO) {
    const seller = await this.sellerRepo.findById(dto.sellerId);
    if (!seller) {
      throw new NotFoundError("Seller not found");
    }

    const subscription = Subscription.create({
      id: randomUUID(),
      sellerId: dto.sellerId,
      plan: dto.plan,
      autoRenew: dto.autoRenew,
      activeUntil: new Date(Date.now() + dto.durationInDays * 24 * 60 * 60 * 1000),
    });

    return this.subscriptionRepo.upsert(subscription);
  }
}

