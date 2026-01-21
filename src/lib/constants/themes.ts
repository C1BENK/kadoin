export const THEMES = [
  {
    id: 'romantic',
    name: 'Romantic',
    description: 'Tema romantis dengan warna pastel dan hati',
    color: 'bg-gradient-to-br from-pink-100 to-rose-100',
    icon: '💝',
    features: ['Background bunga', 'Animasi hati', 'Warna pastel']
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Tema minimalis dan elegan',
    color: 'bg-gradient-to-br from-gray-50 to-gray-100',
    icon: '🎁',
    features: ['Clean layout', 'Focus pada konten', 'Elegan']
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Tema ceria dengan animasi',
    color: 'bg-gradient-to-br from-amber-50 to-yellow-100',
    icon: '🎉',
    features: ['Animasi konfeti', 'Warna cerah', 'Fun vibe']
  }
] as const
