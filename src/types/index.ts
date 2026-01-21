export type ThemeType = 'romantic' | 'simple' | 'playful'
export type MusicSource = 'spotify' | 'youtube' | 'upload' | null

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  is_premium: boolean
  premium_until: string | null
  gift_count: number
}

export interface Gift {
  id: string
  user_id: string
  recipient_name: string
  sender_name: string
  story: string | null
  event_date: string
  theme: ThemeType
  slug: string
  music_url: string | null
  music_source: MusicSource
  is_public: boolean
  has_watermark: boolean
  views_count: number
  is_active: boolean
  created_at: string
  updated_at: string
  photos?: Photo[]
}

export interface Photo {
  id: string
  gift_id: string
  url: string
  caption: string | null
  display_order: number
}

export interface GiftFormData {
  recipient_name: string
  sender_name: string
  story: string
  event_date: string
  theme: ThemeType
  photos: File[]
  music_url?: string
  music_source?: MusicSource
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
