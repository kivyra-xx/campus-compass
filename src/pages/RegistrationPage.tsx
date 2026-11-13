import { courseRegistration, studentCourses } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

export function RegistrationPage() {
  const { user } = useAuth()

  if (user?.role === 'REGISTRAR') {
    return (
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Registration complete', value: '86%' },
            { label: 'Exceptions to review', value: '23' },
            { label: 'Course changes pending', value: '8' },
          ].map((item) => (
            <article key={item.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
              <p className="mt-2 text-xs text-slate-500">Semester 1 · fictional demo data</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">Registrar workspace · Demo</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">Registration exceptions</h2>
            <p className="mt-1 text-sm text-slate-500">Review masked student cases and course changes before registration closes on 20 November.</p>
          </div>
          <div className="space-y-3">
            {[
              { id: 'MCU-2024-12**', issue: 'Prerequisite verification', detail: 'CSCI 315 · Supporting record requested', status: 'Needs review' },
              { id: 'MCU-2025-08**', issue: 'Credit load exception', detail: 'Semester total exceeds standard course load', status: 'In progress' },
              { id: 'MCU-2023-06**', issue: 'Course change request', detail: 'Department approval received · Registrar review pending', status: 'Due soon' },
            ].map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{item.issue} <span className="font-normal text-slate-500">· {item.id}</span></p>
                  <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                </div>
                <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${
                  item.status === 'In progress' ? 'bg-blue-50 text-blue-700' : item.status === 'Due soon' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Registration status</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{courseRegistration.status}</h2>
          </div>
          <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">{courseRegistration.registrationWindow}</div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Registered credits</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{courseRegistration.registeredCredits}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Fee balance</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">GHS {courseRegistration.feeBalance.toFixed(2)}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Session</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{courseRegistration.academicYear}</div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h3 className="mb-5 text-xl font-semibold text-slate-900">Registered courses</h3>
        <div className="space-y-3">
          {studentCourses.map((course) => (
            <div key={course.code} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-slate-900">{course.code} · {course.title}</div>
                <div className="mt-1 text-sm text-slate-500">{course.lecturer}</div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span>{course.schedule}</span>
                <span>{course.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
