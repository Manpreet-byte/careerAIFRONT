import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  ['Collection', '/collection'], ['About', '/about'], ['Journal', '/journal'], ['Contact', '/contact'], ['Admin', '/admin'],
]

export default function Navbar({ onCart, onWishlist, onSearch, cartCount = 0, wishlistCount = 0 }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-mocha/10 bg-cream/88 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link to="/" className="font-serif text-2xl tracking-[0.18em] text-text">BELLAVUE</Link>
        <nav className="hidden items-center gap-9 lg:flex">
          {links.map(([label, path]) => <NavLink key={path} to={path} className={({ isActive }) => `text-sm uppercase tracking-[0.22em] transition ${isActive ? 'text-leather' : 'text-text/70 hover:text-leather'}`}>{label}</NavLink>)}
          <div className="group relative py-8">
            <span className="text-sm uppercase tracking-[0.22em] text-text/70 group-hover:text-leather">Atelier</span>
            <div className="invisible absolute right-0 top-full w-[680px] translate-y-3 border border-mocha/10 bg-cream p-8 opacity-0 shadow-luxury transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-[1fr_1.2fr] gap-8">
                <div><p className="eyebrow">Mega Menu</p><h3 className="mt-3 font-serif text-3xl">Leather chosen slowly. Pieces made to endure.</h3><Link className="mt-6 inline-block underline underline-offset-8" to="/about">Discover craftsmanship</Link></div>
                <img className="h-56 w-full object-cover" src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85" alt="Luxury cognac leather tote bag" />
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-4 text-text/75">
          <button className="hidden sm:block" aria-label="Open search" onClick={onSearch}><Search size={19} /></button>
          <Link className="hidden sm:block" to="/login" aria-label="Client login"><UserRound size={20} /></Link>
          <button className="relative" aria-label="Open wishlist" onClick={onWishlist}><Heart size={20} />{wishlistCount ? <span className="nav-count">{wishlistCount}</span> : null}</button>
          <button className="relative" aria-label="Open cart" onClick={onCart}><ShoppingBag size={20} />{cartCount ? <span className="nav-count">{cartCount}</span> : null}</button>
          <button className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </div>
      {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-text/25 lg:hidden" onClick={() => setOpen(false)}>
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} className="ml-auto h-screen w-80 bg-cream p-7" onClick={(e) => e.stopPropagation()}>
          <button className="mb-10 ml-auto block" onClick={() => setOpen(false)}><X /></button>
          <div className="grid gap-6">{links.map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)} className="font-serif text-3xl">{label}</Link>)}<Link to="/login" onClick={() => setOpen(false)} className="font-serif text-3xl">Client Login</Link><Link to="/signup" onClick={() => setOpen(false)} className="btn-primary mt-4 justify-center">Create Account</Link></div>
        </motion.div>
      </motion.div>}
    </header>
  )
}
