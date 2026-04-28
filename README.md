# Aliasist Auth

Central **authentication portal** for the Aliasist suite — **auth.aliasist.com**. Built with React, Vite, and [Clerk](https://clerk.com/).

**Suite:** [aliasist.com](https://aliasist.com)

## Local development

```bash
npm install
cp .env.example .env
```

Set Clerk publishable key (and any other variables from `.env.example`) in `.env`, then:

```bash
npm run dev
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | TypeScript + production build |
| `npm run preview` | Preview production build |

## Deploy

Static hosting (e.g. Cloudflare Pages) with SPA fallback; see `public/_redirects` for routing hints.
