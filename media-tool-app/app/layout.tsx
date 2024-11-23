import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Media Tool Attachment',
  description: 'Convert DOCX files to PDF with optional password protection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background font-sans antialiased">
          <main className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

