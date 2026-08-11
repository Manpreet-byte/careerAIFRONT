import { Bell, Search } from 'lucide-react'
import Input from '../ui/Input'

export default function DashboardHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-5 border-b border-border bg-white/70 px-4 py-5 backdrop-blur-xl sm:px-6 lg:flex-row lg:items-center lg:justify-between xl:px-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-slate">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-full min-w-0 sm:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate" size={16} />
          <Input placeholder="Search" className="pl-10" />
        </div>
        <button className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-border bg-white text-slate">
          <Bell size={16} />
        </button>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">AP</div>
      </div>
    </div>
  )
}