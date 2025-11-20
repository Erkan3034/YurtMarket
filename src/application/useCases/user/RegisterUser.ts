import { randomUUID } from "crypto";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { PhoneNumber } from "../../../domain/valueObjects/PhoneNumber";
import { RoomNumber } from "../../../domain/valueObjects/RoomNumber";
import { DomainError } from "../../../shared/errors/DomainError";

export interface AuthProvider {
  signUp(email: string, password: string): Promise<{ userId: string }>;
}

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  dormId: string;
  roomNumber?: string;
  phone?: string;
}

export class RegisterUser {
  constructor(private userRepo: IUserRepository, private authProvider: AuthProvider) {}

  async execute(dto: RegisterUserDTO) {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new DomainError("User already exists");
    }

    await this.authProvider.signUp(dto.email, dto.password);

    const user = User.create({
      id: randomUUID(),
      name: dto.name,
      email: dto.email,
      dormId: dto.dormId,
      phone: dto.phone ? PhoneNumber.create(dto.phone) : null,
      roomNumber: dto.roomNumber ? RoomNumber.create(dto.roomNumber) : null,
    });

    return this.userRepo.create(user);
  }
}

