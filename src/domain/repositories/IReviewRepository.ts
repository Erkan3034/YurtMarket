import { Review } from "../entities/Review";

export interface IReviewRepository {
  create(review: Review): Promise<Review>;
  listByProduct(productId: string): Promise<Review[]>;
}

