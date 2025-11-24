import { Metadata } from 'next'
import Link from 'next/link'
import { TopBannerAd, ContentAd, BottomBannerAd } from '@/components/AdSense'

export const metadata: Metadata = {
  title: 'Restaurant QR Code Menu Generator | Free Digital Menu QR Codes',
  description: 'Create contactless digital menu QR codes for your restaurant. Free QR code generator for restaurant menus, ordering systems, and customer feedback.',
  keywords: 'restaurant QR code, digital menu QR code, contactless menu, restaurant menu generator, QR menu maker',
}

export default function RestaurantQRCodes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Restaurant QR Code Menu Generator</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create professional contactless digital menus for your restaurant. Boost customer safety, reduce printing costs, and update menus instantly.
        </p>
      </div>

      {/* Ad Space - Top Banner */}
      <TopBannerAd />

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Why Use QR Code Menus?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-2xl">🦠</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Contactless & Safe</h3>
            <p className="text-gray-600">Eliminate physical menu handling and reduce contamination risks for customers and staff.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Cost Effective</h3>
            <p className="text-gray-600">Save money on printing costs and reduce waste with digital menus that update instantly.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Instant Updates</h3>
            <p className="text-gray-600">Change prices, add specials, or update availability in real-time without reprinting.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-orange-600 text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Mobile Friendly</h3>
            <p className="text-gray-600">Optimized for all devices - smartphones, tablets, and desktops for easy viewing.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-red-600 text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Analytics</h3>
            <p className="text-gray-600">Track menu views, popular items, and customer engagement with detailed analytics.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-indigo-600 text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Multi-Language</h3>
            <p className="text-gray-600">Serve international customers with multi-language menu support.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Create Menu</h3>
            <p className="text-gray-600 text-sm">Upload your menu or create a link to your online menu</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Generate QR</h3>
            <p className="text-gray-600 text-sm">Create a custom QR code with your restaurant branding</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Print & Display</h3>
            <p className="text-gray-600 text-sm">Print QR codes for tables, counters, or display stands</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">4</span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Customers Scan</h3>
            <p className="text-gray-600 text-sm">Customers scan and view your menu instantly on their phones</p>
          </div>
        </div>
      </section>

      {/* Ad Space - Middle Rectangle */}
      <ContentAd />

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Restaurant QR Code Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Customization Options</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Custom colors matching your restaurant brand
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Logo integration for brand recognition
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Multiple sizes for different display needs
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                High-resolution downloads for printing
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Advanced Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Menu update notifications
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Customer feedback collection
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Integration with ordering systems
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Allergen and dietary information display
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2 text-gray-900">Pizza Palace</h3>
            <p className="text-gray-600 text-sm mb-4">"Reduced menu printing costs by 80% and customers love the convenience!"</p>
            <div className="text-yellow-500">★★★★★</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2 text-gray-900">Café Central</h3>
            <p className="text-gray-600 text-sm mb-4">"Easy to update daily specials and seasonal items. Highly recommended!"</p>
            <div className="text-yellow-500">★★★★★</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2 text-gray-900">Bistro 21</h3>
            <p className="text-gray-600 text-sm mb-4">"Customers appreciate the contactless experience. Great for safety!"</p>
            <div className="text-yellow-500">★★★★★</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Go Digital?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of restaurants using QR code menus to enhance customer experience and reduce costs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/tools/restaurant-menu"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Create Menu QR Code
          </Link>
          <Link 
            href="/blog/restaurant-qr-code-menus-guide"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold border border-blue-600"
          >
            Read Complete Guide
          </Link>
        </div>
      </section>

      {/* Related Resources */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Related Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/blog/qr-codes-business-marketing-guide-2024" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">QR Code Marketing Guide</h3>
            <p className="text-gray-600 text-sm">Complete marketing strategies</p>
          </Link>
          <Link href="/tools/feedback-qr" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Customer Feedback QR</h3>
            <p className="text-gray-600 text-sm">Collect customer reviews</p>
          </Link>
          <Link href="/tools/wifi-qr" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">WiFi QR Codes</h3>
            <p className="text-gray-600 text-sm">Share WiFi credentials</p>
          </Link>
          <Link href="/resources" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">QR Code Resources</h3>
            <p className="text-gray-600 text-sm">Tools and guides</p>
          </Link>
        </div>
      </section>

      {/* Bottom Ad Space */}
      <BottomBannerAd />
    </div>
  )
}
