import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import AuthShell from '../components/layout/AuthShell'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import useStore from '../store/useStore'
import { signIn, googleSignIn } from '../services/authService'
import { GoogleLogin } from '@react-oauth/google'

export default function Login() {
  const navigate = useNavigate()
  const { signIn: loginUser } = useAuth()
  const showToast = useStore((s) => s.showToast)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({ email: 'avery@careerai.com', password: 'password123' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      setLoading(false)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      setLoading(false)
      return
    }
    try {
      const response = await signIn(form)
      loginUser(response.user, response.accessToken)
      showToast('Sign in successful.')
      setSuccess('Sign in successful. Redirecting to your dashboard...')
      setTimeout(() => navigate('/dashboard'), 700)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credential) => {
    try {
      setLoading(true)
      setError('')
      const response = await googleSignIn(credential)
      loginUser(response.user, response.accessToken)
      showToast('Google sign in successful.')
      setSuccess('Sign in successful. Redirecting to your dashboard...')
      setTimeout(() => navigate('/dashboard'), 700)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to sign in with Google.')
    } finally {
      setLoading(false)
    }
  }

  const handleMockGoogleLogin = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await googleSignIn('mock_token_123')
      loginUser(response.user, response.accessToken)
      showToast('Google sign in successful.')
      setSuccess('Sign in successful. Redirecting to your dashboard...')
      setTimeout(() => navigate('/dashboard'), 700)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to sign in with Google.')
    } finally {
      setLoading(false)
    }
  }

  const isMockGoogle = !import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.VITE_GOOGLE_CLIENT_ID === 'mock_google_client_id'

  return (
    <AuthShell
      kicker="Welcome back"
      title="Sign in to CareerAI"
      subtitle="Access your resume analysis, job matches, interview practice, and roadmap in one place."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="label">Email</label>
          <Input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} type="email" autoComplete="email" />
        </div>
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <Input value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} type={showPassword ? 'text' : 'password'} autoComplete="current-password" />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-slate">
          <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-border" /> Remember me</label>
          <Link to="/forgot-password" className="font-medium text-indigo hover:underline">Forgot password?</Link>
        </div>
        {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        {success ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>{loading ? <><LoaderCircle className="animate-spin" size={16} /> Signing in</> : 'Sign In'}</Button>
        
        {isMockGoogle ? (
          <Button type="button" variant="secondary" className="w-full" onClick={handleMockGoogleLogin} disabled={loading}>
            Continue with Google
          </Button>
        ) : (
          <div className="flex justify-center w-full [&>div]:w-full">
            <GoogleLogin
              onSuccess={(credentialResponse) => handleGoogleSuccess(credentialResponse.credential)}
              onError={() => setError('Google Login Failed')}
            />
          </div>
        )}

        <p className="text-center text-sm text-slate">No account? <Link to="/register" className="font-medium text-indigo hover:underline">Create one</Link></p>
      </form>
    </AuthShell>
  )
}
