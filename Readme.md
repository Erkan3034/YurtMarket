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
2. In Project → Settings → Database grab the **pooler** connection string (port `6543`) and set `DATABASE_URL` to the Prisma-friendly URI (append `?pgbouncer=true&connection_limit=1`).
3. Enable Email login under Auth → Providers.
4. Grab `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from Project Settings → API (service-role key is required for `auth.admin.createUser`).
5. Prisma migrations çalıştırılamıyorsa (PgBouncer kısıtı) `prisma/migrations/0001_init/migration.sql` dosyasındaki SQL'i Supabase SQL Editor üzerinden uygulayıp ardından `npx prisma migrate resolve --applied 0001_init` ile yerel olarak işaretleyin.

## Backend Komutları
```
npm install
npx prisma generate
npm run dev
```

## Frontend (Next.js + Tailwind + React Query)
```
cd frontend
npm install
npm run dev
```
Ön yüz `.env.local` dosyasında `NEXT_PUBLIC_API_URL` ile Fastify tabanlı API adresini bekler. Uçlar:
- `/` : Landing + CTA
- `/login`, `/register` : React Hook Form + Supabase Auth proxy
- `/dashboard` : ürün listesi, satıcı başvurusu, ürün ekleme
- `/products` : filtrelenebilir katalog

Her sayfa mobil/tablet/masaüstü için responsive tasarlandı. Query kullanımıyla canlı veriler Fastify API'dan çekilir.
