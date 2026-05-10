# Third Factor KYC Demo — Digital Wallet

A demo digital wallet app that showcases the Third Factor KYC SDK. Each time a client clicks **"Start KYC →"**, a fresh unique user session is generated automatically — no Postman, no manual link generation.

---

## How it works

1. Client visits `tfdemo.thirdfactor.ai` and sees a slick wallet UI.
2. They click **"Start KYC →"**.
3. The frontend calls `/api/get-kyc-url` (a Vercel serverless function).
4. The serverless function:
   - Generates a unique demo user ID (e.g. `demo-swift-falcon-4821`)
   - Signs a HS256 JWT with the ThirdFactor secret
   - POSTs to `https://referro.sdk.thirdfactor.ai/tfauth/get-kyc-url/`
   - Returns the one-time URL to the browser
5. Browser redirects to the ThirdFactor KYC journey.
6. On completion, the user lands on `/kyc-complete`.

Every click = a brand new user ID = no session conflicts.

---

## Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial demo app"
git remote add origin https://github.com/YOUR_ORG/tfdemo.git
git push -u origin main
```

### 2. Import on Vercel
- Go to https://vercel.com/new
- Import your GitHub repo
- Framework: **Next.js** (auto-detected)

### 3. Add Environment Variables
In Vercel → Project → Settings → Environment Variables, add:

| Key | Value |
|-----|-------|
| `TF_JWT_SECRET` | `xlG8XTIMmBMkjUsURf1s3XuVDbxbbQQ3e6OA6mVJ` |
| `TF_REQUESTING_TOKEN` | `BUSVfiDgk4QaVrbs3x1597k7PQcJAJlAkTQEcoCvucg` |
| `TF_BASE_URL` | `https://referro.sdk.thirdfactor.ai` |
| `TF_ISSUER` | `referro` |

⚠️ **Never commit `.env.local` to git** — the `.gitignore` handles this.

### 4. Add Custom Domain
In Vercel → Project → Settings → Domains, add `tfdemo.thirdfactor.ai`.
Then add a CNAME record in your DNS:
```
tfdemo.thirdfactor.ai → cname.vercel-dns.com
```

### 5. Deploy
Vercel auto-deploys on every push to `main`.

---

## Local development

```bash
npm install
# Make sure .env.local exists with the keys above
npm run dev
# Visit http://localhost:3000
```

---

## Customising the demo

- **Change wallet name/balance**: edit `pages/index.js` — the `DEMO_TRANSACTIONS` array and balance figures are all hardcoded for demo purposes.
- **Change return/callback URLs**: set via environment variables or edit `pages/api/get-kyc-url.js`.
- **Add more fake users**: edit `generateDemoUser()` in `pages/api/get-kyc-url.js`.
