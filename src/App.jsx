import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import GlobalToasts from './components/GlobalToasts'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import AdminRoute from './routes/AdminRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import JobDiscovery from './pages/JobDiscovery'
import ApplicationTracker from './pages/ApplicationTracker'
import Interview from './pages/Interview'
import Roadmap from './pages/Roadmap'
import Assistant from './pages/Assistant'
import Settings from './pages/Settings'
import Admin from './pages/Admin'
import Sidebar from './components/layout/Sidebar'
import MobileMenu from './components/layout/MobileMenu'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from './context/AuthContext'

function PublicLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Resume Analyzer', href: '/resume-analyzer' },
    { label: 'Job Discovery', href: '/jobs' },
    { label: 'Application Tracker', href: '/applications' },
    { label: 'AI Interview', href: '/interview' },
    { label: 'Career Roadmap', href: '/roadmap' },
    { label: 'AI Assistant', href: '/assistant' },
    { label: 'Settings', href: '/settings' },
  ]

  if (user?.role === 'admin') {
    links.push({ label: 'Admin Dashboard', href: '/admin' })
  }

  return (
    <div className="app-shell flex min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.07),transparent_25%),#F8FAFC]">
      <Sidebar />
      <div className="min-w-0 flex-1 flex flex-col h-screen">
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-white/90 px-4 py-4 backdrop-blur-xl xl:hidden">
          <div>
            <p className="text-sm font-semibold text-ink">CareerAI</p>
            <p className="text-xs text-slate">Career intelligence platform</p>
          </div>
          <button aria-label="Toggle navigation" onClick={() => setMobileMenuOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-white text-ink">
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <MobileMenu
          open={mobileMenuOpen}
          links={links}
        />
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <GlobalToasts />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
        <Route path="/resume-analyzer" element={<ProtectedRoute><DashboardLayout><ResumeAnalyzer /></DashboardLayout></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><DashboardLayout><JobDiscovery /></DashboardLayout></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><DashboardLayout><ApplicationTracker /></DashboardLayout></ProtectedRoute>} />
        <Route path="/interview" element={<ProtectedRoute><DashboardLayout><Interview /></DashboardLayout></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><DashboardLayout><Roadmap /></DashboardLayout></ProtectedRoute>} />
        <Route path="/assistant" element={<ProtectedRoute><DashboardLayout><Assistant /></DashboardLayout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><DashboardLayout><Admin /></DashboardLayout></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
