import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import FloatingThemeToggle from '@/components/FloatingThemeToggle'
import CookieNotification from '@/components/CookieNotification'
import RunningTextBanner from '@/components/RunningTextBanner'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'RekaKarya - Affordable and Professional Website Solutions',
  description: 'Creative developer specializing in modern web applications, UI/UX design, and digital experiences.',
  keywords: 'developer, portfolio, web development, UI/UX, React, Next.js',
  authors: [{ name: 'Rekakarya' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <RunningTextBanner />
          {children}
          <FloatingThemeToggle />
          <CookieNotification />
        </ThemeProvider>
      </body>
    </html>
  )
}
