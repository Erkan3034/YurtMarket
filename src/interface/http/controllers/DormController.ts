import { FastifyReply, FastifyRequest } from "fastify";
import { ListDormSellers, ListDormSellersDTO } from "../../../application/useCases/dorm/ListDormSellers";
import { IDormRepository } from "../../../domain/repositories/IDormRepository";

export class DormController {
  constructor(private listDormSellers: ListDormSellers, private dormRepo: IDormRepository) {}

  listSellers = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const sellers = await this.listDormSellers.execute({ dormId: request.params.id } as ListDormSellersDTO);
    reply.send(sellers.map((seller) => seller.toJSON()));
  };

  listDorms = async (_request: FastifyRequest, reply: FastifyReply) => {
    const dorms = await this.dormRepo.listAll();
    reply.send(dorms.map((dorm) => dorm.toJSON()));
  };
}

