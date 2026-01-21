'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { FileUpload } from '@/components/ui/FileUpload'
import { Select } from '@/components/ui/Select'
import { giftSchema, type GiftFormValues } from '@/lib/validations/gift-schema'
import { THEMES } from '@/lib/constants/themes'
import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/utils/slug-generator'
import { uploadMultipleFiles } from '@/lib/utils/upload-handler'
import { toast } from 'react-hot-toast'
import { ArrowLeft, ArrowRight, Heart, Sparkles, Image as ImageIcon } from 'lucide-react'

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [userId, setUserId] = React.useState<string | null>(null)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GiftFormValues>({
    resolver: zodResolver(giftSchema),
    defaultValues: {
      theme: 'simple',
      photos: [],
    },
  })

  // Check auth on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
      } else {
        // Optional: Redirect to login or allow guest creation
        // router.push('/auth/login')
      }
    }
    checkAuth()
  }, [supabase, router])

  const photos = watch('photos')
  const theme = watch('theme')

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const onSubmit = async (data: GiftFormValues) => {
    if (!userId) {
      toast.error('Silakan login terlebih dahulu')
      router.push('/auth/login')
      return
    }

    setLoading(true)
    const toastId = toast.loading('Membuat kado...')

    try {
      // Upload photos
      let photoUrls: string[] = []
      if (data.photos.length > 0) {
        photoUrls = await uploadMultipleFiles(data.photos, userId)
      }

      // Generate slug
      const slug = generateSlug(data.recipient_name, data.event_date)

      // Create gift in database
      const { data: gift, error: giftError } = await supabase
        .from('gifts')
        .insert({
          user_id: userId,
          recipient_name: data.recipient_name,
          sender_name: data.sender_name,
          story: data.story,
          event_date: data.event_date,
          theme: data.theme,
          slug: slug,
          music_url: data.music_url,
          music_source: data.music_source,
          is_public: true,
          has_watermark: true, // Default watermark for free tier
        })
        .select()
        .single()

      if (giftError) throw giftError

      // Create photo records
      if (photoUrls.length > 0) {
        const { error: photosError } = await supabase
          .from('photos')
          .insert(
            photoUrls.map((url, index) => ({
              gift_id: gift.id,
              url,
              display_order: index,
            }))
          )

        if (photosError) throw photosError
      }

      toast.success('Kado berhasil dibuat!', { id: toastId })
      router.push(`/dashboard?created=${slug}`)
    } catch (error) {
      console.error('Create gift error:', error)
      toast.error('Gagal membuat kado. Coba lagi.', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Info Dasar', icon: <Heart className="h-4 w-4" /> },
    { number: 2, title: 'Cerita & Foto', icon: <ImageIcon className="h-4 w-4" /> },
    { number: 3, title: 'Personalize', icon: <Sparkles className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step >= s.number
                        ? 'bg-romantic-500 border-romantic-500 text-white'
                        : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    {s.icon}
                  </div>
                  <span className="mt-2 text-sm font-medium">{s.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 ${
                      step > s.number ? 'bg-romantic-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Info Dasar Kado
                    </h2>
                    <p className="text-gray-600">
                      Isi informasi dasar tentang kado dan penerimanya
                    </p>
                  </div>

                  <Input
                    label="Nama Penerima"
                    placeholder="Masukkan nama teman/pasangan/keluarga"
                    {...register('recipient_name')}
                    error={errors.recipient_name?.message}
                    required
                  />

                  <Input
                    label="Nama Pengirim"
                    placeholder="Nama kamu"
                    {...register('sender_name')}
                    error={errors.sender_name?.message}
                    required
                  />

                  <Input
                    label="Tanggal Spesial"
                    type="date"
                    {...register('event_date')}
                    error={errors.event_date?.message}
                    required
                  />

                  <div className="pt-4">
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-full"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      Lanjut ke Cerita & Foto
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Story & Photos */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Cerita & Foto
                    </h2>
                    <p className="text-gray-600">
                      Ceritakan kenangan spesial dan upload foto-foto berharga
                    </p>
                  </div>

                  <Textarea
                    label="Cerita Spesial"
                    placeholder="Tuliskan cerita, harapan, atau pesan spesial untuk penerima..."
                    rows={6}
                    maxLength={5000}
                    {...register('story')}
                    error={errors.story?.message}
                    helperText="Cerita ini akan ditampilkan di halaman kado"
                    required
                  />

                  <FileUpload
                    files={photos}
                    onFilesChange={(files) => setValue('photos', files)}
                    maxFiles={10}
                    label="Upload Foto"
                    error={errors.photos?.message}
                  />

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      leftIcon={<ArrowLeft className="h-4 w-4" />}
                      className="flex-1"
                    >
                      Kembali
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex-1"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      Lanjut ke Personalize
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Personalize */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Personalize Kado
                    </h2>
                    <p className="text-gray-600">
                      Pilih tema dan tambahkan musik untuk membuatnya lebih spesial
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Pilih Tema
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {THEMES.map((t) => (
                        <div
                          key={t.id}
                          className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                            theme === t.id
                              ? 'border-romantic-500 bg-romantic-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setValue('theme', t.id as any)}
                        >
                          <div className={`${t.color} h-32 rounded-lg mb-3`}></div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center">
                                <span className="text-xl mr-2">{t.icon}</span>
                                <span className="font-medium text-gray-900">
                                  {t.name}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {t.description}
                              </p>
                            </div>
                            {theme === t.id && (
                              <div className="h-5 w-5 rounded-full bg-romantic-500 flex items-center justify-center">
                                <Heart className="h-3 w-3 text-white" fill="white" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.theme && (
                      <p className="text-sm text-red-600 mt-1">{errors.theme.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Link Musik (Opsional)"
                      placeholder="https://open.spotify.com/track/..."
                      {...register('music_url')}
                      error={errors.music_url?.message}
                      helperText="Masukkan link Spotify, YouTube, atau upload file musik"
                    />
                    
                    <Select
                      label="Sumber Musik"
                      options={[
                        { value: 'spotify', label: 'Spotify' },
                        { value: 'youtube', label: 'YouTube' },
                        { value: 'upload', label: 'Upload File' },
                      ]}
                      {...register('music_source')}
                      error={errors.music_source?.message}
                    />
                  </div>

                  <div className="bg-romantic-50 rounded-xl p-4">
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 text-romantic-600 mr-2" />
                      <span className="font-medium text-romantic-700">
                        Preview Cepat
                      </span>
                    </div>
                    <p className="text-sm text-romantic-600 mt-1">
                      Kado akan tampil dengan tema {THEMES.find(t => t.id === theme)?.name}, 
                      {photos.length > 0 ? ` ${photos.length} foto` : ' tanpa foto'}, 
                      {watch('music_url') ? ' dengan musik' : ' tanpa musik'}.
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      leftIcon={<ArrowLeft className="h-4 w-4" />}
                      className="flex-1"
                    >
                      Kembali
                    </Button>
                    <Button
                      type="submit"
                      loading={loading}
                      className="flex-1"
                    >
                      {loading ? 'Membuat Kado...' : 'Buat Kado Sekarang!'}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Dengan membuat kado, kamu setuju dengan{' '}
              <a href="/terms" className="text-romantic-600 hover:underline">
                Terms of Service
              </a>{' '}
              dan{' '}
              <a href="/privacy" className="text-romantic-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
