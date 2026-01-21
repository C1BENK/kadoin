'use client'

import * as React from 'react'
import { Gift } from '@/types'
import { Watermark } from '@/components/shared/Watermark'
import { cn } from '@/lib/utils/cn'

interface TemplateWrapperProps {
  gift: Gift
  children: React.ReactNode
}

export function TemplateWrapper({ gift, children }: TemplateWrapperProps) {
  const themeClass = {
    romantic: 'bg-gradient-to-br from-romantic-50 to-pink-50',
    simple: 'bg-gradient-to-br from-simple-50 to-gray-50',
    playful: 'bg-gradient-to-br from-playful-50 to-yellow-50'
  }[gift.theme]

  return (
    <div className={cn('min-h-screen', themeClass)}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {children}
        {gift.has_watermark && <Watermark />}
      </div>
    </div>
  )
}
