import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Free QR Code Generator. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">Home</Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 text-sm">FAQ</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm">Blog</Link>
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}