import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/globals.scss'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TaskFlow - Elegant Task Management',
  description: 'Manage your tasks with style and simplicity',
  keywords: ['task management', 'productivity', 'todo'],
  authors: [{ name: 'TaskFlow Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className={inter.variable}>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}