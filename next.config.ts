/** @type {import('next').NextConfig} */
const nextConfig = {
  // Untuk Netlify, kita perlu output: 'standalone' atau disable untuk static export
  output: 'standalone', // atau 'export' jika mau static
  
  // Environment variables yang akan digunakan di client
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  
  // Images domains
  images: {
    domains: ['https://papeqnnfklooytwtlncd.supabase.co'],
  },
}

module.exports = nextConfig
