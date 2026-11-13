import { notifications } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { staffNotifications, staffRoleLabels } from '../data/staffData'

export function NotificationsPage() {
  const { user } = useAuth()
  const staffRole = user && user.role !== 'STUDENT' ? user.role : null
  const visibleNotifications = staffRole ? staffNotifications[staffRole] : notifications

  return (
    <div className="space-y-6">
      {staffRole ? (
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">{staffRoleLabels[staffRole]} · Demo</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Work notifications</h2>
        </div>
      ) : null}
      <div className="space-y-4">
        {visibleNotifications.map((notification) => (
          <div key={notification.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">{notification.title}</h3>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                notification.priority === 'High' ? 'bg-red-100 text-red-700' : notification.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {notification.priority}
              </span>
            </div>
            <p className="text-sm text-slate-600">{notification.detail}</p>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
