/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  /** Proxies Clerk.js / FAPI via your domain — see Clerk “Proxying the Frontend API”. */
  readonly VITE_CLERK_PROXY_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
