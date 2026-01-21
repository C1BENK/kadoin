'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function incrementViewCount(giftId: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  await supabase.rpc('increment_views', { gift_id: giftId })
  
  revalidatePath(`/g/[slug]`, 'page')
}
