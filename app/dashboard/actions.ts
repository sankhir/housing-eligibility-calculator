'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function calculateEligibility(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const householdSize = parseInt(formData.get('householdSize') as string)
  const annualIncome = parseFloat(formData.get('annualIncome') as string)
  const county = formData.get('county') as string

  let baseLimit = 0
  if (county === 'Palm Beach') baseLimit = 65000
  else if (county === 'Broward') baseLimit = 62000
  else if (county === 'Miami-Dade') baseLimit = 60000

  const incomeLimit = baseLimit + ((householdSize - 1) * 8500)
  const isEligible = annualIncome <= incomeLimit

  const { error } = await supabase.from('calculations').insert({
    user_id: user.id,
    household_size: householdSize,
    annual_income: annualIncome,
    county,
    is_eligible: isEligible
  })

  if (error) throw new Error('Failed to save calculation')

  revalidatePath('/dashboard')
  return { isEligible, incomeLimit }
}

export async function deleteCalculation(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('calculations').delete().eq('id', id)
  
  if (error) throw new Error('Failed to delete record')
  
  revalidatePath('/dashboard')
}