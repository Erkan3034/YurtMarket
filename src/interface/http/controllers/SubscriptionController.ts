import { FastifyReply, FastifyRequest } from "fastify";
import { CreateSubscription, CreateSubscriptionDTO } from "../../../application/useCases/subscription/CreateSubscription";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";

export class SubscriptionController {
  constructor(
    private createSubscription: CreateSubscription,
    private subscriptionRepo: ISubscriptionRepository,
  ) {}

  upgrade = async (request: FastifyRequest<{ Body: CreateSubscriptionDTO }>, reply: FastifyReply) => {
    const subscription = await this.createSubscription.execute(request.body);
    reply.status(201).send(subscription.toJSON());
  };

  me = async (
    request: FastifyRequest<{ Querystring: { sellerId?: string } }>,
    reply: FastifyReply,
  ) => {
    const sellerId = (request.user as any)?.sellerId ?? request.query.sellerId;
    const subscription = sellerId ? await this.subscriptionRepo.findBySellerId(sellerId as string) : null;
    reply.send(subscription ? subscription.toJSON() : null);
  };
}

