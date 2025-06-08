import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Resources | Free QR Code Generator',
  description: 'Learn more about QR codes, their uses, and best practices from our blog and resources.',
}

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog & Resources</h1>
      <article className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">What Are QR Codes and How Can You Use Them?</h2>
        <p className="text-gray-700 mb-4">QR codes (Quick Response codes) are versatile, two-dimensional barcodes that can store a variety of information. They are widely used for:</p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Sharing website links and contact information</li>
          <li>Connecting to WiFi networks</li>
          <li>Promoting social media profiles</li>
          <li>Facilitating payments and transactions</li>
          <li>Directing customers to Google review pages</li>
          <li>Providing product details and manuals</li>
        </ul>
        <p className="text-gray-700 mb-4">With the rise of smartphones, QR codes have become an essential tool for businesses, marketers, and individuals to connect the physical and digital worlds. Our free QR code generator makes it easy to create, customize, and use QR codes for any purpose—no technical skills required!</p>
        <p className="text-gray-700">Stay tuned for more tips, guides, and resources on making the most of QR codes.</p>
      </article>
    </div>
  )
} 