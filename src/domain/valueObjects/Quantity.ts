export class Quantity {
  private constructor(public readonly value: number) {}

  static create(value: number) {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error("Quantity must be a positive integer");
    }

    return new Quantity(value);
  }
}

