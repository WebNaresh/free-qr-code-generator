import QRCodeGenerator from "@/components/QRCodeGenerator"
import FeedbackForm from "@/components/FeedbackForm"
import { TopBannerAd, ContentAd, ResponsiveAd } from "@/components/AdSense"
import TrustIndicators from "@/components/TrustIndicators"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center py-8 sm:py-12 lg:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-blue-900 leading-tight">
            Free QR Code Generator
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Instantly create custom QR codes for your business, website, Google reviews, and more. No signup required. 100% free and easy to use!
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              ✓ No Watermark
            </span>
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              ∞ Unlimited Scans
            </span>
            <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              📱 High-Resolution
            </span>
          </div>
        </section>

        {/* What is Free QR Code Generator? */}
        <section className="mb-12 sm:mb-16 lg:mb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-blue-800">
              What is Free QR Code Generator?
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-white/20">
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Free QR Code Generator is a simple, powerful tool that lets you create high-quality QR codes for any purpose. Whether you're a business owner, marketer, teacher, or just need a QR code for personal use, our platform is designed for you. We focus on privacy, ease of use, and customization—so you can generate QR codes that match your brand and needs, instantly and for free.
              </p>
            </div>
          </div>
        </section>

        {/* QR Code Generator */}
        <section id="qr-generator" className="mb-12 sm:mb-16 lg:mb-20">
          <QRCodeGenerator />
        </section>

        {/* Feedback Form */}
        <section id="feedback" className="mb-12 sm:mb-16 lg:mb-20 px-4">
          <FeedbackForm />
        </section>

        {/* How It Works */}
        <section className="mb-12 sm:mb-16 lg:mb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-blue-800 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-800 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Enter Content</h3>
                <p className="text-gray-600 text-sm">Add your URL, text, or contact info</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-800 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Customize</h3>
                <p className="text-gray-600 text-sm">Choose colors, size, and add your logo</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-800 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Preview</h3>
                <p className="text-gray-600 text-sm">See your QR code instantly</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-800 font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Download</h3>
                <p className="text-gray-600 text-sm">Get high-resolution QR code for free</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12 sm:mb-16 lg:mb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-blue-800 text-center">
              Why Use Our QR Code Generator?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Completely Free</h3>
                    <p className="text-gray-600 text-sm">No hidden fees, no watermarks, and no registration required.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">∞</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Unlimited Usage</h3>
                    <p className="text-gray-600 text-sm">Generate as many QR codes as you need.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-xl">🎨</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Customizable</h3>
                    <p className="text-gray-600 text-sm">Personalize your QR codes with colors and logos.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 text-xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Secure & Private</h3>
                    <p className="text-gray-600 text-sm">We never store your data or generated codes.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Mobile Friendly</h3>
                    <p className="text-gray-600 text-sm">Works perfectly on any device.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Instant Results</h3>
                    <p className="text-gray-600 text-sm">Generate and download QR codes in seconds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Banner Advertisement */}
        <section className="mb-12">
          <TopBannerAd />
        </section>

        {/* Popular Use Cases */}
        <section className="mb-12 sm:mb-16 lg:mb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-blue-800 text-center">
              Popular Use Cases
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-blue-600 text-2xl">💼</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Business Cards</h3>
                </div>
                <p className="text-gray-600">Add a QR code to your business card for instant contact sharing.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-green-600 text-2xl">⭐</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Google Reviews</h3>
                </div>
                <p className="text-gray-600">Link customers directly to your Google review page to boost ratings.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-purple-600 text-2xl">🎫</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Event Tickets</h3>
                </div>
                <p className="text-gray-600">Generate QR codes for event entry, tickets, or RSVPs.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-orange-600 text-2xl">📶</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">WiFi Sharing</h3>
                </div>
                <p className="text-gray-600">Let guests connect to your WiFi easily with a QR code.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-red-600 text-2xl">📦</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Product Packaging</h3>
                </div>
                <p className="text-gray-600">Share product info, manuals, or promotions via QR codes on packaging.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-indigo-600 text-2xl">🌐</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Website Links</h3>
                </div>
                <p className="text-gray-600">Direct users to your website, social media, or landing pages.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Advertisement */}
        <section className="mb-12">
          <ContentAd />
        </section>

        {/* Trust & Support */}
        <section className="mb-12 sm:mb-16 lg:mb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-lg border border-white/20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-blue-800">
                Trusted by Thousands
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                Join thousands of users who trust Free QR Code Generator for their business and personal needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
                <p className="text-gray-600">Need help?</p>
                <div className="flex gap-4">
                  <a
                    href="/faq"
                    className="bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-200"
                  >
                    FAQ
                  </a>
                  <a
                    href="/contact"
                    className="bg-green-100 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-200 transition-colors duration-200"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 sm:py-16 lg:py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Ready to create your free QR code?
              </h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
                No registration required. Start generating now!
              </p>
              <a
                href="#qr-generator"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Get Started Free
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Trust Indicators */}
      <TrustIndicators />
    </main>
  )
}
