import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Heart, ShoppingBag } from 'lucide-react'

export default function ProductCard({ product, onQuickView, onAddToCart, onWishlist }) {
  const navigate = useNavigate()
  const openProduct = () => navigate(`/product/${product.id}`)
  const runAction = (event, action) => {
    event.stopPropagation()
    action?.(product)
  }

  return (
    <motion.article
      layout
      role="button"
      tabIndex={0}
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -6 }}
      onClick={openProduct}
      onKeyDown={(event) => event.key === 'Enter' && openProduct()}
      className="group cursor-pointer outline-none"
    >
      <div className="relative block overflow-hidden bg-sand">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-0" />
          <img src={product.hoverImage} alt="" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 bg-cream px-4 py-2 text-xs uppercase tracking-[0.18em] text-mocha">{product.badge}</span>
          <span className="absolute bottom-4 left-4 translate-y-3 bg-text/72 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cream opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">View details</span>
        </div>
        <div className="absolute bottom-4 right-4 flex translate-y-3 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="bg-cream/94 p-3 text-mocha shadow-soft" onClick={(event) => runAction(event, onQuickView)} aria-label={`Quick view ${product.name}`}><Eye size={17} /></button>
          <button className="bg-cream/94 p-3 text-mocha shadow-soft" onClick={(event) => runAction(event, onAddToCart)} aria-label={`Add ${product.name} to cart`}><ShoppingBag size={17} /></button>
          <button className="bg-cream/94 p-3 text-mocha shadow-soft" onClick={(event) => runAction(event, onWishlist)} aria-label={`Save ${product.name}`}><Heart size={17} /></button>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div><p className="text-xs uppercase tracking-[0.22em] text-mocha/70">{product.category}</p><h3 className="mt-2 font-serif text-2xl transition group-hover:text-leather">{product.name}</h3><p className="mt-1 text-sm text-text/60">{product.material}</p><p className="mt-3 text-xs uppercase tracking-[0.18em] text-leather">{product.stock} in atelier batch</p></div>
        <p className="font-medium">${product.price.toLocaleString()}</p>
      </div>
    </motion.article>
  )
}
