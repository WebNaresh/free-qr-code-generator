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
      <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-600 mb-12">
        Everything you need to know about QR codes, our generator, and best practices. Can't find your answer? 
        Contact us and we'll be happy to help!
      </p>

      <div className="space-y-6 text-gray-700">
        {/* Getting Started */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-800 border-b-2 border-blue-200 pb-2">Getting Started</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">What is a QR code?</h3>
              <p className="mb-3">
                QR (Quick Response) codes are two-dimensional barcodes that can store various types of information such as 
                URLs, contact details, WiFi credentials, or plain text. They were invented in 1994 by Denso Wave for the 
                automotive industry but have since become ubiquitous for marketing, payments, and information sharing.
              </p>
              <p className="text-sm text-gray-600">
                Unlike traditional barcodes that can only hold about 20 characters, QR codes can store up to 4,296 alphanumeric 
                characters, making them incredibly versatile for modern applications.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">How do I scan a QR code?</h3>
              <p className="mb-3">
                Most modern smartphones (iPhone iOS 11+ and Android 9+) have built-in QR code scanning in their camera apps:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>iPhone:</strong> Open the Camera app and point it at the QR code. A notification will appear at 
                the top of the screen - tap it to open the link.</li>
                <li><strong>Android:</strong> Open the Camera app or Google Lens and point it at the QR code. Tap the 
                popup notification to proceed.</li>
                <li><strong>Older Devices:</strong> Download a free QR scanner app from your app store. Popular options 
                include QR Code Reader, Scanner App, or Google Lens.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Is this QR code generator really free?</h3>
              <p className="mb-3">
                Yes, absolutely! Our QR code generator is 100% free to use with no hidden costs. You can:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
                <li>Generate unlimited QR codes</li>
                <li>Download high-resolution images (up to 3000x3000 pixels)</li>
                <li>Add custom logos and colors</li>
                <li>Export in multiple formats (PNG, PDF)</li>
                <li>Use for both personal and commercial projects</li>
                <li>No watermarks on any generated QR codes</li>
              </ul>
              <p className="text-sm text-gray-600 italic">
                We're committed to keeping our core service free forever. We sustain the platform through ethical advertising 
                and optional user support.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Questions */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-800 border-b-2 border-green-200 pb-2">Technical Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Do I need to sign up or create an account?</h3>
              <p className="mb-2">
                No signup is required! You can generate and download QR codes instantly without creating an account. We believe 
                in making our tools accessible to everyone without barriers.
              </p>
              <p className="text-sm text-gray-600">
                However, if we add features like QR code history or campaign management in the future, those may require optional 
                account creation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">What types of QR codes can I create?</h3>
              <p className="mb-3">
                Our generator supports a wide range of QR code types:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-semibold text-sm mb-2">Currently Supported:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Website URLs</li>
                    <li>• Google Review links</li>
                    <li>• Contact information (vCard)</li>
                    <li>• Plain text messages</li>
                    <li>• Social media profiles</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-sm mb-2">Coming Soon:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• WiFi credentials</li>
                    <li>• Email addresses</li>
                    <li>• SMS messages</li>
                    <li>• Calendar events</li>
                    <li>• Payment links</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">How long do the QR codes last?</h3>
              <p className="mb-3">
                <strong>Static QR codes (what we generate) last forever!</strong> Once you download the QR code image, it 
                will continue to work indefinitely. The data is encoded directly into the image, so it doesn't rely on any 
                external service or server.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm">
                  <strong>Important:</strong> This is different from "dynamic" QR codes offered by some paid services. 
                  Dynamic codes contain a short URL that redirects to your content, allowing you to change the destination 
                  without regenerating the code - but they require an ongoing subscription and will stop working if the 
                  service is discontinued.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Can I customize the look of my QR code?</h3>
              <p className="mb-3">
                Yes! We offer extensive customization options:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm mb-3">
                <li><strong>Logo Integration:</strong> Upload your company logo or any image to embed in the center of the QR code</li>
                <li><strong>Color Customization:</strong> We automatically extract colors from your logo, or you can choose custom colors</li>
                <li><strong>Size Options:</strong> Select from multiple logo sizes (small, medium, large, extra-large, jumbo)</li>
                <li><strong>High Resolution:</strong> Download at various resolutions suitable for web or print</li>
              </ul>
              <p className="text-sm text-gray-600">
                <strong>Pro tip:</strong> We use error correction level H (highest) when you add a logo, ensuring your QR 
                code remains scannable even with the logo covering up to 30% of the code.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">What resolution should I use for printing?</h3>
              <p className="mb-3">
                The resolution you need depends on your print size and viewing distance:
              </p>
              <div className="bg-gray-50 p-4 rounded mb-3">
                <ul className="space-y-2 text-sm">
                  <li><strong>Business Cards:</strong> Minimum 1000x1000 pixels (1" x 1" at 300 DPI)</li>
                  <li><strong>Flyers/Posters:</strong> 2000x2000 pixels (2-3" size recommended)</li>
                  <li><strong>Banners/Billboards:</strong> 3000x3000 pixels or export as PDF for vector quality</li>
                  <li><strong>Screen Display:</strong> 800x800 pixels is usually sufficient</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Golden Rule:</strong> For every 10 feet of scanning distance, increase the QR code size by 1 inch. 
                For example, a billboard scanned from 50 feet away should have a QR code at least 5 inches in size.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-purple-800 border-b-2 border-purple-200 pb-2">Privacy & Security</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Are the QR codes generated here safe and private?</h3>
              <p className="mb-3">
                Yes, absolutely. We take privacy very seriously:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm mb-3">
                <li><strong>Local Generation:</strong> Many QR codes are generated entirely in your browser using JavaScript</li>
                <li><strong>No Data Storage:</strong> We never store your QR code data or content on our servers</li>
                <li><strong>No Tracking:</strong> We don't track what QR codes you create or embed tracking pixels</li>
                <li><strong>HTTPS Only:</strong> All connections are encrypted with SSL/TLS</li>
                <li><strong>No Third-Party Sharing:</strong> Your data is never sold or shared with third parties</li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-sm">
                  <strong>GDPR & CCPA Compliant:</strong> We comply with international privacy regulations including GDPR 
                  (Europe) and CCPA (California). We collect minimal analytics to improve our service, but never personal or identifying information.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Can I use the QR codes for commercial purposes?</h3>
              <p className="mb-2">
                Absolutely! You can use the QR codes you generate for any purpose, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
                <li>Business marketing and advertising</li>
                <li>Product packaging and labels</li>
                <li>Restaurant menus and ordering systems</li>
                <li>Event tickets and registrations</li>
                <li>Business cards and promotional materials</li>
                <li>Any other commercial or personal use</li>
              </ul>
              <p className="text-sm text-gray-600">
                There are no usage restrictions, no attribution required, and no licensing fees. The QR codes you create are 
                yours to use as you wish.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Do you track or analyze the QR codes I generate?</h3>
              <p className="mb-3">
                We collect minimal anonymous analytics to improve our service, but we do not track, analyze, or store the actual 
                QR codes you create or their content. Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>We DO track:</strong> Page views, general usage patterns, error rates (to fix bugs)</li>
                <li><strong>We DON'T track:</strong> QR code content, URLs you encode, personal information, IP addresses 
                (beyond rate limiting for spam prevention)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Usage & Best Practices */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-orange-800 border-b-2 border-orange-200 pb-2">Usage & Best Practices</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">What's the minimum size for a QR code to work?</h3>
              <p className="mb-3">
                The minimum recommended size is <strong>2cm x 2cm (0.8" x 0.8")</strong> for close-range scanning (like business 
                cards or flyers). However, the optimal size depends on several factors:
              </p>
              <div className="bg-gray-50 p-4 rounded mb-3">
                <p className="font-semibold text-sm mb-2">Size Guidelines by Use Case:</p>
                <ul className="space-y-2 text-sm">
                  <li><strong>Business Cards:</strong> 1.5-2 cm (0.6-0.8 inches)</li>
                  <li><strong>Flyers/Brochures:</strong> 2-3 cm (0.8-1.2 inches)</li>
                  <li><strong>Posters:</strong> 5-8 cm (2-3 inches)</li>
                  <li><strong>Billboards:</strong> 10+ cm (4+ inches) - use the 10:1 distance rule</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Pro tip:</strong> Test your QR code at the actual size it will be printed and from the expected 
                scanning distance before mass production.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Why isn't my QR code scanning properly?</h3>
              <p className="mb-3">
                If your QR code isn't scanning well, check these common issues:
              </p>
              <div className="space-y-3">
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <h4 className="font-semibold text-sm mb-2">Common Problems & Solutions:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Too Small:</strong> Increase the size to at least 2cm x 2cm</li>
                    <li><strong>Low Contrast:</strong> Ensure dark colors on light background (not gray on white)</li>
                    <li><strong>Poor Lighting:</strong> Add better lighting or avoid reflective surfaces</li>
                    <li><strong>Damaged Code:</strong> Ensure the code isn't torn, smudged, or obscured</li>
                    <li><strong>Too Much Customization:</strong> Simplify colors or reduce logo size</li>
                    <li><strong>Curved Surface:</strong> QR codes work best on flat surfaces</li>
                    <li><strong>Low Resolution:</strong> Use higher resolution when printing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Can I generate QR codes in bulk?</h3>
              <p className="mb-2">
                Currently, our free tool focuses on creating individual high-quality QR codes. Each code is optimized 
                for your specific needs with custom branding and design options.
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Coming Soon:</strong> We're working on a bulk generation feature for users who need to create 
                multiple QR codes at once (e.g., for product labeling or event ticketing). Stay tuned!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">What's the difference between static and dynamic QR codes?</h3>
              <p className="mb-3">
                Understanding this difference is crucial for choosing the right solution:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-blue-900">Static QR Codes (Our Service)</h4>
                  <p className="text-sm mb-2">Data is permanently encoded in the image.</p>
                  <p className="text-xs text-green-700 font-semibold mb-1">✓ Advantages:</p>
                  <ul className="text-xs space-y-1 mb-2">
                    <li>• Work forever, no expiration</li>
                    <li>• No ongoing costs</li>
                    <li>• Complete privacy</li>
                    <li>• No dependency on services</li>
                  </ul>
                  <p className="text-xs text-red-700 font-semibold mb-1">✗ Limitations:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Can't change destination after printing</li>
                    <li>• No built-in analytics</li>
                    <li>• Need new code for updates</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-purple-900">Dynamic QR Codes</h4>
                  <p className="text-sm mb-2">Contains a redirect URL you can update.</p>
                  <p className="text-xs text-green-700 font-semibold mb-1">✓ Advantages:</p>
                  <ul className="text-xs space-y-1 mb-2">
                    <li>• Change destination anytime</li>
                    <li>• Track scans and analytics</li>
                    <li>• A/B testing capability</li>
                    <li>• Shorter encoded URLs</li>
                  </ul>
                  <p className="text-xs text-red-700 font-semibold mb-1">✗ Limitations:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Requires ongoing subscription</li>
                    <li>• Stops working if service ends</li>
                    <li>• Privacy concerns (tracking)</li>
                    <li>• Dependency on third-party</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-800 border-b-2 border-indigo-200 pb-2">Support & Help</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Where can I get help if I have issues?</h3>
              <p className="mb-3">
                We're here to help! You can reach us through several channels:
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <ul className="space-y-2 text-sm">
                  <li><strong>📧 Email Support:</strong> support@freeqrcodegenerator.com (24-48 hour response)</li>
                  <li><strong>📚 Documentation:</strong> Check our comprehensive guides and tutorials</li>
                  <li><strong>💬 Contact Form:</strong> Visit our Contact page for quick inquiries</li>
                  <li><strong>🐛 Bug Reports:</strong> Report technical issues via our feedback form</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">How can I provide feedback or suggest features?</h3>
              <p className="mb-2">
                We love hearing from our users! Your feedback helps us improve and add features that matter most. You can:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Use the feedback form on our homepage</li>
                <li>Email us directly at feedback@freeqrcodegenerator.com</li>
                <li>Share your use cases and success stories</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Do you offer customer support?</h3>
              <p className="mb-2">
                Yes! While our tool is designed to be intuitive and self-service, we provide email support for all users, 
                free or otherwise. We typically respond within 24-48 hours during business days.
              </p>
              <p className="text-sm text-gray-600">
                For urgent business needs or custom enterprise solutions, contact us at partnerships@freeqrcodegenerator.com.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? We're here to help! Contact our support team or start creating 
            your first QR code - it's free and takes just seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Contact Support
            </a>
            <a 
              href="/" 
              className="inline-block bg-purple-700 text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition-colors font-semibold border-2 border-white"
            >
              Create QR Code Now →
            </a>
          </div>
        </section>
      </div>
    </div>
  )
} 