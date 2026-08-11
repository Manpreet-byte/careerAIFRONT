import { NavLink } from 'react-router-dom'
import { BriefcaseBusiness, FileSearch, LayoutDashboard, LogOut, Settings, Sparkles, Route, KanbanSquare, MicVocal, Bot } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import useStore from '../../store/useStore'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Resume Analyzer', to: '/resume-analyzer', icon: FileSearch },
  { label: 'Job Discovery', to: '/jobs', icon: BriefcaseBusiness },
  { label: 'Application Tracker', to: '/applications', icon: KanbanSquare },
  { label: 'AI Interview', to: '/interview', icon: MicVocal },
  { label: 'Career Roadmap', to: '/roadmap', icon: Route },
  { label: 'AI Assistant', to: '/assistant', icon: Bot },
  { label: 'Settings', to: '/settings', icon: Settings },
]

export default function Sidebar() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const showToast = useStore((s) => s.showToast)

  return (
    <aside className="hidden w-72 shrink-0 border-r border-border bg-white/90 backdrop-blur-xl xl:flex xl:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-border px-6">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-soft">
          <Sparkles size={18} />
        </span>
        <div>
          <p className="font-semibold text-ink">CareerAI</p>
          <p className="text-xs text-slate">Career intelligence platform</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-5">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
        {user?.role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Admin Dashboard</span>
          </NavLink>
        )}
      </nav>
      <div className="space-y-3 border-t border-border p-4">
        <button className="btn-secondary w-full justify-center">Upgrade Plan</button>
        <div className="flex items-center gap-3 rounded-2xl border border-border p-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-ink">{user?.name?.slice(0, 1) || 'A'}</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{user?.name || 'Avery Patel'}</p>
            <p className="truncate text-xs text-slate">Product Designer</p>
          </div>
          <button
            aria-label="Sign out"
            onClick={() => {
              signOut()
              showToast('Signed out successfully.')
              navigate('/login')
            }}
            className="rounded-xl p-2 text-slate transition hover:bg-slate-100 hover:text-ink"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}