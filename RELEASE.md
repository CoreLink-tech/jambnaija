# Release readiness — Jambnaija

## Prerequisites

- Node.js 20+
- Turso database (or local SQLite file for development)
- Environment variables (see `.env.example`)

## Environment

| Variable | Required | Notes |
|----------|----------|--------|
| `TURSO_DATABASE_URL` | Prod | libSQL URL |
| `TURSO_AUTH_TOKEN` | Prod | Turso token |
| `DATABASE_URL` | Dev optional | e.g. `file:local.db` |
| `SESSION_SECRET` | Recommended | Long random string |
| `ADMIN_BOOTSTRAP_KEY` | Optional | Only for first admin; remove after use |
| `NODE_ENV` | Prod | `production` |

Never commit `.env`. Never expose secrets via `NEXT_PUBLIC_*`.

## Local verification checklist

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run content:validate
npm run build
```

With a database:

```bash
# apply schema
npx drizzle-kit push
# or: npm run db:migrate

# seed sample content (explicit only)
npm run content:seed:dry
npm run content:seed
```

Bootstrap first admin (once):

```bash
curl -X POST http://localhost:3000/api/auth/bootstrap-admin \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"your-long-password","bootstrapKey":"YOUR_KEY"}'
```

Then **unset** `ADMIN_BOOTSTRAP_KEY`.

## Smoke test paths

1. Register student → dashboard shows trial access  
2. Study mode (premium/trial) → explanations after answer  
3. CBT → timer, save, submit → results page  
4. Admin login → create subject/question → generate activation code  
5. Student redeems code → access updates  
6. `GET /api/health` returns `{ ok: true }`

## Security checklist

- [x] HttpOnly session cookies  
- [x] Server-side scoring for CBT  
- [x] No answer keys in active CBT payloads  
- [x] Admin routes require ADMIN role  
- [x] Bootstrap admin gated by env key  
- [x] Security headers in `next.config.ts`  
- [ ] Rotate any secrets that were shared in chat/logs  
- [ ] Remove bootstrap key after first admin  
- [ ] Confirm Turso credentials are production-scoped  

## Deploy notes

- Prefer Vercel or similar Node host with Next.js 15 support  
- Set env vars in the host dashboard  
- Health check: `GET /api/health`  
- Content seeding is **manual** (`npm run content:seed`), never on every request  
- Legacy application remains under `legacy/` for reference only and is not served by Next.js  

## Known limitations (accepted for v1)

- No payment gateway (activation codes only)  
- No email password-reset flow  
- Device binding is soft (spoofable)  
- Sample question packs only unless you add licensed content  
