# ExamForge Backend

Express + Prisma backend for ExamForge study mode and CBT mode.

## Features
- Auth (`/api/auth`)
- Account activation codes + package tiers (standard/premium)
- 3-day automatic premium trial for new student accounts
- Device lock (one account per device, account tied to its signup device)
- Subjects and topic listing (`/api/subjects`)
- Admin CRUD + bulk upload + activation/user controls (`/api/admin`)
- Practice session question selection (`/api/practice/session`)
- Attempt saving/history (`/api/attempts`)

## Setup
1. Copy env:
   - `cp .env.example .env` (or create `.env` manually on Windows)
2. Create a Supabase project and open `Project Settings -> Database -> Connection string`.
3. Set these in `.env`:
   - `DATABASE_URL` = Supabase pooler URL (port `6543`, `pgbouncer=true`)
   - `DIRECT_DATABASE_URL` = Supabase direct URL (port `5432`)
4. Generate and migrate:
   - `npm run prisma:generate`
   - `npm run prisma:migrate -- --name init`
5. Create admin:
   - Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
   - `npm run seed:admin`
6. Run server:
   - `npm run dev`

## Deploy Migrations
- Use `npm run prisma:migrate:deploy` in deployment environments.

## Quick API Notes
- `POST /api/auth/login`
- `POST /api/auth/register/student`
- `POST /api/auth/bootstrap-admin` (requires `x-bootstrap-key`)
- `POST /api/auth/activate`
- `GET /api/subjects`
- `POST /api/admin/subjects`
- `DELETE /api/admin/subjects/:id`
- `POST /api/admin/topics`
- `DELETE /api/admin/topics`
- `POST /api/admin/questions/study`
- `POST /api/admin/questions/cbt`
- `POST /api/admin/questions/bulk/study`
- `POST /api/admin/questions/bulk/cbt`
- `DELETE /api/admin/questions` (by `mode` or `ids[]`)
- `POST /api/admin/activation-codes`
- `GET /api/admin/activation-codes`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id/state`
- `DELETE /api/admin/users/:id`
- `POST /api/practice/session`
- `POST /api/attempts`
- `GET /api/attempts/me`

## Frontend Connection
- Frontend prefers same-origin when hosted online (single-domain deployment).
- Local fallback defaults to `http://localhost:4000`.
- You can override with `window.EXAMFORGE_API_BASE = "https://your-api-host"` before loading `app.js`.
