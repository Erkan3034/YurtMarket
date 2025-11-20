import { FastifyReply, FastifyRequest } from "fastify";
import { ApplySeller, ApplySellerDTO } from "../../../application/useCases/seller/ApplySeller";
import { ApproveSeller, ApproveSellerDTO } from "../../../application/useCases/seller/ApproveSeller";
import { GetSellerStats } from "../../../application/useCases/seller/GetSellerStats";
import { ISellerRepository } from "../../../domain/repositories/ISellerRepository";

export class SellerController {
  constructor(
    private applySeller: ApplySeller,
    private approveSeller: ApproveSeller,
    private getSellerStats: GetSellerStats,
    private sellerRepo: ISellerRepository,
  ) {}

  apply = async (request: FastifyRequest<{ Body: ApplySellerDTO }>, reply: FastifyReply) => {
    const result = await this.applySeller.execute(request.body);
    reply.status(201).send(result.toJSON());
  };

  approve = async (request: FastifyRequest<{ Body: ApproveSellerDTO }>, reply: FastifyReply) => {
    const result = await this.approveSeller.execute(request.body);
    reply.status(200).send(result.toJSON());
  };

  me = async (request: FastifyRequest, reply: FastifyReply) => {
    const sellerId = (request.user as any)?.sellerId;
    if (!sellerId) {
      reply.status(404).send({ message: "Seller not found" });
      return;
    }

    const stats = await this.getSellerStats.execute({ sellerId });
    reply.send(stats);
  };

  getById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const seller = await this.sellerRepo.findById(request.params.id);
    if (!seller) {
      reply.status(404).send({ message: "Seller not found" });
      return;
    }

    reply.send(seller.toJSON());
  };

  popular = async (_request: FastifyRequest, reply: FastifyReply) => {
    const sellers = await this.sellerRepo.listPopular();
    reply.send(sellers.map((seller) => seller.toJSON()));
  };
}

