import { documents } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { staffDocuments, staffRoleLabels } from '../data/staffData'

export function DocumentsPage() {
  const { user } = useAuth()
  const staffRole = user && user.role !== 'STUDENT' ? user.role : null
  const visibleDocuments = staffRole ? staffDocuments[staffRole] : documents

  return (
    <div className="space-y-6">
      {staffRole ? (
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">{staffRoleLabels[staffRole]} · Demo</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Office documents</h2>
          <p className="mt-1 text-sm text-slate-500">Documents are scoped to your staff role; student personal files are not shown here.</p>
        </div>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-2">
        {visibleDocuments.map((document) => (
          <div key={document.name} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-900">{document.name}</div>
                <div className="text-sm text-slate-500">{document.type}</div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                document.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : document.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {document.status}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>{document.size}</span>
              <span>Updated {document.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
