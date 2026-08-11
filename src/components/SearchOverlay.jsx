import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return products.slice(0, 4)
    return products.filter((product) =>
      [product.name, product.category, product.color, product.material, product.collection]
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [query])

  const openProduct = (id) => {
    navigate(`/product/${id}`)
    onClose()
    setQuery('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[75] bg-text/35 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto mt-24 max-w-4xl bg-cream p-6 shadow-luxury sm:p-9"
            initial={{ opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Search the atelier</p>
                <h2 className="mt-2 font-serif text-4xl">Find a leather piece</h2>
              </div>
              <button onClick={onClose} aria-label="Close search" className="text-text/60 hover:text-text"><X /></button>
            </div>
            <label className="flex items-center gap-4 border-b border-mocha/15 pb-4">
              <Search className="text-leather" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent font-serif text-3xl outline-none placeholder:text-text/28"
                placeholder="Search totes, cognac, nappa..."
              />
            </label>
            <div className="mt-8 grid gap-4">
              {results.length ? results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => openProduct(product.id)}
                  className="grid grid-cols-[84px_1fr_auto] items-center gap-4 text-left transition hover:bg-sand/70"
                >
                  <img src={product.image} alt={product.name} className="aspect-square object-cover" />
                  <span>
                    <span className="block font-serif text-2xl">{product.name}</span>
                    <span className="mt-1 block text-sm text-text/55">{product.category} · {product.color} · {product.material}</span>
                  </span>
                  <span className="pr-3 font-medium">${product.price.toLocaleString()}</span>
                </button>
              )) : <p className="py-8 text-center text-text/55">No pieces matched that search.</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
