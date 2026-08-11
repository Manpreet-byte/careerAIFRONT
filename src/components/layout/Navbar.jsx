import { Link, NavLink } from 'react-router-dom'
import { Menu, Sparkles } from 'lucide-react'

const links = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'AI Tools', href: '/dashboard' },
  { label: 'Pricing', href: '/#pricing' },
]

export default function Navbar({ onMenuToggle }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/80 backdrop-blur-xl">
      <div className="container-wrap page-padding flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 font-semibold text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-soft">
            <Sparkles size={18} />
          </span>
          <span className="text-lg tracking-tight">CareerAI</span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/register" className="btn-primary ml-2">
            Get Started
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link to="/login" className="btn-ghost">
            Login
          </Link>
          <button aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-white" onClick={onMenuToggle}>
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}