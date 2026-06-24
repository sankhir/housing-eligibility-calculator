'use client'

import { useState } from 'react'
import { calculateEligibility } from '../dashboard/actions'
import { usePostHog } from 'posthog-js/react'

export default function Calculator() {
  const posthog = usePostHog()
  const [result, setResult] = useState<{ isEligible: boolean; incomeLimit: number } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      const data = await calculateEligibility(formData)
      setResult(data)
      
      posthog.capture('eligibility_calculation_run', {
        county: formData.get('county'),
        householdSize: formData.get('householdSize'),
        annualIncome: formData.get('annualIncome'),
        result_eligible: data.isEligible
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Run New Calculation</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">County</label>
          <select name="county" required className="mt-1 block w-full rounded-md border-gray-300 border p-2 bg-white text-gray-900">
            <option value="Palm Beach">Palm Beach</option>
            <option value="Broward">Broward</option>
            <option value="Miami-Dade">Miami-Dade</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Household Size</label>
          <input type="number" name="householdSize" min="1" required className="mt-1 block w-full rounded-md border-gray-300 border p-2 text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Annual Income ($)</label>
          <input type="number" name="annualIncome" min="0" step="100" required className="mt-1 block w-full rounded-md border-gray-300 border p-2 text-gray-900" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Calculating...' : 'Check Eligibility'}
        </button>
      </form>

      {result && (
        <div className={`mt-6 p-4 rounded-md border ${result.isEligible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <h4 className={`text-lg font-bold ${result.isEligible ? 'text-green-800' : 'text-red-800'}`}>
            {result.isEligible ? 'Likely Eligible' : 'Over Income Limit'}
          </h4>
          <p className="text-sm mt-1 text-gray-700">
            The estimated income limit for this household size is ${result.incomeLimit.toLocaleString()}.
          </p>
        </div>
      )}
    </div>
  )
}