# Aliasist Auth

![Aliasist banner](https://raw.githubusercontent.com/aliasist/aliasistabductor/master/images/aliasist_banner_orbit.png)

Aliasist uses this repo for sign-in.

It provides:

- the public authentication entry point
- a small React app
- account access for the suite
- a thin surface with limited scope

Set Clerk publishable key (and any other variables from `.env.example`) in `.env`, then:

```bash
npm run dev
```

Production uses **`VITE_CLERK_PROXY_URL`** when Clerk Frontend API is served via **`clerk.aliasist.com`** (Dashboard → DNS → Frontend API proxy). Match whatever Cloudflare Pages **environment variables** you configured alongside the deployed “domain / clerk.aliasist.com” fix.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | TypeScript + production build |
| `npm run preview` | Preview production build |

## Deploy

Static hosting (e.g. Cloudflare Pages) with SPA fallback; see `public/_redirects` for routing hints.
