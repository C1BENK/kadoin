'use client'

import * as React from 'react'
import { Gift } from '@/types'
import { TemplateWrapper } from './TemplateWrapper'
import { Calendar, User, Music, PartyPopper, Sparkles, Confetti } from 'lucide-react'
import { formatDate, getCountdown } from '@/lib/utils/date-formatter'

interface PlayfulTemplateProps {
  gift: Gift
}

export function PlayfulTemplate({ gift }: PlayfulTemplateProps) {
  const countdown = getCountdown(gift.event_date)
  const [confetti, setConfetti] = React.useState(false)

  React.useEffect(() => {
    // Trigger confetti every 10 seconds if countdown is active
    if (!countdown.isPast) {
      const interval = setInterval(() => {
        setConfetti(true)
        setTimeout(() => setConfetti(false), 2000)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [countdown.isPast])

  return (
    <TemplateWrapper gift={gift}>
      {/* Confetti Effect */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-500 animate-bounce"
              style={{
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                animationDelay: `${i * 0.1}s`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 animate-bounce">
            <PartyPopper className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-pulse">
            🎊 HOREEE UNTUK {gift.recipient_name.toUpperCase()}! 🎊
          </h1>
          <p className="text-xl text-gray-600">
            Dari si paling keren: <span className="font-bold text-orange-600">{gift.sender_name}</span>
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl border-4 border-yellow-200 transform hover:scale-[1.01] transition-transform">
          <div className="flex items-center mb-6">
            <Sparkles className="h-8 w-8 text-yellow-500 mr-3 animate-spin-slow" />
            <h2 className="text-3xl font-bold text-gray-900">Pesan Gokil!</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 whitespace-pre-line leading-relaxed text-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl">
              ✨ {gift.story} ✨
            </div>
          </div>
        </div>

        {/* Countdown & Event Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-orange-200">
            <div className="flex items-center mb-4">
              <Calendar className="h-7 w-7 text-orange-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">COUNTDOWN MODE: ON!</h3>
            </div>
            {countdown.isPast ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎉🎂🎁</div>
                <p className="text-2xl font-bold text-orange-600">WAKTUNYA CELEBRATE!</p>
                <p className="text-gray-600 mt-2">Party time, baby!</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold text-orange-600">{countdown.days}</div>
                  <div className="text-sm text-orange-500 mt-1 font-medium">HARI</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold text-orange-600">{countdown.hours}</div>
                  <div className="text-sm text-orange-500 mt-1 font-medium">JAM</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold text-orange-600">{countdown.minutes}</div>
                  <div className="text-sm text-orange-500 mt-1 font-medium">MENIT</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold text-orange-600">{countdown.seconds}</div>
                  <div className="text-sm text-orange-500 mt-1 font-medium">DETIK</div>
                </div>
              </div>
            )}
            <div className="text-center mt-6">
              <button
                onClick={() => setConfetti(true)}
                className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105"
              >
                🎉 KUY CONFETTI! 🎉
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
            <div className="flex items-center mb-4">
              <User className="h-7 w-7 text-yellow-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">CAST OF CHARACTERS</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">THE STAR OF THE SHOW</p>
                <p className="text-2xl font-bold text-gray-900">{gift.recipient_name}</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">THE MASTERMIND</p>
                <p className="text-2xl font-bold text-gray-900">{gift.sender_name}</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">THE MAIN EVENT</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatDate(gift.event_date, 'dddd, DD MMMM YYYY')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Music Player */}
        {gift.music_url && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 mb-8 shadow-xl border-4 border-yellow-300">
            <div className="flex items-center mb-4">
              <Music className="h-8 w-8 text-orange-600 mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-900">DJ MODE: ON! 🎵</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-4 flex items-center justify-center animate-spin-slow">
                <Music className="h-12 w-12 text-white" />
              </div>
              <audio
                src={gift.music_url}
                controls
                className="w-full max-w-lg rounded-full"
              />
              <p className="text-sm text-gray-600 mt-3">Putarlah dan goyangkan badan! 🕺</p>
            </div>
          </div>
        )}

        {/* Photo Gallery */}
        {gift.photos && gift.photos.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8 shadow-xl border-4 border-yellow-300">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <Confetti className="h-8 w-8 text-orange-500 mr-3" />
              MEMORY LANE 🏞️
              <Confetti className="h-8 w-8 text-orange-500 ml-3" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gift.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative overflow-hidden rounded-2xl border-4 border-white transform hover:scale-105 hover:rotate-2 transition-all duration-300"
                >
                  <img
                    src={photo.url}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center">
                      <span className="text-white text-lg font-bold mr-2">#{index + 1}</span>
                      {photo.caption && (
                        <p className="text-white text-sm truncate">{photo.caption}</p>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    📸
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fun Facts */}
        <div className="mt-12 bg-gradient-to-r from-orange-100 to-pink-100 rounded-3xl p-8 border-4 border-pink-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            FUN FACTS 🎯
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🕒</div>
              <p className="font-bold text-gray-900">Dibuat dalam</p>
              <p className="text-orange-600 font-bold">5 MENIT!</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">❤️</div>
              <p className="font-bold text-gray-900">Tingkat Keniatan</p>
              <p className="text-orange-600 font-bold">1000%</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🎁</div>
              <p className="font-bold text-gray-900">Special Power</p>
              <p className="text-orange-600 font-bold">Bikin Senyum</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t-4 border-dashed border-yellow-300">
          <p className="text-gray-600 text-lg">
            Kado digital ini dibuat dengan{' '}
            <span className="text-orange-500 font-bold">💥 MAXIMUM FUN 💥</span> menggunakan{' '}
            <a 
              href="https://kadoin.me" 
              className="text-orange-600 font-bold hover:text-orange-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kadoin.me
            </a>
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-2xl">
            <span>🎈</span>
            <span>🎊</span>
            <span>🎉</span>
            <span>🥳</span>
            <span>🎁</span>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </TemplateWrapper>
  )
}
