import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QR Code FAQ | Free QR Code Generator',
  description: 'Comprehensive FAQ about QR codes, generation, scanning, and best practices. Get answers to common QR code questions.',
  keywords: 'QR code FAQ, QR code questions, QR code help, QR code support, QR code troubleshooting',
}

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-2">What is a QR code?</h2>
          <p>QR (Quick Response) codes are two-dimensional barcodes that can store information such as URLs, contact details, or text. They can be scanned using a smartphone camera or QR code reader.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Is this QR code generator really free?</h2>
          <p>Yes! Our QR code generator is 100% free to use. There are no hidden fees, no watermarks, and no registration required for basic features.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Do I need to sign up to use the service?</h2>
          <p>No signup is required. You can generate and download QR codes instantly without creating an account.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">What types of QR codes can I create?</h2>
          <p>You can create QR codes for URLs, text, contact information, WiFi credentials, Google reviews, and more. We support a wide range of QR code types for various use cases.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Are the QR codes generated here safe and private?</h2>
          <p>Yes. We do not store your data or the QR codes you generate. All processing happens securely in your browser or on our secure servers.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Can I use the QR codes for commercial purposes?</h2>
          <p>Absolutely! You can use the QR codes you generate for personal or commercial projects without restrictions.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">How long do the QR codes last?</h2>
          <p>QR codes generated here do not expire. Once downloaded, you can use them as long as you need.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Can I customize the look of my QR code?</h2>
          <p>Yes! You can change the color, add a logo, and adjust the style of your QR code to match your brand or personal preference.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Do you track or analyze the QR codes I generate?</h2>
          <p>No, we do not track, analyze, or store any QR codes you create. Your privacy is our top priority.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Can I generate QR codes in bulk?</h2>
          <p>Currently, our tool is focused on single QR code generation for simplicity and privacy. We may add bulk generation features in the future based on user feedback.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Who can I contact for support?</h2>
          <p>If you have questions or need help, please visit our Contact page or email us at support@freeqrcodegenerator.com.</p>
        </section>
      </div>
    </div>
  )
} 