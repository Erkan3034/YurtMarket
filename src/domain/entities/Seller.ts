export interface SellerProps {
  id: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
  totalSales: number;
  ratingAvg: number;
  createdAt?: Date;
}

export class Seller {
  private constructor(private props: SellerProps) {}

  static create(props: SellerProps) {
    return new Seller({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  isApproved() {
    return this.props.status === "approved";
  }

  updateStatus(status: SellerProps["status"]) {
    this.props.status = status;
  }

  toJSON() {
    return this.props;
  }
}

