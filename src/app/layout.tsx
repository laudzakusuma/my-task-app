import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Import all your global SCSS files here
import '../styles/themes/video-harmony.scss'
import '../styles/themes/video-custom.scss'
import '../styles/globals.scss'

import { ToastProvider, ErrorBoundary } from '@/components/ui'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TaskFlow - Elegant Task Management',
  description: 'Manage your tasks with style and simplicity. Built with Next.js, TypeScript, and Framer Motion.',
  keywords: ['task management', 'productivity', 'todo', 'next.js', 'typescript'],
  authors: [{ name: 'TaskFlow Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#06b6d4',
  robots: 'index, follow',
  openGraph: {
    title: 'TaskFlow - Elegant Task Management',
    description: 'Manage your tasks with style and simplicity',
    type: 'website',
    locale: 'en_US', // Changed from id_ID
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskFlow - Elegant Task Management',
    description: 'Manage your tasks with style and simplicity',
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body suppressHydrationWarning={true}>
        <ErrorBoundary>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}