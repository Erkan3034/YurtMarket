import { randomUUID } from "crypto";
import { Review } from "../../../domain/entities/Review";
import { IReviewRepository } from "../../../domain/repositories/IReviewRepository";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export interface AddReviewDTO {
  orderId: string;
  rating: number;
  comment?: string;
}

export class AddReview {
  constructor(private reviewRepo: IReviewRepository, private orderRepo: IOrderRepository) {}

  async execute(dto: AddReviewDTO) {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    const review = Review.create({
      id: randomUUID(),
      orderId: dto.orderId,
      rating: dto.rating,
      comment: dto.comment,
    });

    return this.reviewRepo.create(review);
  }
}

