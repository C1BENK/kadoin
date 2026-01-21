import * as React from 'react'

export function Watermark() {
  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
        <div className="text-xs text-gray-500">
          Made with <span className="text-red-500">❤️</span> by{' '}
          <a 
            href="https://kadoin.me" 
            className="text-romantic-600 font-medium hover:text-romantic-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kadoin.me
          </a>
        </div>
      </div>
    </div>
  )
}
