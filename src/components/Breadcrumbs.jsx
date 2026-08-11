import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return <div className="mb-8 flex flex-wrap gap-2 text-sm text-text/50"><Link to="/">Home</Link>{items.map((item) => <span key={item.label} className="flex gap-2"><span>/</span>{item.to ? <Link to={item.to}>{item.label}</Link> : <span className="text-text">{item.label}</span>}</span>)}</div>
}
