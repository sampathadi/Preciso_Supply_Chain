# Backend — Enterprise Supply Chain

This document contains backend-specific setup and troubleshooting notes.

Quick start

1. Copy `backend-node/.env.example` to `backend-node/.env` and fill in values.
2. Install dependencies and start the server:

```bash
cd backend-node
npm install
npm run dev
```

Important env vars

- `MONGO_URI` — MongoDB connection string.
- `JWT_SECRET` — secret used to sign JWT tokens.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth credentials.
- `MICROSOFT_CLIENT_ID` / `MICROSOFT_CLIENT_SECRET` — Microsoft OAuth credentials.
- `BACKEND_URL` / `FRONTEND_URL` — used to build OAuth callback and redirect URLs.

OAuth notes

- If OAuth client IDs/secrets are not provided the server will still start, but Google/Microsoft strategies will be disabled and a console warning will be shown.
- Redirect URIs to configure in provider dashboards:
  - Google: `http://localhost:5000/api/auth/google/callback`
  - Microsoft: `http://localhost:5000/api/auth/microsoft/callback`
- The backend will redirect successful OAuth logins to the frontend at:
  `http://localhost:3000/oauth-success?token=<JWT>`

Troubleshooting

- If the server crashes with "OAuth2Strategy requires a clientID option" — ensure env vars are set or restart after adding `.env`.
- Check nodemon logs for warnings about missing OAuth credentials.
