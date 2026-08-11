import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductCarousel({ products, onQuickView, onAddToCart, onWishlist }) {
  const scroller = useRef(null)
  const [position, setPosition] = useState(0)

  const updatePosition = () => {
    const element = scroller.current
    if (!element) return
    const maxScroll = element.scrollWidth - element.clientWidth
    setPosition(maxScroll ? element.scrollLeft / maxScroll : 0)
  }

  const move = (direction) => {
    const element = scroller.current
    if (!element) return
    element.scrollBy({ left: direction * Math.min(430, element.clientWidth * 0.82), behavior: 'smooth' })
    window.setTimeout(updatePosition, 420)
  }

  return (
    <div className="relative">
      <div className="mb-7 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {products.map((product, index) => (
            <span
              key={product.id}
              className={`h-1.5 rounded-full transition-all ${index / Math.max(products.length - 1, 1) <= position + 0.08 ? 'w-8 bg-leather' : 'w-1.5 bg-mocha/25'}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => move(-1)} className="carousel-control" aria-label="Previous products"><ChevronLeft size={18} /></motion.button>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => move(1)} className="carousel-control" aria-label="Next products"><ChevronRight size={18} /></motion.button>
        </div>
      </div>
      <div
        ref={scroller}
        onScroll={updatePosition}
        className="scrollbar-invisible flex snap-x gap-7 overflow-x-auto scroll-smooth pb-2"
      >
        {products.map((product) => (
          <div className="min-w-[290px] snap-start md:min-w-[380px]" key={product.id}>
            <ProductCard product={product} onQuickView={onQuickView} onAddToCart={onAddToCart} onWishlist={onWishlist} />
          </div>
        ))}
      </div>
    </div>
  )
}
