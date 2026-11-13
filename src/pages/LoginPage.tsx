import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, UserCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { demoInstitution, demoUsers } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { hasSupabaseConfig, supabase } from '../lib/supabase'

const demoCredentials = [
  { label: 'Student', value: 'MCU-2024-1187', password: 'password123' },
  { label: 'Admin', value: 'ADM-001', password: 'admin123' },
  { label: 'Lecturer', value: 'LEC-001', password: 'lecturer123' },
  { label: 'Finance', value: 'FIN-001', password: 'finance123' },
  { label: 'Registrar', value: 'REG-001', password: 'registrar123' },
]

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loginId, setLoginId] = useState('MCU-2024-1187')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) {
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard'
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      await login(loginId, password)
      navigate('/dashboard', { replace: true })
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordReset = async () => {
    const emailToReset = loginId.includes('@')
      ? loginId
      : demoUsers.find((user) => user.loginId.toLowerCase() === loginId.trim().toLowerCase())?.email ?? ''

    if (!hasSupabaseConfig || !supabase) {
      setError('Supabase is not configured yet. Add your project URL and anon key to enable password reset.')
      setSuccessMessage('')
      return
    }

    if (!emailToReset) {
      setError('Enter your university email or select a preset account before requesting a password reset.')
      setSuccessMessage('')
      return
    }

    setError('')
    setSuccessMessage('')

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(emailToReset)
    if (resetError) {
      setError(resetError.message)
      return
    }

    setSuccessMessage('Password reset instructions have been sent to your email.')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#f0fdfa_0%,#e2e8f0_40%,#f8fafc_100%)] px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.08)] lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-slate-900 p-8 text-white sm:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500 font-bold text-slate-950">
              CC
            </div>
            <div>
              <div className="text-xl font-semibold">Campus Compass</div>
              <div className="text-sm text-slate-300">University in your pocket</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-teal-300">Unified student portal</p>
              <h1 className="text-4xl font-bold leading-tight">Everything your campus life needs.</h1>
              <p className="mt-3 text-sm text-slate-300">{demoInstitution.name} · {demoInstitution.location}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Academic records',
                'Financial aid',
                'Attendance tracking',
                'Course registration',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-700 bg-slate-800/80 p-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-5">
              <p className="mb-3 text-sm font-medium text-slate-200">Demo accounts</p>
              <div className="space-y-3">
                {demoCredentials.map((credential) => (
                  <button
                    key={credential.value}
                    type="button"
                    onClick={() => {
                      setLoginId(credential.value)
                      setPassword(credential.password)
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-left text-sm text-slate-200 transition hover:border-teal-400"
                  >
                    <span>
                      <span className="font-medium text-white">{credential.label}</span>
                      <span className="mt-1 block text-xs text-slate-300">Password: {credential.password}</span>
                    </span>
                    <ArrowRight size={16} className="text-teal-300" />
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs leading-5 text-slate-400">{demoInstitution.demoNotice}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-md">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <UserCircle2 size={24} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Secure access</div>
                <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Student ID / Staff code</span>
                <div className="relative">
                  <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    value={loginId}
                    onChange={(event) => setLoginId(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                    placeholder="Enter ID or staff code"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              {error ? (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Signing in...' : 'Continue to portal'}
              </button>

              <div className="text-center text-sm text-slate-500">
                Need help? <button type="button" onClick={handlePasswordReset} className="font-medium text-teal-700 hover:underline">Reset password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
