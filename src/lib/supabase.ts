import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isValidSupabaseConfig = () => {
  if (!supabaseUrl || !supabaseAnonKey || /your-project|your-anon-key/i.test(`${supabaseUrl} ${supabaseAnonKey}`)) {
    return false
  }

  try {
    const url = new URL(supabaseUrl)
    return (url.protocol === 'https:' || url.protocol === 'http:') && supabaseAnonKey.length > 0
  } catch {
    return false
  }
}

const isConfigured = isValidSupabaseConfig()

export const supabase =
  isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null

export const hasSupabaseConfig = isConfigured

export const getSupabaseUserRole = (metadata: Record<string, unknown> | undefined) => {
  const role = metadata?.role
  if (typeof role === 'string') {
    return role as 'STUDENT' | 'ADMIN' | 'LECTURER' | 'FINANCE_OFFICER' | 'REGISTRAR'
  }

  return 'STUDENT'
}
