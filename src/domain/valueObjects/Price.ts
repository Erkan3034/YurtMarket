export class Price {
  private constructor(public readonly value: number) {}

  static create(value: number) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }

    return new Price(Number(value.toFixed(2)));
  }
}

