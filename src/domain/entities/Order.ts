import { Quantity } from "../valueObjects/Quantity";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface OrderProps {
  id: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  quantity: Quantity;
  status: OrderStatus;
  createdAt?: Date;
}

export class Order {
  private constructor(private props: OrderProps) {}

  static create(props: OrderProps) {
    return new Order({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  updateStatus(status: OrderStatus) {
    this.props.status = status;
  }

  get snapshot(): Readonly<OrderProps> {
    return { ...this.props };
  }

  toJSON() {
    return {
      ...this.props,
      quantity: this.props.quantity.value,
    };
  }
}

