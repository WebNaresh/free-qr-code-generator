import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-800">Free QR Code Generator</Link>
        <div className="flex flex-wrap gap-x-6 gap-y-2 items-center text-sm">
          <Link href="/" className="text-gray-700 hover:text-blue-700">Home</Link>
          <Link href="/tools" className="text-gray-700 hover:text-blue-700">Tools</Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-700">Blog</Link>
          <Link href="/resources" className="text-gray-700 hover:text-blue-700">Resources</Link>
          <Link href="/restaurant-qr-codes" className="text-gray-700 hover:text-blue-700">Restaurant</Link>
          <Link href="/faq" className="text-gray-700 hover:text-blue-700">FAQ</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-700">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-700">Contact</Link>
        </div>
      </div>
    </nav>
  )
} 