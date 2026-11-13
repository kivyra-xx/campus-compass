import { Link } from 'react-router-dom'

export function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-700">!</div>
        <h1 className="text-3xl font-bold text-slate-900">Access denied</h1>
        <p className="mt-3 text-slate-600">
          You do not have permission to view this section of the Campus Compass portal.
        </p>
        <Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800">
          Return to dashboard
        </Link>
      </div>
    </div>
  )
}
