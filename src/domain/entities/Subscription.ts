export type SubscriptionPlan = "free" | "standard" | "premium";

export interface SubscriptionProps {
  id: string;
  sellerId: string;
  plan: SubscriptionPlan;
  activeUntil: Date;
  autoRenew: boolean;
  createdAt?: Date;
}

export class Subscription {
  private constructor(private props: SubscriptionProps) {}

  static create(props: SubscriptionProps) {
    return new Subscription({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  isActive(now = new Date()) {
    return this.props.activeUntil > now;
  }

  toJSON() {
    return this.props;
  }
}

