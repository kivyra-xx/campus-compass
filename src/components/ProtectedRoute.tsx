import { Navigate, useLocation } from 'react-router-dom'
import type { Role } from '../types'
import { useAuth } from '../contexts/AuthContext'

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles?: Role[]
}) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-700">Loading your campus portal...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />
  }

  return <>{children}</>
}
