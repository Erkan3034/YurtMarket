import { prisma } from "../database/prismaClient";
import { IReviewRepository } from "../../domain/repositories/IReviewRepository";
import { Review } from "../../domain/entities/Review";

type ReviewRecord = Awaited<ReturnType<typeof prisma.review.findUnique>>;

export class PrismaReviewRepository implements IReviewRepository {
  async create(review: Review) {
    await prisma.review.create({ data: review.toJSON() });
    return review;
  }

  async listByProduct(productId: string) {
    const records = await prisma.review.findMany({
      where: { order: { productId } },
      orderBy: { createdAt: "desc" },
    });

    return records.map((record) => this.toDomain(record as NonNullable<ReviewRecord>));
  }

  private toDomain(record: NonNullable<ReviewRecord>) {
    return Review.create({
      id: record.id,
      orderId: record.orderId,
      rating: record.rating,
      comment: record.comment ?? undefined,
      createdAt: record.createdAt ?? undefined,
    });
  }
}

