# 🚀 KGN — Free Hosting Guide for BOTH Website (UI) and API

You have two pieces:

```
kgn-website/   →  the website your customers see   (host on Netlify — FREE)
kgn-backend/   →  the API (products, enquiries, orders)  (host on Render — FREE)
```

They work together, but the website also works **on its own** if you never deploy
the API. So you can go live with just the website today, and add the API later.

```
   Customer's phone ──> kgn-website (Netlify)
                              │  fetch products / send enquiries
                              ▼
                        kgn-backend API (Render)
                              │
                              ▼
                     Free Postgres database (Neon)  ← optional, for saving data
```

---

## PART A — Host the WEBSITE (UI) for FREE  ·  ~3 minutes

### Netlify (easiest)
1. Go to **https://app.netlify.com/drop**
2. Drag the **entire `kgn-website` folder** (with its `images/` subfolder) onto the page.
   - Drag the *folder*, not just `index.html`.
3. In ~30 seconds you get a live URL like `https://random-name.netlify.app`.
4. (Optional) Sign up free → **Site settings → Change site name** → type `kgnpowertools`
   to get `https://kgnpowertools.netlify.app`.

✅ That's a fully working store with all 14 products, search, filters, WhatsApp button,
and click-to-call. **Total cost: ₹0.**

> Other free options that work the same way: Cloudflare Pages, Vercel, GitHub Pages.

If you only want the website, **you're done.** The enquiry form will send messages
to your WhatsApp automatically. Continue to Part B only when you want a real backend.

---

## PART B — Host the API for FREE  ·  ~15 minutes

We'll use **Render** (free tier) because it can build straight from a Dockerfile and
needs no card for the free plan. Optionally we add a free **Neon** Postgres so your
enquiries and orders are saved permanently.

### Step 1 — Put the code on GitHub (free)
1. Create a free account at **https://github.com**.
2. Click **New repository** → name it `kgn-backend` → **Public** → **Create**.
3. Click **uploading an existing file** → drag everything inside the `kgn-backend`
   folder (the `pom.xml`, `Dockerfile`, and the `src/` folder) → **Commit changes**.

> ⚠️ Do **not** upload any file containing real passwords or keys. The `.env.example`
> is safe (it has no real values). Never fill it in and commit it.

### Step 2 — (Optional but recommended) Free Postgres on Neon
Without this, the API still runs but **forgets** enquiries/orders when it restarts.
With it, everything is saved.

1. Sign up free at **https://neon.tech**.
2. Create a project → it gives you a connection string that looks like:
   `postgresql://USER:PASSWORD@ep-xxxx.aws.neon.tech/DBNAME?sslmode=require`
3. From that, you'll set three values in Step 4:
   - `SPRING_DATASOURCE_URL` = `jdbc:postgresql://ep-xxxx.aws.neon.tech/DBNAME?sslmode=require`
     *(note: it starts with `jdbc:postgresql://`, and the user/password are separate)*
   - `SPRING_DATASOURCE_USERNAME` = `USER`
   - `SPRING_DATASOURCE_PASSWORD` = `PASSWORD`

### Step 3 — Create the service on Render
1. Sign up free at **https://render.com** (you can sign in with GitHub).
2. **New +** → **Web Service** → connect your `kgn-backend` GitHub repo.
3. Render detects the **Dockerfile** automatically. Settings:
   - **Region:** Singapore (closest to India)
   - **Instance type:** **Free**
   - Leave build/start commands as default (the Dockerfile handles it).

### Step 4 — Set environment variables on Render
In the service's **Environment** section, add these (this is where secrets live —
never in the code):

| Key | Value |
|---|---|
| `ALLOWED_ORIGINS` | your website URL, e.g. `https://kgnpowertools.netlify.app` |
| `ADMIN_API_KEY` | a long random string — generate one below |
| `SPRING_DATASOURCE_URL` | *(only if using Neon)* your `jdbc:postgresql://...` URL |
| `SPRING_DATASOURCE_USERNAME` | *(only if using Neon)* DB user |
| `SPRING_DATASOURCE_PASSWORD` | *(only if using Neon)* DB password |

Generate a strong admin key on your computer:
```bash
openssl rand -hex 24
```
(or just use any 30+ character random mix of letters and numbers).

Click **Create Web Service**. First build takes a few minutes.

### Step 5 — Get your API URL and test it
Render gives you a URL like `https://kgn-backend.onrender.com`. Test it:
```
https://kgn-backend.onrender.com/api/products
```
You should see the product list as JSON. 🎉

### Step 6 — Connect the WEBSITE to the API
1. Open `kgn-website/index.html` in Notepad / VS Code.
2. Find this line (near the bottom):
   ```js
   window.KGN_API_BASE = window.KGN_API_BASE || "";
   ```
3. Put your Render URL inside the quotes:
   ```js
   window.KGN_API_BASE = window.KGN_API_BASE || "https://kgn-backend.onrender.com";
   ```
4. Save, then **re-drag the `kgn-website` folder** to Netlify to update it.

Now the website loads products from your API and submits enquiries to it. If the API
is ever down, the site automatically falls back to the built-in product list and the
WhatsApp enquiry — so customers are never blocked.

---

## ⚠️ Honest notes about FREE tiers

- **Render free spins down after ~15 min of no traffic.** The next visit then waits
  ~30–60 seconds while it wakes up. For a small shop this is usually fine. (Your
  website itself is always instant — only the live-products fetch waits, and it falls
  back to built-in products if the API is still waking.)
- **Without Neon Postgres, data is not saved** across restarts. Add Neon (free) if you
  want to keep enquiries and orders.
- These free tiers are perfect for getting started. If traffic grows, Render's paid
  plan (~$7/mo) removes the spin-down.

### Lighter alternative
If the Java cold-start bothers you, the same API as a small **Node.js** service would
be lighter and wake faster on free tiers. Ask and it can be converted — the website
doesn't change at all, only `KGN_API_BASE`.

Other free API hosts that also work with this Dockerfile: **Railway**, **Fly.io**,
**Koyeb**.

---

## ✅ Go-live checklist

- [ ] Website dragged to Netlify, all 14 product images load
- [ ] Phone numbers dial when tapped; WhatsApp button opens chat to 9766551976
- [ ] (If using API) `/api/products` returns JSON on your Render URL
- [ ] `ALLOWED_ORIGINS` on Render is set to your real Netlify URL (not `*`)
- [ ] `ADMIN_API_KEY` set to a long random value
- [ ] `KGN_API_BASE` in `index.html` points to your API URL, site re-uploaded
- [ ] Tested on a real phone
- [ ] Added the shop to Google My Business with the website link

---

## 💰 Cost summary

| Item | Cost |
|---|---|
| Website hosting (Netlify) | FREE |
| API hosting (Render free) | FREE |
| Database (Neon free) | FREE |
| HTTPS / SSL on both | FREE |
| **Total** | **₹0 / month** |
| Optional custom domain `kgnpowertools.com` | ~₹800 / year |

---

**KGN Power Tools & Materials** · Noori Chowk, Maheboob Nagar, Nanded
📞 Noor Bhai 9766551976 · Zafar Khan 9822642831
