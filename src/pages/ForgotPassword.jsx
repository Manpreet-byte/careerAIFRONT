import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import AuthShell from '../components/layout/AuthShell'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    await new Promise((resolve) => setTimeout(resolve, 900))
    setMessage('If an account exists, we sent a reset link to your email.')
    setLoading(false)
  }

  return (
    <AuthShell title="Reset your password" subtitle="We’ll send a secure password reset link to your inbox." kicker="Account recovery">
      <form className="space-y-5" onSubmit={submit}>
        <div>
          <label className="label">Email</label>
          <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        {message ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>{loading ? <><LoaderCircle className="animate-spin" size={16} /> Sending</> : 'Send reset link'}</Button>
        <p className="text-center text-sm text-slate"><Link to="/login" className="font-medium text-indigo hover:underline">Back to sign in</Link></p>
      </form>
    </AuthShell>
  )
}