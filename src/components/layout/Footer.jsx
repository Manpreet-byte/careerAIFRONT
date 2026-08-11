import { Link } from 'react-router-dom'

const links = ['Product', 'Features', 'Pricing', 'About', 'Privacy', 'Terms', 'GitHub', 'LinkedIn']

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white/80 py-10 backdrop-blur-xl">
      <div className="container-wrap page-padding flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-semibold text-ink">CareerAI</div>
          <p className="mt-1 text-sm text-slate">AI-powered career intelligence.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate">
          {links.map((item) => (
            <Link key={item} to="/" className="transition hover:text-ink">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}