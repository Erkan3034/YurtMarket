import { prisma } from "../database/prismaClient";
import { IDormRepository } from "../../domain/repositories/IDormRepository";
import { Dorm } from "../../domain/entities/Dorm";
import { Seller } from "../../domain/entities/Seller";

type DormRecord = Awaited<ReturnType<typeof prisma.dorm.findUnique>>;

export class PrismaDormRepository implements IDormRepository {
  async findById(id: string) {
    const record = await prisma.dorm.findUnique({ where: { id } });
    return record ? this.toDomain(record) : null;
  }

  async listAll() {
    const records = await prisma.dorm.findMany({ orderBy: { name: "asc" } });
    return records.map((record: (typeof records)[number]) =>
      this.toDomain(record as NonNullable<DormRecord>),
    );
  }

  async listSellers(dormId: string) {
    const sellers = await prisma.seller.findMany({
      where: { user: { dormId }, status: "approved" },
      include: { user: true },
    });

    return sellers.map((record: any) =>
      Seller.create({
        id: record.id,
        userId: record.userId,
        status: record.status as "approved" | "pending" | "rejected",
        totalSales: record.totalSales,
        ratingAvg: record.ratingAvg,
        createdAt: record.createdAt ?? undefined,
      }),
    );
  }

  private toDomain(record: NonNullable<DormRecord>) {
    return Dorm.create({
      id: record.id,
      name: record.name,
      location: record.location ?? undefined,
    });
  }
}

