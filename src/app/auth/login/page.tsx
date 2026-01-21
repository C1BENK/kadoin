'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth-schema'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'react-hot-toast'
import { Mail, Lock, Heart } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Login berhasil!')
      router.push('/dashboard')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-romantic-500 to-pink-500 rounded-full mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Masuk ke Kadoin.me</h1>
          <p className="text-gray-600 mt-2">
            Lanjutkan membuat kado digital spesial
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              leftIcon={<Mail className="h-4 w-4" />}
              {...register('email')}
              error={errors.email?.message}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              {...register('password')}
              error={errors.password?.message}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-romantic-600 rounded border-gray-300 focus:ring-romantic-500"
                />
                <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
              </label>
              <a
                href="/auth/forgot-password"
                className="text-sm text-romantic-600 hover:text-romantic-500"
              >
                Lupa password?
              </a>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Atau</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                  },
                })
              }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
              Lanjutkan dengan Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link
              href="/auth/register"
              className="font-medium text-romantic-600 hover:text-romantic-500"
            >
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
