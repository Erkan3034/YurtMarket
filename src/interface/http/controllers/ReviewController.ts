import { FastifyReply, FastifyRequest } from "fastify";
import { AddReview, AddReviewDTO } from "../../../application/useCases/review/AddReview";
import { IReviewRepository } from "../../../domain/repositories/IReviewRepository";

export class ReviewController {
  constructor(private addReview: AddReview, private reviewRepo: IReviewRepository) {}

  create = async (request: FastifyRequest<{ Body: AddReviewDTO }>, reply: FastifyReply) => {
    const review = await this.addReview.execute(request.body);
    reply.status(201).send(review.toJSON());
  };

  listByProduct = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const reviews = await this.reviewRepo.listByProduct(request.params.id);
    reply.send(reviews.map((review) => review.toJSON()));
  };
}

