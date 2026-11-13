import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { financeTransactions } from '../data/staffData'
import { loadStudentData, type StudentDataBundle } from '../lib/studentData'

export function FeesPage() {
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
    const metrics = user.role === 'FINANCE_OFFICER'
      ? [
          ['Collections this year', 'GHS 8.42M'],
          ['Outstanding balances', 'GHS 1.26M'],
          ['Collection rate', '87%'],
          ['Transactions to reconcile', '12'],
        ]
      : [
          ['Collections this year', 'GHS 8.42M'],
          ['Outstanding balances', 'GHS 1.26M'],
          ['Collection rate', '87%'],
          ['Finance review items', '12'],
        ]

    return (
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([label, value]) => (
            <article key={label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
              <p className="mt-2 text-xs text-slate-500">University-wide · fictional demo totals</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-xl font-semibold text-slate-900">
              {user.role === 'FINANCE_OFFICER' ? 'Finance collection ledger' : 'University fee overview'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {user.role === 'FINANCE_OFFICER'
                ? 'Recent transactions for reconciliation; no individual student fee statement is shown.'
                : 'Aggregate collection activity for administrative review.'}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Reference</th>
                  <th className="px-5 py-3 font-semibold">Channel</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {financeTransactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td className="px-5 py-4">{transaction.date}</td>
                    <td className="px-5 py-4 font-medium text-slate-900">{transaction.reference}</td>
                    <td className="px-5 py-4">{transaction.method}</td>
                    <td className="px-5 py-4 font-medium text-slate-900">GHS {transaction.amount.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        index === 1 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {index === 1 ? 'Reconcile' : 'Posted'}
                      </span>
                    </td>
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
    return <div className="rounded-3xl bg-white p-6 text-slate-600 shadow-sm">Loading fees...</div>
  }

  const totalDue = data.fees.reduce((sum, item) => (item.status === 'Outstanding' || item.status === 'Pending' ? sum + item.amount : sum), 0)
  const totalPaid = data.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm text-slate-500">Total paid</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">GHS {totalPaid.toLocaleString()}</div>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm text-slate-500">Outstanding</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">GHS {totalDue.toFixed(2)}</div>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm text-slate-500">Payment status</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">On track</div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">Fee invoices</h3>
        <div className="space-y-3">
          {data.fees.map((fee) => (
            <div key={fee.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-slate-900">{fee.description}</div>
                <div className="text-sm text-slate-500">Invoice {fee.id}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-lg font-bold text-slate-900">GHS {fee.amount.toFixed(2)}</div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  fee.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : fee.status === 'Outstanding' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {fee.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">Payment history</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-3 font-semibold">Date</th>
                <th className="px-3 py-3 font-semibold">Method</th>
                <th className="px-3 py-3 font-semibold">Reference</th>
                <th className="px-3 py-3 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-3 py-3">{payment.date}</td>
                  <td className="px-3 py-3">{payment.method}</td>
                  <td className="px-3 py-3">{payment.reference}</td>
                  <td className="px-3 py-3 font-medium text-slate-900">GHS {payment.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
