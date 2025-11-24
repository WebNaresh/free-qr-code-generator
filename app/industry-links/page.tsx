import { Metadata } from 'next'
import Link from 'next/link'
import { TopBannerAd, ContentAd, BottomBannerAd } from '@/components/AdSense'

export const metadata: Metadata = {
  title: 'QR Code Industry Links & Partners | Free QR Code Generator',
  description: 'Comprehensive directory of QR code industry resources, technology partners, and related services. Connect with the QR code ecosystem.',
  keywords: 'QR code industry, QR code partners, QR code directory, QR code technology, QR code ecosystem',
}

const industryCategories = [
  {
    title: "QR Code Technology Standards",
    description: "Official standards and specifications organizations",
    links: [
      {
        name: "ISO/IEC JTC 1/SC 31",
        description: "International standards for automatic identification and data capture",
        url: "https://www.iso.org/committee/45332.html",
        type: "Standards Body"
      },
      {
        name: "GS1 Global",
        description: "Global standards organization for supply chain and QR codes",
        url: "https://www.gs1.org/",
        type: "Standards Body"
      },
      {
        name: "Denso Wave",
        description: "Original inventor and developer of QR code technology",
        url: "https://www.denso-wave.com/",
        type: "Technology Creator"
      },
      {
        name: "QR Code.com",
        description: "Official QR code information and specifications",
        url: "https://www.qrcode.com/",
        type: "Official Resource"
      }
    ]
  },
  {
    title: "Mobile & Scanning Technology",
    description: "Companies developing QR code scanning and mobile solutions",
    links: [
      {
        name: "ZXing Project",
        description: "Open-source barcode scanning library",
        url: "https://github.com/zxing/zxing",
        type: "Open Source"
      },
      {
        name: "Scandit",
        description: "Enterprise barcode scanning solutions",
        url: "https://www.scandit.com/",
        type: "Enterprise Solution"
      },
      {
        name: "Cognex",
        description: "Industrial barcode reading and machine vision",
        url: "https://www.cognex.com/",
        type: "Industrial"
      },
      {
        name: "Honeywell Scanning",
        description: "Professional barcode scanning hardware",
        url: "https://www.honeywellaidc.com/",
        type: "Hardware"
      }
    ]
  },
  {
    title: "Marketing & Analytics Platforms",
    description: "QR code marketing and analytics service providers",
    links: [
      {
        name: "QR Code Generator",
        description: "Professional QR code creation and analytics",
        url: "https://www.qr-code-generator.com/",
        type: "Service Provider"
      },
      {
        name: "Beaconstac",
        description: "QR code marketing and proximity marketing solutions",
        url: "https://www.beaconstac.com/",
        type: "Marketing Platform"
      },
      {
        name: "Flowcode",
        description: "QR code marketing and data analytics platform",
        url: "https://www.flowcode.com/",
        type: "Analytics Platform"
      },
      {
        name: "QR Tiger",
        description: "Dynamic QR code generator with tracking",
        url: "https://www.qrcode-tiger.com/",
        type: "Service Provider"
      }
    ]
  },
  {
    title: "Industry Publications & Research",
    description: "Publications covering QR code trends and research",
    links: [
      {
        name: "Automatic ID News",
        description: "Industry news for automatic identification technology",
        url: "https://www.aimglobal.org/",
        type: "Industry News"
      },
      {
        name: "Retail TouchPoints",
        description: "Retail technology and customer experience insights",
        url: "https://www.retailtouchpoints.com/",
        type: "Retail Industry"
      },
      {
        name: "Mobile Marketer",
        description: "Mobile marketing industry news and trends",
        url: "https://www.mobilemarketer.com/",
        type: "Marketing Industry"
      },
      {
        name: "NFC World",
        description: "Near field communication and proximity technology news",
        url: "https://www.nfcworld.com/",
        type: "Technology News"
      }
    ]
  },
  {
    title: "Restaurant & Hospitality",
    description: "Industry resources for restaurant and hospitality QR code adoption",
    links: [
      {
        name: "National Restaurant Association",
        description: "Leading restaurant industry association",
        url: "https://restaurant.org/",
        type: "Industry Association"
      },
      {
        name: "Restaurant Business",
        description: "Restaurant industry news and trends",
        url: "https://www.restaurantbusinessonline.com/",
        type: "Industry Publication"
      },
      {
        name: "QSR Magazine",
        description: "Quick service restaurant industry insights",
        url: "https://www.qsrmagazine.com/",
        type: "Industry Publication"
      },
      {
        name: "Hospitality Technology",
        description: "Technology solutions for hospitality industry",
        url: "https://hospitalitytech.com/",
        type: "Technology Focus"
      }
    ]
  },
  {
    title: "E-commerce & Retail",
    description: "Retail and e-commerce QR code implementation resources",
    links: [
      {
        name: "National Retail Federation",
        description: "Leading retail industry association",
        url: "https://nrf.com/",
        type: "Industry Association"
      },
      {
        name: "Retail Dive",
        description: "Retail industry news and analysis",
        url: "https://www.retaildive.com/",
        type: "Industry News"
      },
      {
        name: "Digital Commerce 360",
        description: "E-commerce industry insights and trends",
        url: "https://www.digitalcommerce360.com/",
        type: "E-commerce Focus"
      },
      {
        name: "Chain Store Age",
        description: "Retail technology and operations insights",
        url: "https://chainstoreage.com/",
        type: "Retail Operations"
      }
    ]
  }
]

export default function IndustryLinks() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">QR Code Industry Links & Partners</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive directory of QR code industry resources, technology partners, standards organizations, and related services.
        </p>
      </div>

      {/* Ad Space - Top Banner */}
      <TopBannerAd />

      {/* Industry Categories */}
      <section className="mb-16">
        <div className="space-y-12">
          {industryCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {category.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 flex-1">
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-blue-600"
                        >
                          {link.name}
                        </a>
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {link.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{link.description}</p>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Visit Website →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Space - Middle Rectangle */}
      <ContentAd />

      {/* Partnership Opportunities */}
      <section className="mb-16 bg-blue-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Partnership Opportunities</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Technology Partners</h3>
            <p className="text-gray-600 mb-4">
              We collaborate with leading technology companies to provide comprehensive QR code solutions.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• API integration partnerships</li>
              <li>• White-label solutions</li>
              <li>• Technology licensing</li>
              <li>• Joint development projects</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Industry Partnerships</h3>
            <p className="text-gray-600 mb-4">
              Connect with industry associations and service providers in the QR code ecosystem.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Industry association memberships</li>
              <li>• Service provider networks</li>
              <li>• Educational partnerships</li>
              <li>• Research collaborations</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link 
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Explore Partnerships
          </Link>
        </div>
      </section>

      {/* Related Resources */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Related Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/resources" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">QR Code Resources</h3>
            <p className="text-gray-600 text-sm">Tools and documentation</p>
          </Link>
          <Link href="/blog" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Industry Blog</h3>
            <p className="text-gray-600 text-sm">Latest trends and insights</p>
          </Link>
          <Link href="/tools" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">QR Code Tools</h3>
            <p className="text-gray-600 text-sm">Free generation tools</p>
          </Link>
          <Link href="/contact" className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
            <p className="text-gray-600 text-sm">Get in touch</p>
          </Link>
        </div>
      </section>

      {/* Bottom Ad Space */}
      <BottomBannerAd />
    </div>
  )
}
