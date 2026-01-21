import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { giftSchema } from '@/lib/validations/gift-schema'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validated = giftSchema.parse(body)
    
    // TODO: Handle file uploads
    // TODO: Generate slug
    // TODO: Create gift in database
    
    return NextResponse.json(
      { message: 'Gift created successfully', data: {} },
      { status: 201 }
    )
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    if (slug) {
      // Get single gift
      const { data: gift, error } = await supabase
        .from('gifts')
        .select('*, photos(*)')
        .eq('slug', slug)
        .eq('is_public', true)
        .single()

      if (error) {
        return NextResponse.json(
          { error: 'Gift not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ data: gift })
    } else {
      // Get gifts list (with pagination)
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '10')
      const offset = (page - 1) * limit

      const { data: gifts, error } = await supabase
        .from('gifts')
        .select('*')
        .eq('is_public', true)
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false })

      if (error) throw error

      return NextResponse.json({ data: gifts })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
