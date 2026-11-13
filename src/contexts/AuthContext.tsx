import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoUsers } from '../data/mockData'
import { getSupabaseUserRole, hasSupabaseConfig, supabase } from '../lib/supabase'
import type { Role, UserSession } from '../types'

type AuthContextType = {
  user: UserSession | null
  login: (loginId: string, password: string) => Promise<UserSession>
  logout: () => Promise<void> | void
  isLoading: boolean
}

const STORAGE_KEY = 'campus-compass-user'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const normalizeStoredUser = (payload: Partial<UserSession>): UserSession | null => {
  if (!payload || !payload.id || !payload.name || !payload.email || !payload.role) {
    return null
  }

  return {
    id: payload.id,
    loginId: payload.loginId ?? payload.studentId ?? payload.email,
    name: payload.name,
    email: payload.email,
    role: payload.role as Role,
    studentId: payload.studentId,
    avatar: payload.avatar ?? payload.name.slice(0, 2).toUpperCase(),
    avatarUrl: payload.avatarUrl,
    programme: payload.programme,
    department: payload.department,
    level: payload.level,
    academicYear: payload.academicYear,
    semester: payload.semester,
    status: payload.status ?? 'active',
  }
}

const buildSupabaseUser = (sessionUser: { email?: string | null; user_metadata?: Record<string, unknown> | undefined; id: string }) => {
  const metadata = sessionUser.user_metadata ?? {}
  const role = getSupabaseUserRole(metadata)

  return {
    id: sessionUser.id,
    loginId: (metadata.studentId as string) ?? (metadata.loginId as string) ?? sessionUser.email ?? 'SUPABASE-USER',
    name: (metadata.fullName as string) ?? (metadata.name as string) ?? sessionUser.email ?? 'Campus User',
    email: sessionUser.email ?? 'user@campus.edu',
    role,
    studentId: (metadata.studentId as string) ?? undefined,
    avatar: ((metadata.name as string) ?? sessionUser.email ?? 'CU').slice(0, 2).toUpperCase(),
    avatarUrl: (metadata.avatarUrl as string) ?? undefined,
    programme: (metadata.programme as string) ?? undefined,
    department: (metadata.department as string) ?? undefined,
    level: (metadata.level as string) ?? undefined,
    academicYear: (metadata.academicYear as string) ?? undefined,
    semester: (metadata.semester as string) ?? undefined,
    status: 'active',
  } satisfies UserSession
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY)
    if (savedUser) {
      try {
        const parsedUser = normalizeStoredUser(JSON.parse(savedUser) as Partial<UserSession>)
        if (parsedUser) {
          const demoAccount = demoUsers.find(
            (account) => account.id === parsedUser.id || account.loginId.toLowerCase() === parsedUser.loginId.toLowerCase(),
          )
          const currentUser = demoAccount ? { ...demoAccount } : parsedUser
          delete currentUser.password
          setUser(currentUser)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser))
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    if (!supabase) {
      setIsLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user
      if (sessionUser) {
        const mappedUser = buildSupabaseUser(sessionUser)
        setUser(mappedUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedUser))
      }
      setIsLoading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const mappedUser = buildSupabaseUser(session.user)
        setUser(mappedUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedUser))
      } else {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      }
      setIsLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const login = async (loginId: string, password: string) => {
    const normalizedId = loginId.trim()

    if (hasSupabaseConfig && supabase) {
      const emailCandidate = normalizedId.includes('@')
        ? normalizedId
        : demoUsers.find((item) => item.loginId.toLowerCase() === normalizedId.toLowerCase())?.email ?? `${normalizedId.toLowerCase()}@campus.edu`

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailCandidate,
          password,
        })

        if (error) {
          throw error
        }

        const sessionUser = data.user
        const mappedUser = buildSupabaseUser(sessionUser)
        setUser(mappedUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedUser))
        return mappedUser
      } catch (supabaseError) {
        console.warn('Supabase login failed, falling back to demo auth.', supabaseError)
      }
    }

    const account = demoUsers.find(
      (item) => item.loginId.toLowerCase() === normalizedId.toLowerCase() || item.email.toLowerCase() === normalizedId.toLowerCase(),
    )

    if (!account) {
      throw new Error('No account found for that student ID or staff code.')
    }

    if (account.password !== password) {
      throw new Error('Incorrect password. Please try again.')
    }

    const safeUser = { ...account }
    delete safeUser.password
    setUser(safeUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    return safeUser
  }

  const logout = async () => {
    if (hasSupabaseConfig && supabase) {
      await supabase.auth.signOut()
    }

    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo<AuthContextType>(() => ({ user, login, logout, isLoading }), [user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
