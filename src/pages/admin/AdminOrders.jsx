import { PackageCheck } from 'lucide-react'
import { adminOrders } from './adminData'

export default function AdminOrders() {
  return (
    <div>
      <div className="mb-8"><p className="eyebrow">Orders</p><h2 className="mt-3 font-serif text-6xl tracking-[-0.04em]">Order flow.</h2><p className="mt-5 max-w-2xl leading-7 text-text/62">Track luxury bag purchases from payment to delivery.</p></div>
      <div className="grid gap-5">{adminOrders.map((order) => <article className="grid gap-5 bg-sand p-6 shadow-soft lg:grid-cols-[1fr_0.8fr_0.5fr_0.7fr] lg:items-center" key={order.id}><div><p className="text-xs uppercase tracking-[0.2em] text-mocha">{order.id}</p><h3 className="mt-2 font-serif text-3xl">{order.customer}</h3><p className="mt-1 text-text/58">{order.piece}</p></div><p>{order.date}</p><p className="font-serif text-3xl">${order.total.toLocaleString()}</p><div className="flex items-center gap-3"><span className="status-pill"><PackageCheck size={14} /> {order.status}</span><select className="field bg-cream" defaultValue={order.status}><option>Pending</option><option>Paid</option><option>Processing</option><option>Shipped</option><option>Completed</option><option>Cancelled</option></select></div></article>)}</div>
    </div>
  )
}
