import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { stagger } from '../utils/motion'

export default function ProductGrid({ products, onQuickView, onAddToCart, onWishlist }) {
  return <motion.div variants={stagger} initial="hidden" animate="visible" className="grid gap-x-7 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} onQuickView={onQuickView} onAddToCart={onAddToCart} onWishlist={onWishlist} />)}</motion.div>
}
