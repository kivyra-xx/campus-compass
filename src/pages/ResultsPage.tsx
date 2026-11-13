import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { lecturerGradebook } from '../data/staffData'
import { loadStudentData, type StudentDataBundle } from '../lib/studentData'

export function ResultsPage() {
  const { user } = useAuth()
  const [data, setData] = useState<StudentDataBundle | null>(null)

  useEffect(() => {
    if (user?.role !== 'STUDENT') {
      return
    }

    let isMounted = true
    loadStudentData(user).then((studentData) => {
      if (isMounted) setData(studentData)
    })
    return () => {
      isMounted = false
    }
  }, [user])

  if (user && user.role !== 'STUDENT') {
    if (user.role === 'LECTURER') {
      return (
        <div className="space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">Teaching results · Demo</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">CSCI 301 gradebook</h2>
                <p className="mt-1 text-sm text-slate-500">Software Engineering · Lecturer view for your assigned course</p>
              </div>
              <div className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-800">18 submissions to review</div>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Student</th>
                    <th className="px-5 py-3 font-semibold">Student ID</th>
                    <th className="px-5 py-3 font-semibold">Assessment</th>
                    <th className="px-5 py-3 font-semibold">Score</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {lecturerGradebook.map((record) => (
                    <tr key={record.studentId}>
                      <td className="px-5 py-4 font-medium text-slate-900">{record.name}</td>
                      <td className="px-5 py-4">{record.studentId}</td>
                      <td className="px-5 py-4">{record.assessment}</td>
                      <td className="px-5 py-4">{record.score === null ? '—' : `${record.score} / 100`}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          record.status === 'Graded' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-5 py-3 text-xs text-slate-500">Fictional sample records for CSCI 301 only.</p>
          </section>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Courses in result cycle', value: '24' },
            { label: 'Submissions received', value: '82%' },
            { label: 'Results needing review', value: '42' },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-xl font-semibold text-slate-900">{user.role === 'REGISTRAR' ? 'Results release queue' : 'University results overview'}</h2>
            <p className="mt-1 text-sm text-slate-500">Course-level processing status · Fictional demo totals</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-3 font-semibold">Course</th>
                  <th className="px-5 py-3 font-semibold">Enrolled</th>
                  <th className="px-5 py-3 font-semibold">Submission status</th>
                  <th className="px-5 py-3 font-semibold">Pending review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { course: 'CSCI 301 · Software Engineering', enrolled: 42, status: 'Submitted', pending: 6 },
                  { course: 'CSCI 305 · Operating Systems', enrolled: 38, status: 'In progress', pending: 18 },
                  { course: 'BUS 204 · Financial Accounting', enrolled: 56, status: 'Submitted', pending: 3 },
                ].map((item) => (
                  <tr key={item.course}>
                    <td className="px-5 py-4 font-medium text-slate-900">{item.course}</td>
                    <td className="px-5 py-4">{item.enrolled}</td>
                    <td className="px-5 py-4">{item.status}</td>
                    <td className="px-5 py-4">{item.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    )
  }

  if (!data) {
    return <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-sm">Loading results...</div>
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-semibold">Course</th>
                <th className="px-5 py-3 font-semibold">Unit</th>
                <th className="px-5 py-3 font-semibold">Score</th>
                <th className="px-5 py-3 font-semibold">Grade</th>
                <th className="px-5 py-3 font-semibold">Semester</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.results.map((result) => (
                <tr key={`${result.code}-${result.semester}`}>
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">{result.title}</div>
                    <div className="text-xs text-slate-500">{result.code}</div>
                  </td>
                  <td className="px-5 py-4">{result.unit}</td>
                  <td className="px-5 py-4">{result.score}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{result.grade}</span>
                  </td>
                  <td className="px-5 py-4">{result.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
