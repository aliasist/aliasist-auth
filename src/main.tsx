import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL?.trim()

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="https://aliasist.com"
      {...(clerkProxyUrl ? { proxyUrl: clerkProxyUrl } : {})}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
