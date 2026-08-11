export default function MobileMenu({ open, links = [] }) {
  if (!open) return null
  return (
    <div className="border-b border-border bg-white px-4 py-4 lg:hidden">
      <div className="grid gap-2">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="rounded-2xl px-4 py-3 text-sm font-medium text-ink hover:bg-slate-100">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}