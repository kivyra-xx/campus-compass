import { Mail, MapPin, Phone, School } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { staffRoleLabels } from '../data/staffData'
import { loadStudentData, type StudentDataBundle } from '../lib/studentData'

export function ProfilePage() {
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
    return (
      <div className="space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
              {user.avatar}
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">Staff profile · Demo</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">{user.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{staffRoleLabels[user.role]}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700 sm:ml-auto">
              {user.status === 'active' ? 'Active account' : 'Inactive account'}
            </span>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Work information</h3>
            <div className="space-y-4">
              {[
                ['Staff code', user.loginId],
                ['Role', staffRoleLabels[user.role]],
                ['Department', user.department ?? 'University administration'],
                ['Institution', 'Meridian Coast University'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-none last:pb-0">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-right text-sm font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Contact details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <Mail className="text-teal-600" size={18} />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <MapPin className="text-teal-600" size={18} />
                <span className="text-sm">{user.department ?? 'Meridian Coast University'}</span>
              </div>
              <p className="text-xs leading-5 text-slate-500">
                This demo profile contains staff account details only. Real contact and employment records will come from the university system.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!data) {
    return <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-sm">Loading profile...</div>
  }

  const { profile } = data

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-2xl font-bold text-white">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={`${profile.fullName} profile`} className="h-full w-full object-cover" />
              ) : (
                profile.picture
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{profile.fullName}</h2>
              <p className="text-sm text-slate-500">{profile.studentId}</p>
            </div>
          </div>
          <div className="rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">Active student</div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Academic information</h3>
          <div className="space-y-4">
            {[
              ['Programme', profile.degree],
              ['Department', profile.department],
              ['Level', profile.level],
              ['Academic year', profile.academicYear],
              ['Current semester', profile.semester],
              ['Credits completed', `${profile.creditsCompleted} units`],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none last:pb-0">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Contact details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <Mail className="text-teal-600" size={18} />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <Phone className="text-teal-600" size={18} />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <MapPin className="text-teal-600" size={18} />
              <span>{profile.address}</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <School className="text-teal-600" size={18} />
              <span>{profile.nationality}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
