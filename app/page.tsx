import QRCodeGenerator from "@/components/QRCodeGenerator"
import FeedbackForm from "@/components/FeedbackForm"
import { TopBannerAd, ContentAd } from "@/components/AdSense"
import TrustIndicators from "@/components/TrustIndicators"
import { Sparkles, Zap, Shield, Smartphone, Globe, Star, Wifi, Package, Ticket } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-purple-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-indigo-200/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section - Compact & Modern */}
        <section className="text-center py-12 lg:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-600">Next-Gen QR Code Builder</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-slate-900">
            Create <span className="text-gradient">Beautiful QR Codes</span>
            <br className="hidden sm:block" /> in Seconds
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The most advanced free QR code generator. Custom designs, AI-powered features, and unlimited scans.
          </p>
        </section>

        {/* Main Generator Section */}
        <section id="qr-generator" className="mb-16">
          <QRCodeGenerator />
        </section>

        {/* Features Grid - Compact */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Instant & Free</h3>
              <p className="text-slate-600 text-sm">Generate unlimited QR codes instantly without any hidden fees or sign-ups.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Secure & Private</h3>
              <p className="text-slate-600 text-sm">Your data is processed locally in your browser. We never store your information.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Mobile Optimized</h3>
              <p className="text-slate-600 text-sm">Generated codes are optimized for all scanning apps and mobile devices.</p>
            </div>
          </div>
        </section>

        {/* Use Cases - Horizontal Scroll on Mobile, Grid on Desktop */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">Popular Use Cases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe, label: "Website", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Star, label: "Reviews", color: "text-yellow-600", bg: "bg-yellow-50" },
              { icon: Wifi, label: "WiFi", color: "text-cyan-600", bg: "bg-cyan-50" },
              { icon: Package, label: "Product", color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center hover:scale-105 transition-transform cursor-pointer">
                <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center mb-3 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ads */}
        <div className="mb-16">
          <TopBannerAd />
        </div>

        {/* Feedback & Trust */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <section>
            <FeedbackForm />
          </section>
          <section className="flex flex-col justify-center">
            <div className="glass-panel p-8 rounded-2xl text-center">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">Trusted by Thousands</h2>
              <p className="text-slate-600 mb-6">
                Join thousands of users who trust our platform for their business needs.
              </p>
              <TrustIndicators />
            </div>
          </section>
        </div>

        {/* Comprehensive Educational Content */}
        <section className="mb-16">
          <div className="glass-panel p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Complete Guide to QR Codes</h2>
            
            {/* What is a QR Code */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">What is a QR Code?</h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                QR (Quick Response) codes are two-dimensional barcodes invented by Denso Wave in 1994. Originally designed 
                for tracking automotive parts, QR codes have evolved into a versatile tool for instant information sharing. 
                They can store up to 4,296 alphanumeric characters and are readable by smartphone cameras and dedicated QR scanners.
              </p>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Unlike traditional barcodes that store data in one dimension, QR codes use a matrix pattern to encode information 
                both horizontally and vertically. This allows them to store significantly more data while maintaining a compact size. 
                The three distinctive square patterns in the corners help scanners quickly identify and orient the code.
              </p>
            </div>

            {/* How QR Codes Work */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">How QR Codes Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h4 className="font-bold text-slate-800 mb-3">Encoding Process</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Data is converted into binary format</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Error correction codes are added (Reed-Solomon algorithm)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Pattern is arranged in a square grid</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Finder patterns (corners) and timing patterns are added</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h4 className="font-bold text-slate-800 mb-3">Scanning Process</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Camera captures QR code image</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Software identifies finder patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Image is processed and decoded</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Data is extracted and displayed/executed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Types of QR Codes */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Types of QR Codes</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-slate-800 mb-2">Static QR Codes</h4>
                  <p className="text-slate-700">
                    Data is permanently encoded into the QR code. Once generated, the information cannot be changed. 
                    Best for permanent content like product information, business cards, or URLs that won't change. 
                    These codes work forever without requiring any external service.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-bold text-slate-800 mb-2">Dynamic QR Codes</h4>
                  <p className="text-slate-700">
                    The QR code contains a short URL that redirects to the actual content. You can change the destination 
                    without regenerating the code. Ideal for marketing campaigns, tracking analytics, and content that needs 
                    regular updates. Requires a subscription service to maintain the redirect.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">QR Code Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-3">Size & Placement</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• Minimum size: 2cm x 2cm (0.8" x 0.8")</li>
                    <li>• Larger codes for distance scanning</li>
                    <li>• Place at eye level when possible</li>
                    <li>• Ensure good lighting conditions</li>
                    <li>• Avoid curved or reflective surfaces</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-5 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-3">Design Guidelines</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• Maintain high contrast (dark on light)</li>
                    <li>• Test with multiple devices</li>
                    <li>• Use error correction level H for logos</li>
                    <li>• Keep logos under 30% of code area</li>
                    <li>• Avoid excessive customization</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-5 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-3">Content Tips</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• Mobile-optimize landing pages</li>
                    <li>• Keep URLs short when possible</li>
                    <li>• Add clear call-to-action text</li>
                    <li>• Test in different lighting</li>
                    <li>• Provide alternative access method</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Industry Applications */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Industry Applications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">Retail & E-Commerce</h4>
                  <p className="text-slate-700 mb-3">
                    QR codes revolutionize shopping experiences by enabling contactless payments, product authentication, 
                    and instant access to detailed product information, reviews, and promotional offers.
                  </p>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Product details and specifications</li>
                    <li>• Customer reviews and ratings</li>
                    <li>• Mobile payment integration</li>
                    <li>• Loyalty program enrollment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">Healthcare</h4>
                  <p className="text-slate-700 mb-3">
                    Medical facilities use QR codes for patient identification, medication tracking, appointment scheduling, 
                    and accessing medical records securely while maintaining HIPAA compliance.
                  </p>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Patient wristband identification</li>
                    <li>• Medication administration tracking</li>
                    <li>• Lab results access</li>
                    <li>• Appointment confirmations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">Education</h4>
                  <p className="text-slate-700 mb-3">
                    Educational institutions leverage QR codes for attendance tracking, resource sharing, interactive 
                    learning materials, and seamless access to online course content.
                  </p>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Digital textbook access</li>
                    <li>• Attendance and check-in</li>
                    <li>• Assignment submission</li>
                    <li>• Campus navigation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">Hospitality & Tourism</h4>
                  <p className="text-slate-700 mb-3">
                    Hotels and tourist attractions enhance guest experiences with QR codes for check-in, digital menus, 
                    local guides, and contactless service requests.
                  </p>
                  <ul className="space-y-1 text-slate-600 text-sm">
                    <li>• Digital room keys and check-in</li>
                    <li>• Contactless menu ordering</li>
                    <li>• Tourist information and guides</li>
                    <li>• Feedback collection</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Is it really free?</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Yes, our QR code generator is 100% free for both personal and commercial use. There are no hidden fees, 
                    no watermarks, and no limitations on the number of QR codes you can create. We believe in providing 
                    accessible tools for everyone.
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Do the codes expire?</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    No, static QR codes generated here will work forever and never expire. Since the data is encoded directly 
                    into the image, they don't rely on any external service. As long as you have the image file, your QR code 
                    will continue to function.
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Can I add my logo?</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Absolutely! You can upload your custom logo and we'll intelligently embed it in the center of your QR code. 
                    Our system uses advanced error correction to ensure the code remains scannable even with logo overlay. 
                    We recommend keeping logos under 30% of the code area for optimal scanning.
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Is it high resolution?</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Yes, you can download high-quality PNG images at up to 3000x3000 pixels, suitable for professional printing 
                    on banners, business cards, posters, and more. We also offer PDF export for vector-quality output at any size.
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Are my QR codes private and secure?</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Yes, we prioritize your privacy. QR codes are generated locally in your browser when possible, and we never 
                    store your data or track your QR codes. Your information is yours alone, and we don't collect any personal data.
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">What devices can scan QR codes?</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Most modern smartphones (iPhone and Android) have built-in QR code scanning in their camera apps. Simply 
                    point your camera at the QR code and a notification will appear. Older devices may require a dedicated 
                    QR scanner app from their app store.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
