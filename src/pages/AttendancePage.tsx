import { attendanceRecord } from '../data/mockData'
import { lecturerRoster } from '../data/staffData'
import { useAuth } from '../contexts/AuthContext'

export function AttendancePage() {
  const { user } = useAuth()

  if (user?.role === 'LECTURER') {
    return (
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Course', value: 'CSCI 301' },
            { label: 'Class attendance', value: '91%' },
            { label: 'Students enrolled', value: '42' },
          ].map((item) => (
            <article key={item.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
              <p className="mt-2 text-xs text-slate-500">Software Engineering · Demo course</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-100 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">Lecturer view · Assigned course only</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">CSCI 301 attendance register</h2>
            <p className="mt-1 text-sm text-slate-500">Fictional student records for the lecturer’s assigned class.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-3 font-semibold">Student</th>
                  <th className="px-5 py-3 font-semibold">Student ID</th>
                  <th className="px-5 py-3 font-semibold">Attendance</th>
                  <th className="px-5 py-3 font-semibold">Present</th>
                  <th className="px-5 py-3 font-semibold">Absent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {lecturerRoster.map((record) => (
                  <tr key={record.studentId}>
                    <td className="px-5 py-4 font-medium text-slate-900">{record.name}</td>
                    <td className="px-5 py-4">{record.studentId}</td>
                    <td className="px-5 py-4">{record.attendance}%</td>
                    <td className="px-5 py-4">{record.present}</td>
                    <td className="px-5 py-4">{record.absent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
            <span>Overall attendance</span>
            <span className="font-semibold text-slate-900">{attendanceRecord.overall}%</span>
          </div>
          <div className="h-3 rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-teal-500" style={{ width: `${attendanceRecord.overall}%` }} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Present', value: attendanceRecord.present },
          { label: 'Absent', value: attendanceRecord.absent },
          { label: 'Late', value: attendanceRecord.late },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200">
            <div className="text-3xl font-bold text-slate-900">{item.value}</div>
            <div className="mt-2 text-sm text-slate-500">{item.label}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
