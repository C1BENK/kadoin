import * as React from 'react'
import Link from 'next/link'
import { Github, Instagram, Mail, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-romantic-500 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Kadoin.me</span>
            </div>
            <p className="text-gray-600 text-sm">
              Buat kado digital personal dalam 5 menit. Tanpa coding, tanpa desain, hasilnya niat banget!
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Produk</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/create" className="text-gray-600 hover:text-romantic-500">
                  Buat Kado
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-gray-600 hover:text-romantic-500">
                  Template
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-romantic-500">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-gray-600 hover:text-romantic-500">
                  Contoh Kado
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-romantic-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray-600 hover:text-romantic-500">
                  Panduan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-romantic-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-romantic-500">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hubungi Kami</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@kadoin.me"
                className="flex items-center space-x-2 text-gray-600 hover:text-romantic-500 text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>hello@kadoin.me</span>
              </a>
              <div className="flex space-x-3">
                <a
                  href="https://instagram.com/kadoin.me"
                  className="text-gray-400 hover:text-romantic-500"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/kadoin-me"
                  className="text-gray-400 hover:text-romantic-500"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Kadoin.me. Dibuat dengan ❤️ oleh c1benk untuk momen spesial.</p>
        </div>
      </div>
    </footer>
  )
}
