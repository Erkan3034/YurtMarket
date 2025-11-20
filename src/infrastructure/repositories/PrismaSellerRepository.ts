import { prisma } from "../database/prismaClient";
import { ISellerRepository, SellerStats } from "../../domain/repositories/ISellerRepository";
import { Seller, SellerProps } from "../../domain/entities/Seller";

type SellerRecord = Awaited<ReturnType<typeof prisma.seller.findUnique>>;

export class PrismaSellerRepository implements ISellerRepository {
  async create(seller: Seller) {
    const json = seller.toJSON();
    await prisma.seller.create({
      data: {
        id: json.id,
        userId: json.userId,
        status: json.status,
        totalSales: json.totalSales,
        ratingAvg: json.ratingAvg,
      },
    });

    return seller;
  }

  async save(seller: Seller) {
    const json = seller.toJSON();
    await prisma.seller.update({
      where: { id: json.id },
      data: {
        status: json.status,
        totalSales: json.totalSales,
        ratingAvg: json.ratingAvg,
      },
    });

    return seller;
  }

  async findById(id: string) {
    const record = await prisma.seller.findUnique({ where: { id } });
    return record ? this.toDomain(record) : null;
  }

  async findByUserId(userId: string) {
    const record = await prisma.seller.findUnique({ where: { userId } });
    return record ? this.toDomain(record) : null;
  }

  async listPopular() {
    const records = await prisma.seller.findMany({
      orderBy: [{ ratingAvg: "desc" }, { totalSales: "desc" }],
      take: 10,
    });

    return records.map((record: (typeof records)[number]) =>
      this.toDomain(record as NonNullable<SellerRecord>),
    );
  }

  async getStats(sellerId: string): Promise<SellerStats | null> {
    const record = await prisma.seller.findUnique({
      where: { id: sellerId },
      include: { products: true },
    });

    if (!record) return null;

    return {
      totalSales: record.totalSales,
      ratingAvg: record.ratingAvg,
      productCount: record.products.length,
    };
  }

  async hasPremiumPlan(sellerId: string) {
    const subscription = await prisma.subscription.findUnique({ where: { sellerId } });
    return Boolean(subscription && subscription.plan !== "free" && subscription.activeUntil > new Date());
  }

  private toDomain(record: NonNullable<SellerRecord>) {
    return Seller.create({
      id: record.id,
      userId: record.userId,
      status: record.status as SellerProps["status"],
      totalSales: record.totalSales,
      ratingAvg: record.ratingAvg,
      createdAt: record.createdAt ?? undefined,
    });
  }
}

