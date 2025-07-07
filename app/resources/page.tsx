import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QR Code Resources & Tools | Free QR Code Generator',
  description: 'Comprehensive collection of QR code resources, tools, guides, and industry insights. Everything you need to master QR code technology.',
  keywords: 'QR code resources, QR code tools, QR code guides, QR code industry, QR code technology',
}

const resources = [
  {
    category: "Official Standards & Documentation",
    items: [
      {
        title: "ISO/IEC 18004:2015 QR Code Standard",
        description: "Official international standard for QR code symbology",
        url: "https://www.iso.org/standard/62021.html",
        type: "external"
      },
      {
        title: "GS1 QR Code Guideline",
        description: "Industry standard for QR codes in retail and supply chain",
        url: "https://www.gs1.org/standards/qr-code",
        type: "external"
      },
      {
        title: "Denso Wave QR Code Documentation",
        description: "Original creator's comprehensive QR code documentation",
        url: "https://www.qrcode.com/en/",
        type: "external"
      }
    ]
  },
  {
    category: "Industry Research & Statistics",
    items: [
      {
        title: "QR Code Usage Statistics 2024",
        description: "Latest data on QR code adoption and usage trends",
        url: "https://www.statista.com/topics/2364/qr-codes/",
        type: "external"
      },
      {
        title: "Mobile Marketing Association QR Code Guidelines",
        description: "Best practices for QR codes in mobile marketing",
        url: "https://www.mmaglobal.com/",
        type: "external"
      },
      {
        title: "Retail QR Code Implementation Study",
        description: "Research on QR code effectiveness in retail environments",
        url: "https://nrf.com/",
        type: "external"
      }
    ]
  },
  {
    category: "Development & Technical Resources",
    items: [
      {
        title: "QR Code Libraries and APIs",
        description: "Programming libraries for QR code generation and scanning",
        url: "https://github.com/topics/qr-code",
        type: "external"
      },
      {
        title: "ZXing (Zebra Crossing) Library",
        description: "Open-source barcode scanning library",
        url: "https://github.com/zxing/zxing",
        type: "external"
      },
      {
        title: "QR Code Error Correction Guide",
        description: "Technical guide to QR code error correction levels",
        url: "/blog/qr-code-error-correction-guide",
        type: "internal"
      }
    ]
  },
  {
    category: "Business & Marketing Resources",
    items: [
      {
        title: "QR Code Marketing Case Studies",
        description: "Real-world examples of successful QR code campaigns",
        url: "/blog/qr-code-marketing-case-studies",
        type: "internal"
      },
      {
        title: "Restaurant QR Code Menu Solutions",
        description: "Complete guide for implementing digital menus",
        url: "/blog/restaurant-qr-code-menus-guide",
        type: "internal"
      },
      {
        title: "Google Reviews QR Code Strategy",
        description: "Boost your online reputation with QR codes",
        url: "/blog/google-reviews-qr-codes-guide",
        type: "internal"
      }
    ]
  }
]

const tools = [
  {
    title: "Free QR Code Generator",
    description: "Create custom QR codes for business, reviews, and websites",
    url: "/",
    featured: true
  },
  {
    title: "QR Code Scanner Test",
    description: "Test your QR codes across different devices and apps",
    url: "/tools/qr-scanner-test",
    featured: false
  },
  {
    title: "QR Code Analytics Tracker",
    description: "Track and analyze QR code performance",
    url: "/tools/qr-analytics",
    featured: false
  },
  {
    title: "Bulk QR Code Generator",
    description: "Generate multiple QR codes at once",
    url: "/tools/bulk-generator",
    featured: false
  }
]

export default function Resources() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">QR Code Resources & Tools</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive collection of QR code resources, industry standards, research, and tools to help you succeed with QR code technology.
        </p>
      </div>

      {/* Ad Space - Top Banner */}
      <div className="mb-12 text-center">
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8">
          <p className="text-gray-500 text-sm">Advertisement Space - 728x90 Banner</p>
          <div className="h-20 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>

      {/* Featured Tools */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${tool.featured ? 'ring-2 ring-blue-500' : ''}`}>
              {tool.featured && (
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-3 inline-block">
                  Featured
                </span>
              )}
              <h3 className="text-lg font-bold mb-2 text-gray-900">
                <Link href={tool.url} className="hover:text-blue-600">
                  {tool.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources by Category */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Resource Library</h2>
        <div className="space-y-12">
          {resources.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                {category.category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 flex-1">
                        {item.type === 'external' ? (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                          >
                            {item.title}
                          </a>
                        ) : (
                          <Link href={item.url} className="hover:text-blue-600">
                            {item.title}
                          </Link>
                        )}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.type === 'external' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.type === 'external' ? 'External' : 'Internal'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Space - Middle Rectangle */}
      <div className="mb-12 text-center">
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6">
          <p className="text-gray-500 text-sm">Advertisement Space - 300x250 Rectangle</p>
          <div className="h-32 bg-gray-200 rounded mt-2 mx-auto max-w-xs"></div>
        </div>
      </div>

      {/* Quick Links */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Quick Links</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/blog" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 transition-colors">
            <h3 className="font-semibold text-blue-900 mb-2">QR Code Blog</h3>
            <p className="text-blue-700 text-sm">Latest articles and tutorials</p>
          </Link>
          <Link href="/faq" className="bg-green-50 hover:bg-green-100 rounded-lg p-4 transition-colors">
            <h3 className="font-semibold text-green-900 mb-2">FAQ</h3>
            <p className="text-green-700 text-sm">Common questions answered</p>
          </Link>
          <Link href="/contact" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 transition-colors">
            <h3 className="font-semibold text-purple-900 mb-2">Contact Support</h3>
            <p className="text-purple-700 text-sm">Get help with QR codes</p>
          </Link>
        </div>
      </section>

      {/* Bottom Ad Space */}
      <div className="text-center">
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8">
          <p className="text-gray-500 text-sm">Advertisement Space - 728x90 Banner</p>
          <div className="h-20 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
    </div>
  )
}
