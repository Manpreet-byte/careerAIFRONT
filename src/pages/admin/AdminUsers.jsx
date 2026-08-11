import { ShieldCheck, UserCog } from 'lucide-react'
import { adminUsers } from './adminData'

export default function AdminUsers() {
  return (
    <div>
      <div className="mb-8"><p className="eyebrow">Users</p><h2 className="mt-3 font-serif text-6xl tracking-[-0.04em]">Client access.</h2><p className="mt-5 max-w-2xl leading-7 text-text/62">Manage client accounts, admin access, and role assignments.</p></div>
      <div className="grid gap-5">{adminUsers.map((user) => <div className="grid gap-5 bg-sand p-5 shadow-soft md:grid-cols-[1fr_auto_auto] md:items-center" key={user.id}><div className="flex items-center gap-4"><div className="grid h-14 w-14 place-items-center bg-cream font-serif text-2xl">{user.name[0]}</div><div><p className="font-serif text-3xl">{user.name}</p><p className="text-sm text-text/55">{user.email} · Joined {user.joined}</p></div></div><span className="status-pill justify-self-start">{user.role === 'admin' ? <ShieldCheck size={14} /> : <UserCog size={14} />} {user.role}</span><select className="field max-w-44 bg-cream" defaultValue={user.role}><option>user</option><option>admin</option></select></div>)}</div>
    </div>
  )
}
