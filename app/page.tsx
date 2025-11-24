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

        {/* SEO Content - Collapsible or Compact */}
        <section className="mb-16">
          <div className="glass-panel p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Is it really free?</h3>
                <p className="text-slate-600 text-sm">Yes, our QR code generator is 100% free for both personal and commercial use.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Do the codes expire?</h3>
                <p className="text-slate-600 text-sm">No, the static QR codes generated here will work forever and never expire.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Can I add my logo?</h3>
                <p className="text-slate-600 text-sm">Absolutely! You can upload your custom logo and we'll embed it in the QR code.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Is it high resolution?</h3>
                <p className="text-slate-600 text-sm">Yes, you can download high-quality PNG images suitable for printing.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
