export class RoomNumber {
  private constructor(public readonly value: string) {}

  static create(value: string) {
    if (!value.trim()) {
      throw new Error("Room number cannot be empty");
    }

    return new RoomNumber(value);
  }
}

