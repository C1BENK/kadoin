import { z } from 'zod'

export const giftSchema = z.object({
  recipient_name: z.string()
    .min(2, 'Nama penerima minimal 2 karakter')
    .max(100, 'Nama penerima maksimal 100 karakter'),
  
  sender_name: z.string()
    .min(2, 'Nama pengirim minimal 2 karakter')
    .max(100, 'Nama pengirim maksimal 100 karakter'),
  
  story: z.string()
    .min(10, 'Cerita minimal 10 karakter')
    .max(5000, 'Cerita maksimal 5000 karakter'),
  
  event_date: z.string()
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'Tanggal harus hari ini atau masa depan'),
  
  theme: z.enum(['romantic', 'simple', 'playful']),
  
  music_url: z.string().url('URL tidak valid').optional().or(z.literal('')),
  
  music_source: z.enum(['spotify', 'youtube', 'upload']).optional().nullable(),
  
  photos: z.array(z.instanceof(File))
    .min(1, 'Minimal upload 1 foto')
    .max(10, 'Maksimal 10 foto'),
})

export const giftUpdateSchema = giftSchema.partial()

export type GiftFormValues = z.infer<typeof giftSchema>
