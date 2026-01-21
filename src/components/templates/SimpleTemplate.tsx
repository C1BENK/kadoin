'use client'

import * as React from 'react'
import { Gift } from '@/types'
import { TemplateWrapper } from './TemplateWrapper'
import { Calendar, User, Music, Camera } from 'lucide-react'
import { formatDate, getCountdown } from '@/lib/utils/date-formatter'

interface SimpleTemplateProps {
  gift: Gift
}

export function SimpleTemplate({ gift }: SimpleTemplateProps) {
  const countdown = getCountdown(gift.event_date)

  return (
    <TemplateWrapper gift={gift}>
      <div className="max-w-2xl mx-auto">
        {/* Hero */}
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">🎁</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Untuk {gift.recipient_name}
          </h1>
          <p className="text-lg text-gray-600">
            Dari {gift.sender_name}
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-700">{formatDate(gift.event_date)}</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            {countdown.isPast ? 'Acara Telah Berlalu' : 'Menuju Hari Spesial'}
          </h2>
          {!countdown.isPast && (
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{countdown.days}</div>
                <div className="text-sm text-gray-500">Hari</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{countdown.hours}</div>
                <div className="text-sm text-gray-500">Jam</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{countdown.minutes}</div>
                <div className="text-sm text-gray-500">Menit</div>
              </div>
            </div>
          )}
        </div>

        {/* Story */}
        <div className="bg-white rounded-xl p-8 mb-6 shadow-sm">
          <div className="prose prose-gray max-w-none">
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {gift.story}
            </div>
          </div>
        </div>

        {/* Music */}
        {gift.music_url && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Music className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-900">Lagu Spesial</h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-gray-400" />
              </div>
              <audio src={gift.music_url} controls className="flex-1" />
            </div>
          </div>
        )}

        {/* Photos */}
        {gift.photos && gift.photos.length > 0 && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Camera className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-900">Galeri Foto</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gift.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                >
                  <img
                    src={photo.url}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <User className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Penerima</span>
            </div>
            <p className="font-medium text-gray-900">{gift.recipient_name}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <User className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Pengirim</span>
            </div>
            <p className="font-medium text-gray-900">{gift.sender_name}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Dibuat dengan Kadoin.me • {formatDate(gift.created_at, 'DD MMM YYYY')}
          </p>
        </div>
      </div>
    </TemplateWrapper>
  )
}
