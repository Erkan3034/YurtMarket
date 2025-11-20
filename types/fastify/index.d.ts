declare module "fastify" {
  export interface FastifyRequest<T = any> {
    body: T extends { Body: infer B } ? B : any;
    params: T extends { Params: infer P } ? P : any;
    query: T extends { Querystring: infer Q } ? Q : any;
    user?: any;
  }

  export interface FastifyReply {
    status(code: number): FastifyReply;
    send(payload?: any): FastifyReply;
  }

  export interface FastifyInstance {
    get(path: string, handler: any): void;
    post(path: string, handler: any): void;
    put(path: string, handler: any): void;
    delete(path: string, handler: any): void;
  }
}

