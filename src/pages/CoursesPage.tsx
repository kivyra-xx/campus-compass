import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { studentCourses } from '../data/mockData'
import { loadStudentData, type StudentDataBundle } from '../lib/studentData'

export function CoursesPage() {
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
    const assignedCourses = user.role === 'LECTURER'
      ? studentCourses.filter((course) => course.lecturer === user.name)
      : studentCourses
    const isLecturer = user.role === 'LECTURER'

    return (
      <div className="space-y-5">
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">{isLecturer ? 'Teaching workspace · Demo' : 'Academic catalogue · Demo'}</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{isLecturer ? 'My teaching assignments' : 'Course catalogue'}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {isLecturer ? 'Only courses assigned to your lecturer account are shown.' : 'Academic course information for staff operations.'}
              </p>
            </div>
            <div className="rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-800">
              {assignedCourses.length} {assignedCourses.length === 1 ? 'course' : 'courses'}
            </div>
          </div>
        </section>

        {assignedCourses.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {assignedCourses.map((course) => (
              <article key={course.code} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{course.code}</p>
                    <h3 className="mt-1 text-xl font-semibold text-slate-900">{course.title}</h3>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">{course.creditHours} credits</span>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><span className="font-medium text-slate-800">Lecturer:</span> {course.lecturer}</p>
                  <p><span className="font-medium text-slate-800">Schedule:</span> {course.schedule}</p>
                  <p><span className="font-medium text-slate-800">Venue:</span> {course.venue}</p>
                </div>
                {isLecturer ? (
                  <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                    Class roster and gradebook access are limited to this assigned course.
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-sm ring-1 ring-slate-200">
            No courses are currently assigned to this lecturer account.
          </div>
        )}
      </div>
    )
  }

  if (!data) {
    return <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-sm">Loading courses...</div>
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <div className="rounded-full bg-teal-100 px-3 py-1.5 text-sm font-medium text-teal-700">{data.courses.reduce((sum, course) => sum + course.creditHours, 0)} registered credits</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {data.courses.map((course) => (
          <div key={course.code} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{course.code}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{course.title}</h3>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">{course.creditHours} credits</span>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <p><span className="font-medium text-slate-800">Lecturer:</span> {course.lecturer}</p>
              <p><span className="font-medium text-slate-800">Schedule:</span> {course.schedule}</p>
              <p><span className="font-medium text-slate-800">Venue:</span> {course.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
