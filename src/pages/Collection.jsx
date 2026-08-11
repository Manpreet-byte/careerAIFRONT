import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import CollectionFilters from '../components/CollectionFilters'
import ProductGrid from '../components/ProductGrid'
import Breadcrumbs from '../components/Breadcrumbs'
import Reveal from '../components/Reveal'
import { categories, products } from '../data/products'
import { fadeUp, pageTransition, stagger } from '../utils/motion'

const filterLabels = {
  category: 'Category',
  material: 'Material',
  color: 'Color',
}

export default function Collection({ onQuickView, onAddToCart, onWishlist }) {
  const [filters, setFilters] = useState({ category:'All', material:'All', color:'All', maxPrice:1800, sort:'Editorial' })
  const visible = useMemo(() => {
    const filtered = products.filter((product) => (filters.category === 'All' || product.category === filters.category) && (filters.material === 'All' || product.material === filters.material) && (filters.color === 'All' || product.color === filters.color) && product.price <= filters.maxPrice)
    return [...filtered].sort((a, b) => {
      if (filters.sort === 'Price Low') return a.price - b.price
      if (filters.sort === 'Price High') return b.price - a.price
      if (filters.sort === 'Low Stock') return a.stock - b.stock
      return products.indexOf(a) - products.indexOf(b)
    })
  }, [filters])
  const activeFilters = Object.entries(filters).filter(([key, value]) => filterLabels[key] && value !== 'All')

  return (
    <motion.main {...pageTransition} className="bg-cream pb-24 pt-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label:'Collection' }]} />
        <motion.section variants={stagger} initial="hidden" animate="visible" className="mb-16 grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div><motion.p variants={fadeUp} className="eyebrow">Collection</motion.p><motion.h1 variants={fadeUp} className="mt-5 font-serif text-6xl leading-[0.92] tracking-[-0.055em] sm:text-8xl">The leather bag edit.</motion.h1><motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-text/64">Filter by silhouette, material, tone, and price to compose your own quiet leather wardrobe.</motion.p></div>
          <motion.div variants={fadeUp} className="grid grid-cols-[0.75fr_1fr] gap-5"><img className="mt-14 aspect-[3/4] w-full object-cover shadow-soft" src={products[1].image} alt="Caramel leather crossbody collection" /><img className="aspect-[4/5] w-full object-cover shadow-luxury" src={products[0].hoverImage} alt="Cognac leather tote collection" /></motion.div>
        </motion.section>

        <Reveal className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => <button key={category} onClick={() => setFilters((current) => ({ ...current, category }))} className={`px-5 py-3 text-xs uppercase tracking-[0.18em] transition ${filters.category === category ? 'bg-leather text-cream' : 'bg-sand text-mocha hover:bg-beige'}`}>{category}</button>)}
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[310px_1fr]">
          <CollectionFilters filters={filters} setFilters={setFilters} />
          <section>
            <div className="mb-8 flex flex-col justify-between gap-4 border-y border-mocha/10 py-5 sm:flex-row sm:items-center">
              <div><p className="text-sm uppercase tracking-[0.2em] text-text/50">{visible.length} pieces curated</p>{activeFilters.length ? <div className="mt-3 flex flex-wrap gap-2">{activeFilters.map(([key, value]) => <button key={key} onClick={() => setFilters((current) => ({ ...current, [key]: 'All' }))} className="bg-sand px-3 py-2 text-xs uppercase tracking-[0.16em] text-mocha">{filterLabels[key]}: {value} ×</button>)}</div> : null}</div>
              <select className="field max-w-xs" value={filters.sort} onChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value }))}><option>Editorial</option><option>Price Low</option><option>Price High</option><option>Low Stock</option></select>
            </div>
            {visible.length ? <ProductGrid products={visible} onQuickView={onQuickView} onAddToCart={onAddToCart} onWishlist={onWishlist} /> : <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="bg-sand p-12 text-center"><p className="eyebrow">No match</p><h2 className="mt-4 font-serif text-4xl">No bag fits this exact edit.</h2><p className="mt-4 text-text/62">Try widening the material, color, or price selection.</p></motion.div>}
          </section>
        </div>
      </div>
    </motion.main>
  )
}
