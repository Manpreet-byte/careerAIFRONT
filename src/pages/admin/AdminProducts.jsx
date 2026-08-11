import { Edit3, Plus, Trash2 } from 'lucide-react'
import { adminProducts } from './adminData'

export default function AdminProducts() {
  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Products</p><h2 className="mt-3 font-serif text-6xl tracking-[-0.04em]">Leather inventory.</h2></div><button className="btn-primary"><Plus size={17} /> Add product</button></div>
      <div className="overflow-hidden bg-sand shadow-soft"><div className="grid grid-cols-[1.4fr_0.8fr_0.6fr_0.6fr_0.7fr] gap-4 border-b border-mocha/10 px-6 py-4 text-xs uppercase tracking-[0.18em] text-mocha max-lg:hidden"><span>Piece</span><span>Category</span><span>Stock</span><span>Price</span><span>Actions</span></div>{adminProducts.map((product) => <div className="grid gap-4 border-b border-mocha/10 bg-cream px-6 py-5 lg:grid-cols-[1.4fr_0.8fr_0.6fr_0.6fr_0.7fr] lg:items-center" key={product.id}><div className="flex items-center gap-4"><img src={product.image} alt={product.name} className="h-20 w-20 object-cover" /><div><p className="font-serif text-2xl">{product.name}</p><p className="mt-1 text-sm text-text/55">{product.status} · {product.sold} sold</p></div></div><p>{product.category}</p><p className="font-serif text-3xl">{product.stock}</p><p>${product.price.toLocaleString()}</p><div className="flex gap-2"><button className="admin-icon"><Edit3 size={16} /></button><button className="admin-icon"><Trash2 size={16} /></button></div></div>)}</div>
    </div>
  )
}
