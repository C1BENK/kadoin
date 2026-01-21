export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          is_premium: boolean
          premium_until: string | null
          gift_count: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      gifts: {
        Row: {
          id: string
          user_id: string
          recipient_name: string
          sender_name: string
          story: string | null
          event_date: string
          theme: 'romantic' | 'simple' | 'playful'
          slug: string
          music_url: string | null
          music_source: 'spotify' | 'youtube' | 'upload' | null
          is_public: boolean
          has_watermark: boolean
          views_count: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['gifts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['gifts']['Insert']>
      }
      photos: {
        Row: {
          id: string
          gift_id: string
          url: string
          caption: string | null
          display_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['photos']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['photos']['Insert']>
      }
    }
  }
}
