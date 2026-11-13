import { useAuth } from '../contexts/AuthContext'
import { financeTransactions } from '../data/staffData'

export function PaymentsPage() {
  const { user } = useAuth()
  const totalProcessed = financeTransactions.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Transactions in this demo ledger</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{financeTransactions.length}</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Processed amount</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">GHS {totalProcessed.toLocaleString()}</p>
        </div>
      </section>
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">{user?.role === 'ADMIN' ? 'Administrative overview' : 'Finance Office'} · Demo</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">Recent transactions</h3>
          </div>
          <button type="button" className="rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white">Export report</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-3 font-semibold">Date</th>
                <th className="px-3 py-3 font-semibold">Reference</th>
                <th className="px-3 py-3 font-semibold">Method</th>
                <th className="px-3 py-3 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {financeTransactions.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-3 py-3">{payment.date}</td>
                  <td className="px-3 py-3">{payment.reference}</td>
                  <td className="px-3 py-3">{payment.method}</td>
                  <td className="px-3 py-3 font-medium text-slate-900">GHS {payment.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
