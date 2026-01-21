'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { Gift, Plus, Eye, Copy, Edit, Trash2, TrendingUp, Users, Sparkles } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = React.useState<any>(null)
  const [gifts, setGifts] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const supabase = createClient()

  React.useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/login')
      return
    }

    setUser(user)

    // Fetch user's gifts
    const { data: giftsData } = await supabase
      .from('gifts')
      .select('*, photos(count)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    setGifts(giftsData || [])
    setLoading(false)
  }

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/g/${slug}`
    navigator.clipboard.writeText(url)
    toast.success('Link disalin!')
  }

  const deleteGift = async (id: string) => {
    if (!confirm('Yakin mau hapus kado ini?')) return

    const { error } = await supabase
      .from('gifts')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Gagal menghapus kado')
    } else {
      setGifts(gifts.filter(g => g.id !== id))
      toast.success('Kado berhasil dihapus')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-romantic-500"></div>
      </div>
    )
  }

  const stats = {
    totalGifts: gifts.length,
    totalViews: gifts.reduce((sum, g) => sum + (g.views_count || 0), 0),
    recentGifts: gifts.slice(0, 3),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Halo, {user?.user_metadata?.full_name || 'User'} 👋
          </h1>
          <p className="text-gray-600">
            Kelola semua kado digitalmu di satu tempat
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Kado</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalGifts}</p>
              </div>
              <Gift className="h-12 w-12 text-romantic-100" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-romantic-100" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Link href="/create">
              <div className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm text-gray-500">Buat Kado Baru</p>
                  <p className="text-lg font-bold text-romantic-600">Klik di sini</p>
                </div>
                <Plus className="h-12 w-12 text-romantic-100" />
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Kado Saya</h2>
          <Link href="/create">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Buat Kado Baru
            </Button>
          </Link>
        </div>

        {/* Gifts List */}
        {gifts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Belum ada kado
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Mulai buat kado digital pertama Anda untuk orang tersayang
            </p>
            <Link href="/create">
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                Buat Kado Pertama
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {gifts.map((gift) => (
              <div
                key={gift.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Untuk {gift.recipient_name}
                    </h3>
                    <p className="text-gray-600">
                      Dari {gift.sender_name} • {new Date(gift.event_date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    gift.theme === 'romantic' 
                      ? 'bg-pink-100 text-pink-800' 
                      : gift.theme === 'playful'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {gift.theme}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 line-clamp-2">
                    {gift.story || 'Tidak ada cerita'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {gift.views_count || 0} views
                    </span>
                    <span className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-1" />
                      {gift.photos?.[0]?.count || 0} foto
                    </span>
                  </div>
                  <span>
                    Dibuat {new Date(gift.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Eye className="h-4 w-4" />}
                    onClick={() => window.open(`/g/${gift.slug}`, '_blank')}
                  >
                    Lihat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Copy className="h-4 w-4" />}
                    onClick={() => copyLink(gift.slug)}
                  >
                    Salin Link
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit className="h-4 w-4" />}
                    onClick={() => router.push(`/dashboard/edit/${gift.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Trash2 className="h-4 w-4" />}
                    onClick={() => deleteGift(gift.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade Banner */}
        {!user?.user_metadata?.is_premium && (
          <div className="mt-8 bg-gradient-to-r from-romantic-500 to-pink-500 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">
                  Upgrade ke Premium! 🎉
                </h3>
                <p className="opacity-90">
                  Dapatkan akses ke semua template, hapus watermark, dan fitur eksklusif lainnya
                </p>
              </div>
              <Link href="/pricing">
                <Button className="bg-white text-romantic-600 hover:bg-gray-100">
                  Lihat Pricing
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
