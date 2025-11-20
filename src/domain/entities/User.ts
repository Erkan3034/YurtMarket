import { PhoneNumber } from "../valueObjects/PhoneNumber";
import { RoomNumber } from "../valueObjects/RoomNumber";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  phone?: PhoneNumber | null;
  dormId: string;
  roomNumber?: RoomNumber | null;
  createdAt?: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: UserProps) {
    return new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  toJSON() {
    return {
      ...this.props,
      phone: this.props.phone?.value ?? null,
      roomNumber: this.props.roomNumber?.value ?? null,
    };
  }

  get id() {
    return this.props.id;
  }

  get dormId() {
    return this.props.dormId;
  }
}

