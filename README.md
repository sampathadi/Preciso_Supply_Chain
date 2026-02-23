# Enterprise Supply Chain — Local setup

Quick notes to run the app locally and enable OAuth (Google & Microsoft).

1) Backend (Express)

- Copy `backend-node/.env.example` to `backend-node/.env` and fill values.
- Install deps and start dev server:

```bash
cd backend-node
npm install
npm run dev # nodemon
```

- Ensure `MONGO_URI` points to your MongoDB instance.
- Create OAuth credentials for Google and Microsoft and set the redirect URIs:
  - Google: `http://localhost:5000/api/auth/google/callback`
  - Microsoft: `http://localhost:5000/api/auth/microsoft/callback`

2) Frontend (React)

- Copy `frontend/.env.example` to `frontend/.env` and set `REACT_APP_BACKEND_URL` if your backend runs on a different host/port.
- Install and start:

```bash
cd frontend
npm install
npm start
```

3) How OAuth works here

- The frontend social buttons redirect the browser to `${REACT_APP_BACKEND_URL}/api/auth/google` or `/api/auth/microsoft`.
- Backend uses Passport to complete OAuth and creates a JWT for the user.
- After successful OAuth backend redirects the browser to `/oauth-success?token=<JWT>` on the frontend.
- `frontend/src/pages/OAuthSuccess.jsx` stores the token in `localStorage` and navigates to `/dashboard`.

4) Troubleshooting

- If you don't set OAuth client IDs/secrets, the server will still start but OAuth strategies won't be enabled.
- Check console logs for warnings about missing credentials.
