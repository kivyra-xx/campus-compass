import { examTimetable, timetable } from '../data/mockData'

export function TimetablePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 lg:grid-cols-2">
          {timetable.map((slot) => (
            <div key={`${slot.day}-${slot.course}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{slot.day}</div>
              <div className="text-lg font-semibold text-slate-900">{slot.course}</div>
              <div className="mt-2 text-sm text-slate-600">{slot.time}</div>
              <div className="mt-1 text-sm text-slate-600">{slot.venue}</div>
              <div className="mt-1 text-sm text-slate-600">{slot.lecturer}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h3 className="text-xl font-semibold text-slate-900">Examination timetable</h3>
        <div className="mt-4 space-y-3">
          {examTimetable.map((item) => (
            <div key={`${item.date}-${item.course}`} className="flex flex-col gap-2 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-slate-900">{item.course}</div>
                <div className="text-sm text-slate-500">{item.day}, {item.date}</div>
              </div>
              <div className="text-sm text-slate-600">{item.time}</div>
              <div className="text-sm text-slate-600">{item.venue}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
