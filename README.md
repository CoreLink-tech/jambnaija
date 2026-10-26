# Jambnaija

Professional JAMB UTME preparation and computer-based testing platform.

## Status

**Phase 1 complete** — Next.js App Router foundation is in place.

The previous Express + static HTML application is preserved under `legacy/` and remains fully intact for reference and gradual migration.

## Stack (target)

- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS
- Turso (libSQL) + Drizzle ORM (Phase 2+)
- Zod, Vitest, Playwright (progressive)

## Getting started (foundation)

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm test` — unit tests (Vitest)

## Directory overview

```
src/
  app/                 # App Router pages and layouts
  components/          # UI, layout, feature components
  features/            # Feature modules
  lib/                 # Shared utilities (auth, db, validation, config, errors)
  server/              # Server-only services, repositories, policies
  types/
content/jamb/          # Version-controlled question content (Phase 4+)
drizzle/               # Database migrations (Phase 2+)
tests/
legacy/                # Original application (read-only reference)
```

## Migration phases

See the master engineering prompt. We follow strict phase gates.

- Phase 0: Audit (done)
- Phase 1: Foundation (this)
- Phase 2+: Database, auth, content, features, QA, deployment

## Database (Phase 2)

- ORM: Drizzle
- Driver: `@libsql/client` (Turso / libSQL)
- Schema: `src/lib/db/schema.ts`
- Client: `src/lib/db/index.ts`
- Config: `drizzle.config.ts`
- Migrations folder: `drizzle/`

### Local development without Turso

```bash
# optional – defaults to file:local.db
echo 'DATABASE_URL=file:local.db' >> .env
npm run db:push   # or db:generate && db:migrate
```

### Turso

1. Create a database: `turso db create jambnaija`
2. Get URL: `turso db show jambnaija --url`
3. Create token: `turso db tokens create jambnaija`
4. Put values in `.env` as `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`
5. `npm run db:generate` then `npm run db:migrate`

### Data migration from the old PostgreSQL database

A safe, idempotent import strategy is prepared in `src/lib/db/import-strategy.ts`.
**No production data is migrated until you explicitly approve it and provide a backup.**

## Authentication (Phase 3)

- Password hashing: bcrypt (12 rounds)
- Sessions: database-backed, HttpOnly cookies (`jambnaija_session`), 7-day expiry
- No localStorage auth; no client-side admin fallback in the new app
- API routes:
  - `POST /api/auth/register` — student registration + 3-day premium trial
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET  /api/auth/me`
- Helpers: `requireSession`, `requireAdminSession`, `requireStudentAccess`, `requirePremiumAccess`
- Business rules for trial / plan / activation preserved from the legacy system

Device binding (one account per device) is enforced on registration and checked on login for students.

## Question content (Phase 4)

Bundled questions live under `content/jamb/`:

- `manifest.ts` — subject index and file list
- `subjects/<slug>/*.json` — validated question packs

Each question requires a stable `contentId`, options, `answerIndex`, and provenance (`source`, `verificationStatus`).

**Do not claim content is official JAMB material without verified rights and provenance.**

Commands:

```bash
npm run content:validate   # schema tests
npm run content:seed:dry   # validate + count without writing
npm run content:seed       # upsert into the database (idempotent)
```

Seeding is explicit and never runs automatically on deploy.

## Question services (Phase 5)

### Public / student
- `GET  /api/subjects` — catalog with study/CBT counts
- `GET  /api/subjects/:subjectId/topics`
- `GET  /api/subjects/:subjectId/past-sets` (auth)
- `POST /api/practice/study-session` — premium; returns questions **with** answers
- `POST /api/practice/cbt-questions` — auth; returns questions **without** answer keys

### Admin (session required)
- `GET/POST /api/admin/subjects`
- `POST /api/admin/topics`
- `GET/DELETE /api/admin/questions`
- `POST /api/admin/questions/study`
- `POST /api/admin/questions/cbt`

CBT question caps preserved: English 60, other subjects 40.

## Student UI (Phase 6)

- `/` — marketing home with links to register/login
- `/register`, `/login` — auth forms (HttpOnly session cookies)
- `/dashboard` — access status, study/CBT entry, subject catalog
- `/study` — subject/topic setup and interactive study session with explanations

Student routes are protected by the `(student)` layout (redirects if unauthenticated).

## CBT engine (Phase 7)

- `POST /api/cbt/start` — create or resume attempt; returns questions without keys
- `POST /api/cbt/save` — persist selected answers
- `POST /api/cbt/submit` — server-side score; idempotent if already submitted
- `GET  /api/cbt/attempts` — history
- `GET  /api/cbt/attempts/:id` — result + answer review
- UI: `/cbt`, `/results/[attemptId]`

Timer uses server `deadlineAt`. Refresh resumes in-progress attempts for the same subject.

## Admin dashboard (Phase 8)

Protected routes under `/admin` (ADMIN role required):

- `/admin` — stats overview
- `/admin/subjects` — create subjects/topics
- `/admin/questions` — create/list/delete study & CBT questions
- `/admin/users` — search, activate, set plan, deactivate, delete
- `/admin/codes` — generate and list activation codes

APIs: `/api/admin/stats`, `/api/admin/users`, `/api/admin/activation-codes`, plus existing subject/question admin routes.

## Activation & history (Phase 9)

- `POST /api/auth/activate` — redeem code for the logged-in student (atomic mark-used)
- `/activation` — student redemption UI
- Dashboard shows recent CBT attempts via `GET /api/cbt/attempts`
- Entitlements continue to use `resolveUserAccess` (trial → plan → activation required)
