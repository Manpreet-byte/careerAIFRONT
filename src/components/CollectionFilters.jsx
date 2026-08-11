import { SlidersHorizontal } from 'lucide-react'
import { categories, colors, materials } from '../data/products'

export default function CollectionFilters({ filters, setFilters }) {
  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }))
  const reset = () => setFilters({ category:'All', material:'All', color:'All', maxPrice:1800, sort:'Editorial' })
  return (
    <aside className="border border-mocha/10 bg-cream p-6 lg:sticky lg:top-28 lg:self-start">
      <div className="mb-7 flex items-center justify-between"><h2 className="font-serif text-2xl">Filters</h2><SlidersHorizontal size={18} /></div>
      <button onClick={reset} className="mb-7 text-xs uppercase tracking-[0.22em] text-text/45 transition hover:text-leather">Reset selection</button>
      {[['category', categories], ['material', materials], ['color', colors]].map(([key, values]) => (
        <div className="mb-7" key={key}><p className="mb-3 text-xs uppercase tracking-[0.22em] text-mocha">{key}</p><div className="grid gap-2">{values.map((value) => <button key={value} onClick={() => update(key, value)} className={`text-left text-sm transition ${filters[key] === value ? 'text-leather' : 'text-text/65 hover:text-text'}`}>{value}</button>)}</div></div>
      ))}
      <label className="text-xs uppercase tracking-[0.22em] text-mocha">Price under ${filters.maxPrice}</label>
      <input className="mt-4 w-full accent-leather" type="range" min="700" max="1800" step="50" value={filters.maxPrice} onChange={(event) => update('maxPrice', Number(event.target.value))} />
    </aside>
  )
}
