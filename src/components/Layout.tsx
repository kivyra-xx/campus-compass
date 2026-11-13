import {
  Activity,
  ArrowRightLeft,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  ShieldCheck,
  UserCircle2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { demoInstitution, rolePermissions } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import type { Role } from '../types'

const mobilePrimaryPathsByRole: Record<Role, string[]> = {
  STUDENT: ['/dashboard', '/courses', '/timetable', '/fees'],
  ADMIN: ['/dashboard', '/courses', '/results', '/fees'],
  LECTURER: ['/dashboard', '/courses', '/attendance', '/results'],
  FINANCE_OFFICER: ['/dashboard', '/fees', '/payments', '/documents'],
  REGISTRAR: ['/dashboard', '/courses', '/registration', '/results'],
}

const navConfig = {
  STUDENT: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/profile', icon: UserCircle2 },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Registration', path: '/registration', icon: ClipboardCheck },
    { label: 'Results', path: '/results', icon: Activity },
    { label: 'Fees', path: '/fees', icon: CreditCard },
    { label: 'Timetable', path: '/timetable', icon: CalendarDays },
    { label: 'Attendance', path: '/attendance', icon: ShieldCheck },
    { label: 'Announcements', path: '/announcements', icon: BriefcaseBusiness },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Documents', path: '/documents', icon: FileText },
  ],
  ADMIN: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/profile', icon: UserCircle2 },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Results', path: '/results', icon: Activity },
    { label: 'Fees', path: '/fees', icon: CreditCard },
    { label: 'Payments', path: '/payments', icon: ArrowRightLeft },
    { label: 'Announcements', path: '/announcements', icon: BriefcaseBusiness },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Documents', path: '/documents', icon: FileText },
  ],
  LECTURER: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/profile', icon: UserCircle2 },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Results', path: '/results', icon: Activity },
    { label: 'Attendance', path: '/attendance', icon: ShieldCheck },
    { label: 'Announcements', path: '/announcements', icon: BriefcaseBusiness },
  ],
  FINANCE_OFFICER: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/profile', icon: UserCircle2 },
    { label: 'Fees', path: '/fees', icon: CreditCard },
    { label: 'Payments', path: '/payments', icon: ArrowRightLeft },
    { label: 'Documents', path: '/documents', icon: FileText },
    { label: 'Notifications', path: '/notifications', icon: Bell },
  ],
  REGISTRAR: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/profile', icon: UserCircle2 },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Registration', path: '/registration', icon: ClipboardCheck },
    { label: 'Results', path: '/results', icon: Activity },
    { label: 'Announcements', path: '/announcements', icon: BriefcaseBusiness },
    { label: 'Documents', path: '/documents', icon: FileText },
  ],
} as const

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  useEffect(() => {
    if (!user || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
    )
    const main = document.querySelector('main')
    if (!main) {
      observer.disconnect()
      return
    }

    const observeCards = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches('.rounded-3xl, .rounded-2xl')) {
        root.classList.add('scroll-reveal')
        observer.observe(root)
      }

      root.querySelectorAll<HTMLElement>('.rounded-3xl, .rounded-2xl').forEach((card) => {
        card.classList.add('scroll-reveal')
        observer.observe(card)
      })
    }

    observeCards(main)

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeCards(node)
          }
        })
      })
    })
    mutationObserver.observe(main, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [location.pathname, user])

  if (!user) {
    return null
  }

  const baseLinks = navConfig[user.role] ?? navConfig.STUDENT
  const allowedPermissions = new Set<string>(rolePermissions[user.role])
  const visibleLinks = baseLinks.filter((item) => allowedPermissions.has(item.path.replace(/^\//, '')))
  const activePage = visibleLinks.find((item) => item.path === location.pathname)
  const notificationsLink = visibleLinks.find((item) => item.path === '/notifications')
  const mobilePrimaryLinks = mobilePrimaryPathsByRole[user.role]
    .map((path) => visibleLinks.find((item) => item.path === path))
    .filter((item): item is (typeof visibleLinks)[number] => Boolean(item))
  const mobileMoreLinks = visibleLinks.filter((item) => !mobilePrimaryLinks.some((primary) => primary.path === item.path))

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-[1720px]">
        <aside className="hidden w-[264px] flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
          <div className="mb-9 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 font-bold text-teal-300 shadow-sm">
              MCU
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">Campus Compass</div>
              <div className="text-xs text-slate-500">{demoInstitution.shortName} · Demo</div>
            </div>
          </div>

          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Student workspace</div>
          <nav className="space-y-1">
            {visibleLinks.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${
                    isActive ? 'bg-teal-50 text-teal-800 ring-1 ring-teal-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon size={17} className={path === location.pathname ? 'text-teal-700' : 'text-slate-400'} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto mb-4 rounded-2xl bg-slate-50 p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Current session</div>
            <div className="mt-2 text-sm font-semibold text-slate-800">{demoInstitution.academicYear}</div>
            <div className="text-xs text-slate-500">{demoInstitution.semester}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-teal-100 font-semibold text-teal-800">
                {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" /> : user.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-500">{user.role.replace('_', ' ')}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-9">
            <div className="flex min-h-12 items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">{demoInstitution.shortName} · {demoInstitution.academicYear}</p>
                <h1 className="text-lg font-bold text-slate-900 sm:text-xl">{activePage?.label ?? 'Campus Compass'}</h1>
              </div>

              <div className="flex items-center gap-3">
                {notificationsLink ? (
                  <Link
                    to={notificationsLink.path}
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                    aria-label="Notifications"
                  >
                    <Bell size={18} className="notification-bell" />
                    <span className="notification-dot absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                  </Link>
                ) : null}
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                  {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" /> : user.avatar}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-slate-800">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.role.replace('_', ' ')}</div>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 p-4 pb-24 sm:p-6 sm:pb-24 lg:p-9">{children}</main>

          <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-lg items-stretch justify-around">
              {mobilePrimaryLinks.map(({ label, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsMoreOpen(false)}
                  className={({ isActive }) =>
                    `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition ${
                      isActive ? 'text-teal-700' : 'text-slate-500 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={19} strokeWidth={isActive ? 2.4 : 1.8} />
                      <span className="max-w-full truncate">{label}</span>
                    </>
                  )}
                </NavLink>
              ))}

              {mobileMoreLinks.length > 0 ? (
                <div className="relative flex min-w-0 flex-1 justify-center">
                  {isMoreOpen ? (
                    <div id="mobile-more-menu" className="absolute bottom-full right-0 mb-3 max-h-[60vh] w-60 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">More services</div>
                      {mobileMoreLinks.map(({ label, path, icon: Icon }) => (
                        <NavLink
                          key={path}
                          to={path}
                          onClick={() => setIsMoreOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                              isActive ? 'bg-teal-50 text-teal-800' : 'text-slate-600 hover:bg-slate-50'
                            }`
                          }
                        >
                          <Icon size={17} />
                          {label}
                        </NavLink>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setIsMoreOpen(false)
                          void logout()
                        }}
                        className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-500 hover:bg-slate-50"
                      >
                        <LogOut size={17} />
                        Sign out
                      </button>
                    </div>
                  ) : null}
                  <button
                    type="button"
                    aria-expanded={isMoreOpen}
                    aria-controls="mobile-more-menu"
                    onClick={() => setIsMoreOpen((open) => !open)}
                    className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-semibold ${
                      isMoreOpen || mobileMoreLinks.some((item) => item.path === location.pathname) ? 'text-teal-700' : 'text-slate-500'
                    }`}
                  >
                    <MoreHorizontal size={19} />
                    <span>More</span>
                  </button>
                </div>
              ) : null}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
