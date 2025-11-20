export interface ReviewProps {
  id: string;
  orderId: string;
  sellerId: string;
  rating: number;
  comment?: string | null;
  createdAt?: Date;
}

export class Review {
  private constructor(private props: ReviewProps) {}

  static create(props: ReviewProps) {
    if (props.rating < 1 || props.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    return new Review({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  toJSON() {
    return this.props;
  }

  get snapshot(): Readonly<ReviewProps> {
    return { ...this.props };
  }
}

