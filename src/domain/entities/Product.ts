import { Price } from "../valueObjects/Price";
import { Quantity } from "../valueObjects/Quantity";

export interface ProductProps {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: Price;
  stock: Quantity;
  isActive?: boolean;
  categoryId?: string | null;
  createdAt?: Date;
}

export class Product {
  private constructor(private props: ProductProps) {}

  static create(props: ProductProps) {
    return new Product({
      ...props,
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  deactivate() {
    this.props.isActive = false;
  }

  get snapshot(): Readonly<ProductProps> {
    return { ...this.props };
  }

  update(fields: Partial<Omit<ProductProps, "id" | "sellerId" | "createdAt">>) {
    this.props = {
      ...this.props,
      ...fields,
    };
  }

  toJSON() {
    return {
      ...this.props,
      price: this.props.price.value,
      stock: this.props.stock.value,
    };
  }
}

