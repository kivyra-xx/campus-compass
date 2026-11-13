import { ArrowUpRight, BookOpenText, BriefcaseBusiness, CalendarClock, CircleDollarSign, UserCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { attendanceRecord } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { loadStudentData, type StudentDataBundle } from '../lib/studentData'
import type { UserSession } from '../types'
import { StakeholderDashboard } from './StakeholderDashboard'

export function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-sm">Loading dashboard...</div>
  }

  if (user.role !== 'STUDENT') {
    return <StakeholderDashboard user={user} />
  }

  return <StudentDashboard user={user} />
}

function StudentDashboard({ user }: { user: UserSession }) {
  const [data, setData] = useState<StudentDataBundle | null>(null)

  useEffect(() => {
    let isMounted = true

    loadStudentData(user).then((studentData) => {
      if (isMounted) {
        setData(studentData)
      }
    })

    return () => {
      isMounted = false
    }
  }, [user])

  if (!data) {
    return <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-sm">Loading dashboard...</div>
  }

  const { profile, courses, announcements, registration } = data
  const outstandingBalance = data.fees.reduce(
    (sum, fee) => sum + (fee.status === 'Outstanding' || fee.status === 'Pending' ? fee.amount : 0),
    0,
  )
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const today = new Intl.DateTimeFormat('en-GH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-700 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white/15 text-2xl font-bold text-white ring-4 ring-white/20">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={`${profile.fullName} profile`} className="h-full w-full object-cover" />
              ) : (
                profile.picture ?? user?.avatar ?? 'ST'
              )}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-teal-200">Student overview</p>
              <h2 className="mt-1 text-3xl font-bold">
                {greeting}, {user?.name.split(' ')[0] ?? 'Student'}{' '}
                <span className="wave-hand" role="img" aria-label="waving hand">👋</span>
              </h2>
              <p className="mt-1 text-sm text-slate-300">{today}</p>
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 sm:grid-cols-2 lg:min-w-[360px]">
            <div>
              <div className="text-slate-300">Student ID</div>
              <div className="mt-1 font-semibold">{profile.studentId}</div>
            </div>
            <div>
              <div className="text-slate-300">Programme</div>
              <div className="mt-1 font-semibold">{profile.degree}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Department', value: profile.department, icon: UserCircle2 },
          { label: 'Level', value: profile.level, icon: BookOpenText },
          { label: 'Academic year', value: profile.academicYear, icon: CalendarClock },
          { label: 'Current semester', value: profile.semester, icon: BriefcaseBusiness },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">{label}</p>
              <div className="rounded-lg bg-teal-50 p-2 text-teal-600">
                <Icon size={18} />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-900">{value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">Performance overview</h3>
            <Link to="/results" className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700 transition hover:bg-teal-100">
              View results <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">GPA</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{profile.gpa.toFixed(2)}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">CGPA</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{profile.cgpa.toFixed(2)}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Credits completed</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{profile.creditsCompleted}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Registration</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{registration.status}</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-slate-900">Attendance</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Overall attendance</span>
                <span className="font-semibold text-slate-900">{attendanceRecord.overall}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-teal-500" style={{ width: `${attendanceRecord.overall}%` }} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="text-2xl font-bold text-slate-900">{attendanceRecord.present}</div>
                <div className="text-xs text-slate-500">Present</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="text-2xl font-bold text-slate-900">{attendanceRecord.absent}</div>
                <div className="text-xs text-slate-500">Absent</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="text-2xl font-bold text-slate-900">{attendanceRecord.late}</div>
                <div className="text-xs text-slate-500">Late</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-slate-900">Current courses</h3>
          <div className="space-y-3">
            {courses.slice(0, 3).map((course) => (
              <div key={course.code} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">{course.code}</div>
                    <div className="text-sm text-slate-500">{course.title}</div>
                  </div>
                  <div className="rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-teal-700">{course.creditHours} credits</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-slate-900">Announcements</h3>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 p-3">
                <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                <div className="mt-1 text-sm text-slate-600">{item.summary}</div>
                <div className="mt-2 text-xs text-slate-500">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Quick access</h3>
            <p className="mt-1 text-sm text-slate-500">Common student services</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-800">
            <CircleDollarSign size={16} />
            Balance: GHS {outstandingBalance.toLocaleString()}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'View results', to: '/results', icon: ArrowUpRight },
            { label: 'Course registration', to: '/registration', icon: BookOpenText },
            { label: 'Fee statement', to: '/fees', icon: CircleDollarSign },
            { label: 'Class timetable', to: '/timetable', icon: CalendarClock },
          ].map(({ label, to, icon: Icon }) => (
            <Link key={to} to={to} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800">
              <span className="flex items-center gap-2"><Icon size={17} />{label}</span>
              <ArrowUpRight size={15} className="text-slate-400" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
