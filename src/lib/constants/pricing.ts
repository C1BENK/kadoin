export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    duration: 'Selamanya',
    features: [
      '1 template dasar',
      'Watermark di halaman',
      'Maksimal 5 foto',
      'Link aktif 30 hari',
      'Dasar analytics'
    ],
    cta: 'Mulai Gratis',
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 15000,
    duration: '30 hari',
    features: [
      'Semua 3 template',
      'Tanpa watermark',
      'Maksimal 20 foto',
      'Link permanen',
      'Upload musik custom',
      'Analytics lengkap',
      'Priority support'
    ],
    cta: 'Upgrade Sekarang',
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 30000,
    duration: '90 hari',
    features: [
      'Semua fitur Premium',
      'Template custom',
      'Unlimited foto',
      'Custom domain',
      'Advanced analytics',
      'Team collaboration',
      '24/7 support'
    ],
    cta: 'Go Pro',
    popular: false
  }
]
