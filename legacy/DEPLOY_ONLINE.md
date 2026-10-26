# Deploy Online (Frontend + Backend Together)

This project is now configured to run as one online Node service:
- API routes under `/api/*`
- Frontend pages served by the same server (`/`, `/student-register.html`, `/student.html`, etc.)

For Vercel, this repo now includes:
- [vercel.json](/c:/Users/USETR/Desktop/test%20file/vercel.json)
- [api/index.mjs](/c:/Users/USETR/Desktop/test%20file/api/index.mjs)

## 1. Use your Supabase/Postgres production DB
Set these environment variables in your hosting provider:
- `DATABASE_URL`
- `DIRECT_DATABASE_URL`
- `JWT_SECRET`
- `CORS_ORIGIN=*`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- optional: `ADMIN_BOOTSTRAP_KEY`

## 2. Deploy on Render (recommended)
This repo includes [render.yaml](/c:/Users/USETR/Desktop/test%20file/render.yaml).

Steps:
1. Push this project to GitHub.
2. In Render: `New +` -> `Blueprint`.
3. Select your repo and deploy.
4. In service environment settings, fill required secrets (`DATABASE_URL`, `DIRECT_DATABASE_URL`, `JWT_SECRET`, etc.).

## Vercel Deployment
If you deploy on Vercel:
1. Import this GitHub repo into Vercel.
2. Keep framework preset as `Other`.
3. Ensure environment variables are set in Vercel project settings:
   - `DATABASE_URL`
   - `DIRECT_DATABASE_URL`
   - `JWT_SECRET`
   - `CORS_ORIGIN=*`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
4. Redeploy so `vercel.json` and `api/index.mjs` are used.

## 3. Prisma migration and client generation
This repo now runs both automatically during build:
- `npm --prefix backend run prisma:migrate:deploy`
- `npm --prefix backend run prisma:generate`

So after pushing, a fresh Vercel/Render deploy will apply pending migrations and regenerate Prisma client online.

## 4. Verify online
Open:
- `https://your-domain/api/health` -> should return JSON `{ ok: true, ... }`
- `https://your-domain/` -> login page should load
- `https://your-domain/student-register.html` -> registration should work

## 5. Optional custom domain
Attach domain in host dashboard and set DNS.

---
If `Unexpected server error` appears after deployment, verify:
- build logs show `prisma:migrate:deploy` and `prisma:generate` succeeded
- `DATABASE_URL` and `DIRECT_DATABASE_URL` are set correctly in your host
