'use client'

import * as React from 'react'
import { Gift } from '@/types'
import { TemplateWrapper } from './TemplateWrapper'
import { Heart, Calendar, User, Music } from 'lucide-react'
import { formatDate, getCountdown } from '@/lib/utils/date-formatter'

interface RomanticTemplateProps {
  gift: Gift
}

export function RomanticTemplate({ gift }: RomanticTemplateProps) {
  const countdown = getCountdown(gift.event_date)
  const [hearts, setHearts] = React.useState<Array<{ x: number; y: number }>>([])

  React.useEffect(() => {
    // Create floating hearts
    const newHearts = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <TemplateWrapper gift={gift}>
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none">
        {hearts.map((heart, i) => (
          <Heart
            key={i}
            className="absolute text-pink-200 animate-float"
            style={{
              left: `${heart.x}vw`,
              top: `${heart.y}vh`,
              animationDelay: `${i * 0.5}s`,
            }}
            size={24}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mb-6">
            <Heart className="h-12 w-12 text-white" fill="white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Untuk {gift.recipient_name} 💝
          </h1>
          <p className="text-xl text-gray-600">
            Dari {gift.sender_name}
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center mb-6">
            <Heart className="h-6 w-6 text-pink-500 mr-2" fill="currentColor" />
            <h2 className="text-2xl font-bold text-gray-900">Pesan Khusus</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {gift.story}
            </p>
          </div>
        </div>

        {/* Countdown & Event Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-pink-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Countdown</h3>
            </div>
            {countdown.isPast ? (
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-pink-500 mb-2">🎉</p>
                <p className="text-gray-700">Momen spesial ini telah tiba!</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-pink-100 rounded-xl p-4">
                  <div className="text-3xl font-bold text-pink-600">{countdown.days}</div>
                  <div className="text-sm text-pink-500 mt-1">Hari</div>
                </div>
                <div className="bg-pink-100 rounded-xl p-4">
                  <div className="text-3xl font-bold text-pink-600">{countdown.hours}</div>
                  <div className="text-sm text-pink-500 mt-1">Jam</div>
                </div>
                <div className="bg-pink-100 rounded-xl p-4">
                  <div className="text-3xl font-bold text-pink-600">{countdown.minutes}</div>
                  <div className="text-sm text-pink-500 mt-1">Menit</div>
                </div>
                <div className="bg-pink-100 rounded-xl p-4">
                  <div className="text-3xl font-bold text-pink-600">{countdown.seconds}</div>
                  <div className="text-sm text-pink-500 mt-1">Detik</div>
                </div>
              </div>
            )}
            <p className="text-center mt-4 text-gray-600">
              {formatDate(gift.event_date, 'dddd, DD MMMM YYYY')}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-pink-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Info Acara</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Untuk</p>
                <p className="text-lg font-semibold text-gray-900">{gift.recipient_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dari</p>
                <p className="text-lg font-semibold text-gray-900">{gift.sender_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(gift.event_date)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Music Player */}
        {gift.music_url && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center mb-4">
              <Music className="h-6 w-6 text-pink-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Lagu Spesial</h3>
            </div>
            <div className="flex items-center justify-center">
              <audio
                src={gift.music_url}
                controls
                className="w-full max-w-md"
              />
            </div>
          </div>
        )}

        {/* Photo Gallery */}
        {gift.photos && gift.photos.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Kenangan Bersama 💖
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gift.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative overflow-hidden rounded-xl aspect-square"
                >
                  <img
                    src={photo.url}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white text-sm">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-pink-200">
          <p className="text-gray-600">
            Kado digital ini dibuat dengan ❤️ menggunakan{' '}
            <a href="https://kadoin.me" className="text-pink-500 hover:text-pink-600">
              Kadoin.me
            </a>
          </p>
        </div>
      </div>
    </TemplateWrapper>
  )
}
