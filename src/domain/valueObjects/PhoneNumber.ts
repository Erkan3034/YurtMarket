const PHONE_REGEX = /^\+?[0-9\s\-]{7,15}$/;

export class PhoneNumber {
  private constructor(public readonly value: string) {}

  static create(value: string) {
    if (!PHONE_REGEX.test(value)) {
      throw new Error("Invalid phone number");
    }

    return new PhoneNumber(value);
  }
}

