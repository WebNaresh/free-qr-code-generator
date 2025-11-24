import { Metadata } from 'next'
import Link from 'next/link'
import { TopBannerAd, ContentAd, BottomBannerAd } from '@/components/AdSense'

export const metadata: Metadata = {
  title: 'Free QR Code Tools & Generators | QR Code Generator',
  description: 'Complete collection of free QR code tools including generators, scanners, analytics, and bulk creation tools. All tools are free to use.',
  keywords: 'QR code tools, QR code generator, QR code scanner, bulk QR codes, QR analytics, free QR tools',
}

const toolCategories = [
  {
    title: "QR Code Generators",
    description: "Create QR codes for different purposes",
    tools: [
      {
        name: "Business QR Code Generator",
        description: "Create professional QR codes for your business with logo integration",
        url: "/",
        features: ["Logo integration", "Custom colors", "High resolution"],
        popular: true,
        available: true
      },
      {
        name: "Google Reviews QR Generator",
        description: "Direct customers to your Google review page",
        url: "/?type=feedback",
        features: ["Google integration", "Star ratings", "Review optimization"],
        popular: true,
        available: true
      },
      {
        name: "WiFi QR Code Generator",
        description: "Share WiFi credentials instantly",
        url: "/tools/wifi-qr",
        features: ["WPA/WEP support", "Hidden networks", "Guest access"],
        popular: false,
        available: true
      },
      {
        name: "vCard QR Generator",
        description: "Share contact information easily",
        url: "/tools/vcard-qr",
        features: ["Full contact details", "Multiple formats", "Social links"],
        popular: false,
        available: true
      }
    ]
  },
  {
    title: "QR Code Analysis Tools",
    description: "Analyze and optimize your QR codes",
    tools: [
      {
        name: "QR Code Validator",
        description: "Validate QR code structure and decode content",
        url: "/tools/qr-validator",
        features: ["Structure validation", "Content decoder", "Type detection"],
        popular: false,
        available: true
      },
      {
        name: "QR Code Scanner & Tester",
        description: "Test QR code readability across devices",
        url: "/tools/qr-scanner",
        features: ["Multi-device testing", "Scan analytics", "Error detection"],
        popular: false,
        available: false
      },
      {
        name: "QR Code Analytics",
        description: "Track QR code performance and engagement",
        url: "/tools/qr-analytics",
        features: ["Scan tracking", "Geographic data", "Time analytics"],
        popular: false,
        available: false
      }
    ]
  },
  {
    title: "Bulk & Advanced Tools",
    description: "Professional tools for large-scale QR code operations",
    tools: [
      {
        name: "Bulk QR Code Generator",
        description: "Generate hundreds of QR codes at once",
        url: "/tools/bulk-generator",
        features: ["CSV import", "Batch processing", "ZIP download"],
        popular: false,
        available: false
      },
      {
        name: "QR Code API",
        description: "Integrate QR generation into your applications",
        url: "/tools/api",
        features: ["REST API", "Multiple formats", "High throughput"],
        popular: false,
        available: false
      },
      {
        name: "QR Code Templates",
        description: "Pre-designed QR code templates for common uses",
        url: "/tools/templates",
        features: ["Industry templates", "Customizable designs", "Brand guidelines"],
        popular: false,
        available: false
      }
    ]
  }
]

const featuredUseCase = [
  {
    title: "Restaurant Digital Menus",
    description: "Complete solution for contactless dining",
    features: ["QR menu creation", "Easy updates", "Multi-language support"],
    cta: "Create Menu QR",
    url: "/tools/restaurant-menu",
    available: false
  },
  {
    title: "Event Check-in System",
    description: "Streamline event registration and check-in",
    features: ["Attendee tracking", "Real-time analytics", "Integration ready"],
    cta: "Setup Event QR",
    url: "/tools/event-checkin",
    available: false
  },
  {
    title: "Product Authentication",
    description: "Verify product authenticity with QR codes",
    features: ["Secure generation", "Tamper detection", "Batch creation"],
    cta: "Create Auth QR",
    url: "/tools/product-auth",
    available: false
  }
]

export default function Tools() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Free QR Code Tools & Generators</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete collection of professional QR code tools. Generate, analyze, and optimize QR codes for any purpose - all completely free.
        </p>
      </div>

      {/* Ad Space - Top Banner */}
      <TopBannerAd />

      {/* Featured Use Cases */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Solutions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredUseCase.map((useCase, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 hover:shadow-lg transition-shadow relative">
              {!useCase.available && (
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold mb-3 text-gray-900">{useCase.title}</h3>
              <p className="text-gray-700 mb-4">{useCase.description}</p>
              <ul className="text-sm text-gray-600 mb-6 space-y-1">
                {useCase.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              {useCase.available ? (
                <Link 
                  href={useCase.url}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                  {useCase.cta}
                </Link>
              ) : (
                <button 
                  disabled
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed inline-block opacity-60"
                >
                  {useCase.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tool Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">All QR Code Tools</h2>
        <div className="space-y-12">
          {toolCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative ${tool.popular ? 'ring-2 ring-blue-500' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-gray-900 flex-1">
                        {tool.available ? (
                          <Link href={tool.url} className="hover:text-blue-600">
                            {tool.name}
                          </Link>
                        ) : (
                          <span className="text-gray-500">{tool.name}</span>
                        )}
                      </h4>
                      <div className="flex gap-2">
                        {tool.popular && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                        {!tool.available && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Features:</h5>
                      <div className="flex flex-wrap gap-2">
                        {tool.features.map((feature, featureIndex) => (
                          <span key={featureIndex} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    {tool.available ? (
                      <Link 
                        href={tool.url}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Use Tool →
                      </Link>
                    ) : (
                      <span className="text-gray-400 font-medium text-sm cursor-not-allowed">
                        Available Soon →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Space - Middle Rectangle */}
      <ContentAd />

      {/* Integration & API Section */}
      <section className="mb-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Developer Resources</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="absolute top-0 right-0">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Coming Soon
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">QR Code API</h3>
            <p className="text-gray-600 mb-4">
              Integrate QR code generation directly into your applications with our RESTful API.
            </p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li>• High-performance generation</li>
              <li>• Multiple output formats</li>
              <li>• Customization options</li>
              <li>• Comprehensive documentation</li>
            </ul>
            <span className="text-gray-400 font-medium cursor-not-allowed">
              Available Soon →
            </span>
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Coming Soon
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">SDKs & Libraries</h3>
            <p className="text-gray-600 mb-4">
              Ready-to-use libraries for popular programming languages and frameworks.
            </p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li>• JavaScript/Node.js SDK</li>
              <li>• Python library</li>
              <li>• PHP integration</li>
              <li>• WordPress plugin</li>
            </ul>
            <span className="text-gray-400 font-medium cursor-not-allowed">
              Available Soon →
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Ad Space */}
      <BottomBannerAd />
    </div>
  )
}
