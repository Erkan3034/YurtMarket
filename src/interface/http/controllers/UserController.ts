import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUser, RegisterUserDTO } from "../../../application/useCases/user/RegisterUser";
import { LoginUser, LoginUserDTO } from "../../../application/useCases/user/LoginUser";

export class UserController {
  constructor(private registerUser: RegisterUser, private loginUser: LoginUser) {}

  register = async (request: FastifyRequest<{ Body: RegisterUserDTO }>, reply: FastifyReply) => {
    const user = await this.registerUser.execute(request.body);
    reply.status(201).send(user.toJSON());
  };

  login = async (request: FastifyRequest<{ Body: LoginUserDTO }>, reply: FastifyReply) => {
    const result = await this.loginUser.execute(request.body);
    reply.status(200).send({
      user: result.user.toJSON(),
      session: result.session,
    });
  };
}

