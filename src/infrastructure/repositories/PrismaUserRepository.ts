import { prisma } from "../database/prismaClient";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { PhoneNumber } from "../../domain/valueObjects/PhoneNumber";
import { RoomNumber } from "../../domain/valueObjects/RoomNumber";

type UserRecord = Awaited<ReturnType<typeof prisma.user.findUnique>>;

export class PrismaUserRepository implements IUserRepository {
  async create(user: User) {
    const json = user.toJSON();
    await prisma.user.create({
      data: {
        id: json.id,
        name: json.name,
        email: json.email,
        dormId: json.dormId,
        phone: json.phone,
        roomNumber: json.roomNumber,
      },
    });

    return user;
  }

  async save(user: User) {
    const json = user.toJSON();
    await prisma.user.update({
      where: { id: json.id },
      data: {
        name: json.name,
        phone: json.phone,
        roomNumber: json.roomNumber,
      },
    });

    return user;
  }

  async findById(id: string) {
    const record = await prisma.user.findUnique({ where: { id } });
    return record ? this.toDomain(record) : null;
  }

  async findByEmail(email: string) {
    const record = await prisma.user.findUnique({ where: { email } });
    return record ? this.toDomain(record) : null;
  }

  async listByDorm(dormId: string) {
    const records = await prisma.user.findMany({ where: { dormId } });
    return records.map((record) => this.toDomain(record as NonNullable<UserRecord>));
  }

  private toDomain(record: NonNullable<UserRecord>) {
    return User.create({
      id: record.id,
      name: record.name,
      email: record.email,
      dormId: record.dormId,
      phone: record.phone ? PhoneNumber.create(record.phone) : null,
      roomNumber: record.roomNumber ? RoomNumber.create(record.roomNumber) : null,
      createdAt: record.createdAt ?? undefined,
    });
  }
}

