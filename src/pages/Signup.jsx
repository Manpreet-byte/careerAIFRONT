import { Eye, EyeOff, Lock, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell from '../components/AuthShell'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState('user')

  return (
    <AuthShell
      eyebrow="Create Account"
      title="Begin your private leather edit."
      text="Create a Bellavue account to save pieces, request care advice, and receive private collection notes."
      footer={<span>Already have an account? <Link className="text-leather underline underline-offset-4" to="/login">Sign in</Link></span>}
    >
      <form className="grid gap-5">
        <label className="auth-field"><UserRound size={18} className="text-leather" /><input placeholder="Full name" /></label>
        <label className="auth-field"><Mail size={18} className="text-leather" /><input type="email" placeholder="Email address" /></label>
        <label className="auth-field"><Lock size={18} className="text-leather" /><input type={showPassword ? 'text' : 'password'} placeholder="Password" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></label>
        <div className="grid grid-cols-2 gap-3">
          {['user', 'admin'].map((role) => <button key={role} type="button" onClick={() => setAccountType(role)} className={`px-4 py-3 text-xs uppercase tracking-[0.18em] transition ${accountType === role ? 'bg-leather text-cream' : 'bg-cream text-mocha hover:bg-beige'}`}>{role}</button>)}
        </div>
        {accountType === 'admin' ? <input className="field" placeholder="Admin invite code" /> : null}
        <label className="flex items-start gap-3 text-sm leading-6 text-text/58"><input type="checkbox" className="mt-1 accent-leather" /> I agree to receive private atelier notes and understand Bellavue will handle my details with care.</label>
        <button className="btn-primary justify-center" type="button">Create Account</button>
        <div className="border-t border-mocha/10 pt-5 text-center text-sm leading-7 text-text/55">Demo-ready UI. Backend connection can be wired to <code>/api/auth/register</code> next.</div>
      </form>
    </AuthShell>
  )
}
