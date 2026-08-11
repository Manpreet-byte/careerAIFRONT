import { motion } from 'framer-motion'
import { BarChart3, Boxes, LogOut, PackageCheck, Shield, UsersRound } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  ['Overview', '/admin', BarChart3],
  ['Products', '/admin/products', Boxes],
  ['Orders', '/admin/orders', PackageCheck],
  ['Users', '/admin/users', UsersRound],
]

export default function AdminLayout() {
  return (
    <main className="min-h-screen bg-cream pt-20">
      <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[290px_1fr]">
        <aside className="border-r border-mocha/10 bg-sand/80 px-5 py-8 lg:min-h-[calc(100vh-5rem)] lg:px-7">
          <div className="mb-10 border-b border-mocha/10 pb-8">
            <p className="eyebrow">Admin Atelier</p>
            <h1 className="mt-3 font-serif text-4xl leading-none">Bellavue control room.</h1>
          </div>
          <nav className="grid gap-2">
            {navItems.map(([label, to, Icon]) => (
              <NavLink key={to} to={to} end={to === '/admin'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-[0.16em] transition ${isActive ? 'bg-leather text-cream' : 'text-text/62 hover:bg-cream hover:text-text'}`}>
                <Icon size={17} /> {label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-10 border-t border-mocha/10 pt-8 text-sm leading-7 text-text/58">
            <div className="mb-4 flex items-center gap-3"><Shield className="text-leather" size={18} /> Admin access only</div>
            <button className="flex items-center gap-3 text-mocha transition hover:text-leather"><LogOut size={17} /> Sign out</button>
          </div>
        </aside>
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="px-5 py-8 sm:px-8 lg:px-12">
          <Outlet />
        </motion.section>
      </div>
    </main>
  )
}
