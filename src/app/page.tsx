import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, Gift, Sparkles, Clock, Users, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-romantic-100 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-romantic-600 mr-2" />
              <span className="text-sm font-medium text-romantic-700">
                #1 Platform Kado Digital di Indonesia
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Buat Kado Digital
              <span className="block text-romantic-500">Personal dalam 5 Menit</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ga bisa nulis? Ga jago desain? Waktu mepet? Tenang! Isi form → jadi website kado personal → share link. Hasilnya keliatan niat parah! 🎁
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create">
                <Button size="lg" className="text-lg px-8">
                  Buat Kado Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline" size="lg" className="text-lg">
                  Lihat Contoh
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-romantic-600">5+</div>
                <div className="text-gray-600">Template</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-romantic-600">10K+</div>
                <div className="text-gray-600">Kado Dibuat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-romantic-600">99%</div>
                <div className="text-gray-600">Kepuasan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-romantic-600">5m</div>
                <div className="text-gray-600">Waktu Buat</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cuma 3 Langkah Mudah
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dari ide sampai kado siap dikirim, semua bisa dalam 5 menit!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-romantic-100 rounded-full mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Isi Form</h3>
              <p className="text-gray-600">
                Masukkan nama, cerita, dan upload foto. Ga perlu skill teknis!
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-romantic-100 rounded-full mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pilih Template</h3>
              <p className="text-gray-600">
                Pilih dari 3 template cantik: Romantic, Simple, atau Playful.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-romantic-100 rounded-full mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Link</h3>
              <p className="text-gray-600">
                Dapatkan link unik, share ke WA/IG. Penerima langsung bisa buka!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kenapa Pilih Kadoin.me?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gabungkan kemudahan dengan hasil yang personal dan berkesan
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <Clock className="h-8 w-8 text-romantic-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Cepat & Mudah</h3>
              <p className="text-gray-600">
                Buat dalam 5 menit tanpa perlu skill desain atau coding.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <Gift className="h-8 w-8 text-romantic-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Personal Banget</h3>
              <p className="text-gray-600">
                Custom nama, cerita, foto, dan musik. Bikin kado yang meaningful.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <Users className="h-8 w-8 text-romantic-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Untuk Semua Momen</h3>
              <p className="text-gray-600">
                Ultah, anniversary, wisuda, valentine, atau sekedar surprise.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-romantic-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Bikin Kado Spesial?
          </h2>
          <p className="text-romantic-100 mb-8 max-w-2xl mx-auto">
            Jangan cuma mikir, langsung action! Bikin kado digital yang bakal bikin dia senyum sepanjang hari.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-romantic-600 hover:bg-gray-100 text-lg px-8">
              Mulai Sekarang Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
