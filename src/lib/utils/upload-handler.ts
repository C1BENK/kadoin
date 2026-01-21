import { createClient } from '@/lib/supabase/client'

const MAX_FILE_SIZE = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '5242880')
const ALLOWED_TYPES = (process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(',')

export async function uploadFile(file: File, userId: string): Promise<string> {
  // Validate file
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`)
  }
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`File type not allowed. Allowed: ${ALLOWED_TYPES.join(', ')}`)
  }
  
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('gift-photos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('gift-photos')
    .getPublicUrl(data.path)
  
  return publicUrl
}

export async function uploadMultipleFiles(files: File[], userId: string): Promise<string[]> {
  const uploadPromises = files.map(file => uploadFile(file, userId))
  return Promise.all(uploadPromises)
}
