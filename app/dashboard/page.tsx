import { createClient } from '@/utils/supabase/server'
import { logout } from '../login/actions'
import { deleteCalculation } from './actions'
import Calculator from '../components/Calculator'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: history } = await supabase
    .from('calculations')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500">Logged in as {user?.email}</p>
        </div>
        <form action={logout}>
          <button className="text-sm font-medium text-red-600 hover:text-red-800 bg-red-50 py-2 px-4 rounded-md">
            Sign Out
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Calculator />
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Calculation History</h3>
            {history && history.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-gray-600">Date</th>
                      <th className="px-4 py-3 text-gray-600">County</th>
                      <th className="px-4 py-3 text-gray-600">Size</th>
                      <th className="px-4 py-3 text-gray-600">Income</th>
                      <th className="px-4 py-3 text-gray-600">Result</th>
                      <th className="px-4 py-3 text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((calc) => (
                      <tr key={calc.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600">{new Date(calc.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3">{calc.county}</td>
                        <td className="px-4 py-3">{calc.household_size}</td>
                        <td className="px-4 py-3">${calc.annual_income.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${calc.is_eligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {calc.is_eligible ? 'Eligible' : 'Ineligible'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <form action={async () => {
                            'use server'
                            await deleteCalculation(calc.id)
                          }}>
                            <button type="submit" className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No past calculations found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}