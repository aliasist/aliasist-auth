import { Show, SignIn, SignUp, UserButton, useUser } from '@clerk/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const SUITE = [
  { name: 'DataSist',  sub: 'AI Data Center Intel',     href: 'https://datasist-frontend.pages.dev', icon: '🌐' },
  { name: 'PulseSist', sub: 'Stock Market Intelligence', href: 'https://pulse.aliasist.com',          icon: '📈' },
  { name: 'SpaceSist', sub: 'Live Space Portal',         href: 'https://space.aliasist.com',           icon: '🌌' },
  { name: 'Aliasist',  sub: 'Portfolio & Projects',      href: 'https://aliasist.com',                 icon: '🛸' },
]

const WORDMARK = 'ALIASIST'

// Starfield
function Stars() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 3 + 2,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.opacity, s.opacity * 0.2, s.opacity] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// Glow wordmark
function GlowWordmark() {
  const [hov, setHov] = useState(false)
  const [idx, setIdx] = useState(-1)
  useEffect(() => {
    if (!hov) { setIdx(-1); return }
    let i = 0
    const t = setInterval(() => { setIdx(i % WORDMARK.length); i++ }, 80)
    return () => clearInterval(t)
  }, [hov])
  return (
    <a href="https://aliasist.com" className="flex items-center gap-2 group"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <svg viewBox="0 0 100 58.4" width={28} style={{ filter: 'drop-shadow(0 0 6px hsl(165,90%,42%))' }}>
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0acb9b"/><stop offset="100%" stopColor="#06b077"/></linearGradient></defs>
        <path d="M 99.922,17.594 C 98.75,11.344 84.634,8.459 65.7,9.774 63.108,5.45 57.739,2.628 51.473,2.26 50.285,0.543 47.711,-0.372 44.973,0.141 42.235,0.654 40.167,2.439 39.681,4.471 33.974,7.084 29.992,11.659 29.142,16.628 11.019,22.262 -1.094,30.063 0.078,36.314 c 1.202,6.408 16.011,9.277 35.668,7.711 1.925,1.294 4.643,2.171 7.826,2.531 -0.885,-0.904 -1.729,-1.926 -2.521,-3.051 0.858,-0.099 1.724,-0.205 2.596,-0.32 0.762,1.323 1.571,2.515 2.413,3.545 2.363,0.065 4.911,-0.131 7.531,-0.622 7.335,-1.375 13.294,-4.696 15.877,-8.406 18.89,-5.66 31.655,-13.701 30.454,-20.108 z" fill="url(#g)"/>
      </svg>
      <span className="font-mono text-sm font-bold tracking-[0.18em] uppercase flex">
        {WORDMARK.split('').map((c, i) => (
          <motion.span key={i}
            animate={{ color: idx === i ? 'hsl(165,90%,65%)' : hov ? 'hsl(165,90%,42%)' : 'hsl(150,10%,94%)',
              textShadow: idx === i ? '0 0 12px hsl(165 90% 42%)' : 'none' }}
            transition={{ duration: 0.12 }} style={{ display: 'inline-block' }}>{c}</motion.span>
        ))}
      </span>
    </a>
  )
}

// Dashboard after login
function Dashboard() {
  const { user } = useUser()
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
        <GlowWordmark />
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
          <UserButton />
        </div>
      </nav>

      {/* Suite grid */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--electric)] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--electric)] animate-pulse" />
            Suite Active
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.
          </h1>
          <p className="font-mono text-sm text-[var(--muted)] mb-12">// Choose your mission</p>

          <div className="grid sm:grid-cols-2 gap-px">
            {SUITE.map((app, i) => (
              <motion.a key={app.name} href={app.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ x: 6 }}
                className="group flex items-center justify-between p-6 bg-[hsl(220,18%,10%)] border border-[var(--border)] hover:border-[var(--electric)]/40 hover:bg-[hsl(165,90%,42%,0.05)] transition-all"
                style={{ background: 'hsl(220, 18%, 10%)' }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{app.icon}</span>
                  <div>
                    <p className="font-bold text-[var(--fg)] group-hover:text-[var(--electric)] transition-colors">{app.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)] mt-0.5">{app.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--electric)]/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--electric)] animate-pulse" /> Live
                  </span>
                  <span className="opacity-20 group-hover:opacity-100 text-[var(--electric)] transition-all font-mono">↗</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

// Login page
function AuthPage({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[var(--border)]">
        <GlowWordmark />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] hidden sm:block">
          Secure Authentication
        </span>
      </nav>

      <div className="flex-1 flex">
        {/* Left — branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex flex-col justify-center px-16 w-1/2 border-r border-[var(--border)]"
        >
          {/* UFO SVG large */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-10"
          >
            <svg viewBox="0 0 100 58.4" width={80} style={{ filter: 'drop-shadow(0 0 20px hsl(165,90%,42%))' }}>
              <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0acb9b"/><stop offset="100%" stopColor="#06b077"/></linearGradient></defs>
              <path d="M 99.922,17.594 C 98.75,11.344 84.634,8.459 65.7,9.774 63.108,5.45 57.739,2.628 51.473,2.26 50.285,0.543 47.711,-0.372 44.973,0.141 42.235,0.654 40.167,2.439 39.681,4.471 33.974,7.084 29.992,11.659 29.142,16.628 11.019,22.262 -1.094,30.063 0.078,36.314 c 1.202,6.408 16.011,9.277 35.668,7.711 1.925,1.294 4.643,2.171 7.826,2.531 -0.885,-0.904 -1.729,-1.926 -2.521,-3.051 0.858,-0.099 1.724,-0.205 2.596,-0.32 0.762,1.323 1.571,2.515 2.413,3.545 2.363,0.065 4.911,-0.131 7.531,-0.622 7.335,-1.375 13.294,-4.696 15.877,-8.406 18.89,-5.66 31.655,-13.701 30.454,-20.108 z" fill="url(#g2)"/>
            </svg>
          </motion.div>

          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--electric)] mb-3">
            // Aliasist Suite
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            One login.<br />
            <span style={{ color: 'hsl(165,90%,42%)' }}>All missions.</span>
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-10 max-w-xs">
            Sign in once to access the full Aliasist suite — DataSist, PulseSist, SpaceSist and everything we ship next.
          </p>

          <div className="flex flex-col gap-2">
            {SUITE.slice(0, 3).map(app => (
              <div key={app.name} className="flex items-center gap-3 font-mono text-xs text-[var(--muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--electric)] animate-pulse" />
                {app.icon} {app.name} — {app.sub}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Clerk form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex-1 flex items-center justify-center px-6 py-12"
        >
          {mode === 'sign-in'
            ? <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
            : <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
          }
        </motion.div>
      </div>
    </div>
  )
}

export default function App() {
  const path = window.location.pathname

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Stars />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Show when="signed-in">
          <Dashboard />
        </Show>
        <Show when="signed-out">
          {path === '/sign-up'
            ? <AuthPage mode="sign-up" />
            : <AuthPage mode="sign-in" />
          }
        </Show>
      </div>
    </div>
  )
}
