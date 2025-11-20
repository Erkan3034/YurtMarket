import { FastifyReply, FastifyRequest } from "fastify";

export async function authGuard(request: FastifyRequest, reply: FastifyReply) {
  const user = (request as any).user;
  if (!user) {
    reply.status(401).send({ message: "Unauthorized" });
  }
}

