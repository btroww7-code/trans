import './globals.css'
import { Manrope } from 'next/font/google'
import Navigation from './components/Navigation'
import { AuthProvider } from '@/lib/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata = {
  title: 'Transport Marketplace - Znajdź przewoźnika, porównaj oferty',
  description: 'Marketplace transportowy – zleć przewóz, znajdź przewoźnika, porównaj oferty. Bezpieczne płatności, zweryfikowani przewoźnicy.',
  keywords: 'transport, przewóz, zlecenia transportowe, przewoźnicy, marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={manrope.className}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}