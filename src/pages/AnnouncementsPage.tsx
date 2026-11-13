import { announcements } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { staffAnnouncements, staffRoleLabels } from '../data/staffData'

export function AnnouncementsPage() {
  const { user } = useAuth()
  const staffRole = user && user.role !== 'STUDENT' ? user.role : null
  const visibleAnnouncements = staffRole ? staffAnnouncements[staffRole] : announcements

  return (
    <div className="space-y-6">
      {staffRole ? (
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">{staffRoleLabels[staffRole]} · Demo</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Staff announcements</h2>
        </div>
      ) : null}
      <div className="space-y-4">
        {visibleAnnouncements.map((item) => (
          <article key={item.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{item.audience}</span>
            </div>
            <p className="text-sm leading-6 text-slate-600">{item.summary}</p>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">{item.date}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
