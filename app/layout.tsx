import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Transport Marketplace',
  description: 'Marketplace transportowy – zleć przewóz, znajdź przewoźnika, porównaj oferty.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}