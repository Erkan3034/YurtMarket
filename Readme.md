# Yurt Market

Clean-architecture modular monolith for a dorm-centric marketplace. The scaffold includes domain entities, repository interfaces, Fastify-facing controllers/routes, Prisma schema, Supabase auth adapter, and starter infrastructure so you can begin wiring real logic immediately.

## Tech Stack
- Language: TypeScript (ESM-ready)
- Backend runtime: Node.js + Fastify HTTP layer
- ORM: Prisma with Supabase PostgreSQL
- Auth: Supabase Auth (JWT)
- Email: Nodemailer via SMTP
- Deployment target: Vercel (frontend) + Supabase (backend DB/Auth)

## Folder Structure
```
src/
  domain/ (entities, value objects, repository contracts)
  application/ (use cases orchestrating domain + infra)
  infrastructure/ (Prisma, auth, notifications, repo impls)
  interface/http/ (controllers + Fastify routes)
  shared/ (errors, utils, middleware, constants)
prisma/ (Prisma schema + migrations)
```

## REST API Surface
- Auth: `POST /auth/register`, `POST /auth/login`
- Seller: `POST /seller/apply`, `GET /seller/me`, `GET /seller/:id`, `GET /seller/popular`
- Product: `POST /product`, `PUT /product/:id`, `DELETE /product/:id`, `GET /product/:id`, `GET /product?dormId=xxx&category=xxx`
- Order: `POST /order`, `PUT /order/:id/status`, `GET /order/me`
- Review: `POST /review`, `GET /review/product/:id`
- Subscription: `POST /subscription/upgrade`, `GET /subscription/me`
- Dorm: `GET /dorm/:id/sellers`, `GET /dorm/list`

Endpoints are scaffolded under `src/interface/http/routes/*` and call controllers that delegate to use cases. Plug these routes into your Fastify instance (see `src/interface/http/routes/index.ts` tbd) and inject adapters via your DI container.

## Environment Template
Copy `env.template` to `.env` and fill in:
```
DATABASE_URL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

## Supabase Setup
1. Create a new project at https://supabase.com.
2. In Project → Settings → Database grab the connection string and set `DATABASE_URL`.
3. Enable Email login under Auth → Providers.
4. Grab `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from Project Settings → API.
5. Run `npx prisma generate` and `npx prisma migrate dev` once `.env` is ready.

## Initial Commands
```
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

The repo currently contains scaffolds and templates—feel free to extend use cases, controllers, and repositories with real logic as you integrate Supabase and Next.js frontend clients.
