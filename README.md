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
   - POSTs to `https://app200.sdk.thirdfactor.ai/tfauth/get-kyc-url/`
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
| `TF_JWT_SECRET` | `6usZpNjZtRPscpjAUbvm1eug19Wx6OfxeRha3M6V` |
| `TF_REQUESTING_TOKEN` | `Xig_Ddl6hr5Dy17j82smYk9FJx0MQHPnmpvTL0pO1-g` |
| `TF_BASE_URL` | `https://app200.sdk.thirdfactor.ai` |
| `TF_ISSUER` | `app200` |

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
