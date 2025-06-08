import QRCodeGenerator from "@/components/QRCodeGenerator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="text-center py-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-900">Free QR Code Generator</h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Instantly create custom QR codes for your business, website, Google reviews, and more. No signup required. 100% free and easy to use!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">No Watermark</span>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">Unlimited Scans</span>
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">High-Resolution</span>
          </div>
        </section>

        {/* QR Code Generator */}
        <section className="mb-12">
          <QRCodeGenerator />
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Enter your content (URL, text, contact info, etc.).</li>
            <li>Customize the QR code's color, size, and style.</li>
            <li>Preview your QR code instantly.</li>
            <li>Download your QR code in high resolution for free.</li>
          </ol>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Why Choose Our QR Code Generator?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Completely Free:</strong> No hidden costs, no signups, no watermarks.</li>
            <li><strong>Customizable:</strong> Choose colors, shapes, and more to match your brand.</li>
            <li><strong>Secure & Private:</strong> We don't store your data or generated codes.</li>
            <li><strong>Mobile Friendly:</strong> Works perfectly on any device.</li>
            <li><strong>Unlimited Usage:</strong> Generate as many QR codes as you need.</li>
          </ul>
        </section>

        {/* Popular Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Popular Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Business Cards</h3>
              <p>Add a QR code to your business card for instant contact sharing.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Google Reviews</h3>
              <p>Link customers directly to your Google review page to boost ratings.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Event Tickets</h3>
              <p>Generate QR codes for event entry, tickets, or RSVPs.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">WiFi Sharing</h3>
              <p>Let guests connect to your WiFi easily with a QR code.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Product Packaging</h3>
              <p>Share product info, manuals, or promotions via QR codes on packaging.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Website Links</h3>
              <p>Direct users to your website, social media, or landing pages.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Ready to create your free QR code?</h2>
          <p className="mb-4 text-gray-700">No registration required. Start generating now!</p>
          <a href="#" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Get Started</a>
        </section>
      </div>
    </main>
  )
}
