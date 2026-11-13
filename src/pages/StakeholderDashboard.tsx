import {
  Activity,
  ArrowUpRight,
  Banknote,
  BookOpenText,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { demoInstitution } from '../data/mockData'
import type { Role, UserSession } from '../types'

type DashboardStatus = 'Needs review' | 'In progress' | 'Due soon' | 'On track' | 'Completed' | 'New' | 'Upcoming' | 'Scheduled'

type DashboardItem = {
  title: string
  detail: string
  status?: DashboardStatus
  value?: string
}

type DashboardConfig = {
  eyebrow: string
  summary: string
  metrics: {
    label: string
    value: string
    detail: string
    icon: LucideIcon
    iconStyle: string
  }[]
  focusTitle: string
  focusDescription: string
  focusItems: DashboardItem[]
  snapshotTitle: string
  snapshotItems: DashboardItem[]
  activityTitle: string
  activityItems: DashboardItem[]
  actions: { label: string; to: string; icon: LucideIcon }[]
}

const dashboardConfigs: Record<Exclude<Role, 'STUDENT'>, DashboardConfig> = {
  ADMIN: {
    eyebrow: 'University operations',
    summary: 'A snapshot of academic activity and items that need attention.',
    metrics: [
      { label: 'Enrolled students', value: '4,286', detail: 'Across 5 faculties', icon: Users, iconStyle: 'bg-teal-50 text-teal-700' },
      { label: 'Academic staff', value: '318', detail: 'Across 5 faculties', icon: BriefcaseBusiness, iconStyle: 'bg-indigo-50 text-indigo-700' },
      { label: 'Active programmes', value: '24', detail: 'Undergraduate and postgraduate', icon: BookOpenText, iconStyle: 'bg-violet-50 text-violet-700' },
      { label: 'Approvals pending', value: '17', detail: '4 due this week', icon: ClipboardCheck, iconStyle: 'bg-amber-50 text-amber-700' },
    ],
    focusTitle: 'Items needing attention',
    focusDescription: 'Review these operational requests.',
    focusItems: [
      { title: 'Programme review requests', detail: '2 proposals awaiting academic board review', status: 'Needs review' },
      { title: 'Course change approvals', detail: '8 requests submitted by departments', status: 'In progress' },
      { title: 'Admissions verification', detail: '23 applicant records need document checks', status: 'Due soon' },
    ],
    snapshotTitle: 'University overview',
    snapshotItems: [
      { title: 'Registration completion', detail: 'Students confirmed for Semester 1', value: '86%' },
      { title: 'Fee collection', detail: 'Current academic year', value: '87%' },
      { title: 'Open service cases', detail: 'Across student-facing offices', value: '34' },
    ],
    activityTitle: 'Recent activity',
    activityItems: [
      { title: 'New programme proposal received', detail: 'School of Health Sciences · 10:42 AM', status: 'New' },
      { title: 'Registration batch approved', detail: 'Registrar’s office · 9:15 AM', status: 'Completed' },
      { title: 'Campus notice updated', detail: 'University community · Yesterday', status: 'On track' },
    ],
    actions: [
      { label: 'Manage courses', to: '/courses', icon: BookOpenText },
      { label: 'Review results', to: '/results', icon: Activity },
      { label: 'Fee overview', to: '/fees', icon: Wallet },
      { label: 'Announcements', to: '/announcements', icon: FileText },
    ],
  },
  LECTURER: {
    eyebrow: 'Teaching workspace',
    summary: 'Your teaching schedule, class activity, and assessment tasks.',
    metrics: [
      { label: 'Assigned courses', value: '1', detail: 'This semester', icon: BookOpenText, iconStyle: 'bg-teal-50 text-teal-700' },
      { label: 'Students enrolled', value: '42', detail: 'Across your course', icon: Users, iconStyle: 'bg-indigo-50 text-indigo-700' },
      { label: 'Weekly sessions', value: '2', detail: 'Lecture and lab', icon: CalendarClock, iconStyle: 'bg-violet-50 text-violet-700' },
      { label: 'Grading queue', value: '18', detail: 'Submissions to review', icon: ClipboardCheck, iconStyle: 'bg-amber-50 text-amber-700' },
    ],
    focusTitle: 'Teaching tasks',
    focusDescription: 'A short list of work for your classes.',
    focusItems: [
      { title: 'CSCI 301 · Software Engineering', detail: 'Project marks due 18 November', status: 'Due soon' },
      { title: 'Attendance review', detail: 'Confirm this week’s class register', status: 'In progress' },
      { title: 'Semester gradebook', detail: 'Last updated 12 November', status: 'On track' },
    ],
    snapshotTitle: 'Next class',
    snapshotItems: [
      { title: 'CSCI 301 · Software Engineering', detail: 'Monday · 9:00–10:30 AM', value: 'Next session' },
      { title: 'Venue', detail: 'Technology Centre, Lab 2', value: 'Lab 2' },
      { title: 'Class attendance', detail: 'Recorded this semester', value: '91%' },
    ],
    activityTitle: 'Class activity',
    activityItems: [
      { title: '12 students submitted an assignment', detail: 'CSCI 301 · Today, 10:20 AM', status: 'New' },
      { title: 'Attendance recorded', detail: 'CSCI 301 · Wednesday', status: 'Completed' },
      { title: 'Department briefing', detail: 'Friday · 2:00 PM', status: 'Upcoming' },
    ],
    actions: [
      { label: 'My courses', to: '/courses', icon: BookOpenText },
      { label: 'Record attendance', to: '/attendance', icon: CheckCircle2 },
      { label: 'Review results', to: '/results', icon: Activity },
      { label: 'Announcements', to: '/announcements', icon: FileText },
    ],
  },
  FINANCE_OFFICER: {
    eyebrow: 'Finance operations',
    summary: 'Monitor tuition collections, payment processing, and reconciliation.',
    metrics: [
      { label: 'Collected this year', value: 'GHS 8.42M', detail: 'Across all payment channels', icon: Banknote, iconStyle: 'bg-teal-50 text-teal-700' },
      { label: 'Outstanding balance', value: 'GHS 1.26M', detail: 'Across active accounts', icon: Wallet, iconStyle: 'bg-amber-50 text-amber-700' },
      { label: 'Payments today', value: '146', detail: 'Mobile money, bank, and card', icon: Activity, iconStyle: 'bg-indigo-50 text-indigo-700' },
      { label: 'Needs reconciliation', value: '12', detail: 'Transactions to verify', icon: ClipboardCheck, iconStyle: 'bg-rose-50 text-rose-700' },
    ],
    focusTitle: 'Finance work queue',
    focusDescription: 'Review transactions and follow up on balances.',
    focusItems: [
      { title: 'Bank transfer batch BT-1108', detail: '14 payments · GHS 38,450.00', status: 'Needs review' },
      { title: 'Mobile money settlement', detail: '12 records awaiting provider matching', status: 'In progress' },
      { title: 'Outstanding tuition reminders', detail: '126 accounts due by 30 November', status: 'Scheduled' },
    ],
    snapshotTitle: 'Daily reconciliation',
    snapshotItems: [
      { title: 'Collections posted', detail: 'Today’s payment entries', value: '98.4%' },
      { title: 'Awaiting confirmation', detail: 'Bank and mobile money batches', value: '3 batches' },
      { title: 'Next settlement', detail: 'Provider reconciliation window', value: '3:30 PM' },
    ],
    activityTitle: 'Recent finance activity',
    activityItems: [
      { title: 'Tuition payment batch received', detail: 'Mobile money · 11:32 AM', status: 'New' },
      { title: 'Refund request submitted', detail: 'Student accounts · 10:08 AM', status: 'Needs review' },
      { title: 'Daily collection report prepared', detail: 'Finance office · 9:00 AM', status: 'Completed' },
    ],
    actions: [
      { label: 'Fee statements', to: '/fees', icon: Wallet },
      { label: 'Payment transactions', to: '/payments', icon: Banknote },
      { label: 'Documents', to: '/documents', icon: FileText },
      { label: 'Notifications', to: '/notifications', icon: Activity },
    ],
  },
  REGISTRAR: {
    eyebrow: 'Academic records',
    summary: 'Track student registration, records requests, and academic deadlines.',
    metrics: [
      { label: 'Active students', value: '4,286', detail: 'Across all programmes', icon: GraduationCap, iconStyle: 'bg-teal-50 text-teal-700' },
      { label: 'Registration complete', value: '86%', detail: 'Semester 1 · 2026/2027', icon: CheckCircle2, iconStyle: 'bg-emerald-50 text-emerald-700' },
      { label: 'Transcript requests', value: '42', detail: '11 awaiting verification', icon: FileText, iconStyle: 'bg-indigo-50 text-indigo-700' },
      { label: 'Course approvals', value: '17', detail: 'Pending department review', icon: ClipboardCheck, iconStyle: 'bg-amber-50 text-amber-700' },
    ],
    focusTitle: 'Registrar work queue',
    focusDescription: 'Requests awaiting review by the Registrar’s office.',
    focusItems: [
      { title: 'Registration exceptions', detail: '23 students have prerequisite or credit queries', status: 'Needs review' },
      { title: 'Transcript requests', detail: '11 records are ready for verification', status: 'In progress' },
      { title: 'Course change requests', detail: '8 submissions from academic departments', status: 'Due soon' },
    ],
    snapshotTitle: 'Academic calendar',
    snapshotItems: [
      { title: 'Add/drop deadline', detail: 'Course registration closes', value: '20 Nov' },
      { title: 'Examinations begin', detail: 'End-of-semester assessment period', value: '7 Dec' },
      { title: 'Results submission', detail: 'Department grade deadline', value: '18 Dec' },
    ],
    activityTitle: 'Recent records activity',
    activityItems: [
      { title: 'Level 300 registration batch processed', detail: '286 student records · 11:05 AM', status: 'Completed' },
      { title: 'Transcript verification requested', detail: 'Student Records · 10:40 AM', status: 'New' },
      { title: 'Examination timetable published', detail: 'Academic calendar · Yesterday', status: 'On track' },
    ],
    actions: [
      { label: 'Course registration', to: '/registration', icon: ClipboardCheck },
      { label: 'Manage courses', to: '/courses', icon: BookOpenText },
      { label: 'Review results', to: '/results', icon: Activity },
      { label: 'Student documents', to: '/documents', icon: FileText },
    ],
  },
}

const statusStyles: Record<DashboardStatus, string> = {
  'Needs review': 'bg-rose-50 text-rose-700',
  'In progress': 'bg-blue-50 text-blue-700',
  'Due soon': 'bg-amber-50 text-amber-700',
  'On track': 'bg-emerald-50 text-emerald-700',
  Completed: 'bg-emerald-50 text-emerald-700',
  New: 'bg-violet-50 text-violet-700',
  Upcoming: 'bg-slate-100 text-slate-700',
  Scheduled: 'bg-indigo-50 text-indigo-700',
}

export function StakeholderDashboard({ user }: { user: UserSession }) {
  if (user.role === 'STUDENT') {
    return null
  }

  const config = dashboardConfigs[user.role]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const today = new Intl.DateTimeFormat('en-GH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-800 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg font-bold ring-2 ring-white/20">
              {user.avatar}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-teal-200">{config.eyebrow} · Demo</p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{greeting}, {user.name.split(' ')[0]}</h2>
              <p className="mt-1 text-sm text-slate-300">{config.summary}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm sm:min-w-52">
            <div className="text-slate-300">Today</div>
            <div className="mt-1 font-semibold text-white">{today}</div>
            <div className="mt-3 flex items-center gap-2 text-xs text-teal-200">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              {demoInstitution.academicYear} · {demoInstitution.semester}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {config.metrics.map(({ label, value, detail, icon: Icon, iconStyle }) => (
          <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
              </div>
              <div className={`rounded-xl p-2.5 ${iconStyle}`}>
                <Icon size={20} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">{detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-slate-900">{config.focusTitle}</h3>
            <p className="mt-1 text-sm text-slate-500">{config.focusDescription}</p>
          </div>
          <div className="divide-y divide-slate-100">
            {config.focusItems.map((item) => (
              <div key={item.title} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                </div>
                {item.status ? (
                  <span className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                    {item.status}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">{config.snapshotTitle}</h3>
          <div className="space-y-4">
            {config.snapshotItems.map((item) => (
              <div key={item.title} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                </div>
                {item.value ? <span className="shrink-0 text-sm font-bold text-slate-900">{item.value}</span> : null}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{config.activityTitle}</h3>
            <span className="text-xs font-medium text-slate-400">Demo activity</span>
          </div>
          <div className="space-y-3">
            {config.activityItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="mt-0.5 rounded-lg bg-white p-2 text-teal-700 shadow-sm">
                  <Activity size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    {item.status ? (
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[item.status]}`}>
                        {item.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Quick access</h3>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {config.actions.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
              >
                <span className="flex items-center gap-2">
                  <Icon size={17} />
                  {label}
                </span>
                <ArrowUpRight size={15} className="text-slate-400" />
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
