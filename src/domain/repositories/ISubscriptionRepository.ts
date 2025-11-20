import { Subscription } from "../entities/Subscription";

export interface ISubscriptionRepository {
  upsert(subscription: Subscription): Promise<Subscription>;
  findBySellerId(sellerId: string): Promise<Subscription | null>;
  hasActivePremium(sellerId: string): Promise<boolean>;
}

