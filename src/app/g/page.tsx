import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { RomanticTemplate } from '@/components/templates/RomanticTemplate'
import { SimpleTemplate } from '@/components/templates/SimpleTemplate'
import { PlayfulTemplate } from '@/components/templates/PlayfulTemplate'
import { incrementViewCount } from './actions'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function GiftPage({ params }: PageProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  // Fetch gift data
  const { data: gift, error } = await supabase
    .from('gifts')
    .select(`
      *,
      photos (*)
    `)
    .eq('slug', params.slug)
    .eq('is_public', true)
    .eq('is_active', true)
    .single()

  if (error || !gift) {
    notFound()
  }

  // Increment view count
  await incrementViewCount(gift.id)

  // Get theme template
  const templates = {
    romantic: RomanticTemplate,
    simple: SimpleTemplate,
    playful: PlayfulTemplate,
  }

  const TemplateComponent = templates[gift.theme]

  return <TemplateComponent gift={gift} />
}

export async function generateMetadata({ params }: PageProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data: gift } = await supabase
    .from('gifts')
    .select('recipient_name, sender_name, story')
    .eq('slug', params.slug)
    .single()

  if (!gift) {
    return {
      title: 'Kado Tidak Ditemukan',
    }
  }

  return {
    title: `Kado untuk ${gift.recipient_name} dari ${gift.sender_name}`,
    description: gift.story?.substring(0, 150) || 'Kado digital spesial',
    openGraph: {
      title: `Kado untuk ${gift.recipient_name}`,
      description: gift.story?.substring(0, 150) || 'Kado digital spesial',
      type: 'website',
    },
  }
}
