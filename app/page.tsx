import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
        Housing Assistance Portal
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl">
        Quickly determine your eligibility for local housing assistance programs based on household size, income, and county guidelines.
      </p>
      <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors duration-200">
        Access Calculator
      </Link>
    </div>
  )
}