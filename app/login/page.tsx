import { login, signup } from './actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-12">
      <form className="flex-1 flex flex-col w-full justify-center gap-4 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Account Access</h2>
        
        <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
        <input className="rounded-md px-4 py-2 border text-gray-900 bg-white" name="email" placeholder="you@example.com" required />
        
        <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
        <input className="rounded-md px-4 py-2 border text-gray-900 bg-white" type="password" name="password" placeholder="••••••••" required />
        
        <button formAction={login} className="bg-blue-600 rounded-md px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors">
          Sign In
        </button>
        <button formAction={signup} className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-800 font-medium hover:bg-gray-200 transition-colors">
          Create Account
        </button>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-50 text-red-600 text-center rounded-md text-sm">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}