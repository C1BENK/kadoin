'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Gift, User, Home, LogOut } from 'lucide-react'

export function Header() {
  const [user, setUser] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const pathname = usePathname()
  const supabase = createClient()

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Gift className="h-8 w-8 text-romantic-500" />
          <span className="text-xl font-bold text-gray-900">Kadoin.me</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-romantic-500 ${
              isActive('/') ? 'text-romantic-500' : 'text-gray-600'
            }`}
          >
            <Home className="inline mr-1 h-4 w-4" />
            Home
          </Link>
          <Link
            href="/create"
            className={`text-sm font-medium transition-colors hover:text-romantic-500 ${
              isActive('/create') ? 'text-romantic-500' : 'text-gray-600'
            }`}
          >
            Buat Kado
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors hover:text-romantic-500 ${
              isActive('/pricing') ? 'text-romantic-500' : 'text-gray-600'
            }`}
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {loading ? (
            <div className="h-9 w-20 animate-pulse bg-gray-200 rounded"></div>
          ) : user ? (
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary" size="sm">
                  Daftar Gratis
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
