import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kadoin.me - Buat Kado Digital Personal dalam 5 Menit',
  description: 'Buat kado digital personal tanpa coding & desain. Isi form → jadi website kado → share link. Hasilnya niat banget!',
  keywords: ['kado digital', 'kado online', 'hadiah digital', 'ultah', 'anniversary', 'kado romantis'],
  openGraph: {
    title: 'Kadoin.me - Kado Digital Personal',
    description: 'Buat kado digital personal dalam 5 menit tanpa skill teknis',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#10b981',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
