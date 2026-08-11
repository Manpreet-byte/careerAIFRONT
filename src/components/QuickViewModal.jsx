import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, ShoppingBag, X } from 'lucide-react'

export default function QuickViewModal({ product, onClose, onAddToCart, onWishlist }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-[80] bg-text/35 p-4 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="mx-auto mt-20 grid max-w-5xl overflow-hidden bg-cream shadow-luxury lg:grid-cols-[1.05fr_0.95fr]"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[420px] overflow-hidden bg-sand">
              <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} src={product.image} alt={product.name} className="h-full w-full object-cover" />
              <span className="absolute left-5 top-5 bg-cream px-4 py-2 text-xs uppercase tracking-[0.2em] text-mocha">{product.badge}</span>
            </div>
            <div className="relative p-8 sm:p-10">
              <button className="absolute right-5 top-5 text-text/55 hover:text-text" onClick={onClose} aria-label="Close quick view"><X /></button>
              <p className="eyebrow">Quick View</p>
              <h2 className="mt-5 font-serif text-5xl leading-none tracking-[-0.04em]">{product.name}</h2>
              <p className="mt-4 text-xl">${product.price.toLocaleString()}</p>
              <p className="mt-6 leading-8 text-text/65">{product.story}</p>
              <div className="mt-7 grid gap-3 text-sm text-text/65">
                <span>{product.material}</span>
                <span>{product.dimensions}</span>
                <span>{product.stock} pieces available in this batch</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="btn-primary" onClick={() => onAddToCart(product)}><ShoppingBag size={17} /> Add</button>
                <button className="btn-secondary" onClick={() => onWishlist(product)}><Heart size={17} /> Save</button>
                <Link className="btn-secondary" to={`/product/${product.id}`} onClick={onClose}>Details <ArrowRight size={17} /></Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
