import './globals.css'
import { Inter } from 'next/font/google'
import { CSPostHogProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Housing & Economic Development Calculator',
  description: 'Determine eligibility for county housing assistance programs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <CSPostHogProvider>
          <header className="bg-blue-900 text-white p-4 shadow-md">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Department of Housing and Economic Development</h1>
            </div>
          </header>
          <main className="flex-grow w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
          <footer className="bg-gray-800 text-gray-300 text-center p-4 text-sm">
            © {new Date().getFullYear()} Housing Assistance Portal. Public Information Office.
          </footer>
        </CSPostHogProvider>
      </body>
    </html>
  )
}