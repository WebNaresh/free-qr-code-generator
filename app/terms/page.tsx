import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Free QR Code Generator',
  description: 'Terms and conditions for using Free QR Code Generator - Learn about our service terms, user responsibilities, and usage guidelines.',
}

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using Free QR Code Generator, you agree to be bound by these Terms and Conditions. 
            If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
          <p className="mb-4">
            Free QR Code Generator provides a platform for creating, customizing, and downloading QR codes. 
            We offer both free and premium features to enhance your QR code generation experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className="mb-4">As a user of our service, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Use the service in compliance with all applicable laws</li>
            <li>Not use the service for any illegal or unauthorized purposes</li>
            <li>Not attempt to interfere with or disrupt the service</li>
            <li>Not use the service to generate QR codes for malicious purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p className="mb-4">
            The QR codes you generate are your property, but you grant us a license to store and process them. 
            Our website design, logos, and other intellectual property remain our exclusive property.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
          <p className="mb-4">
            Premium features require payment. All payments are processed securely through our payment providers. 
            Refunds are subject to our refund policy and applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
          <p className="mb-4">
            We strive to maintain 24/7 service availability but do not guarantee uninterrupted access. 
            We reserve the right to modify, suspend, or discontinue any part of the service at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="mb-4">
            We are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Disclaimer</h2>
          <p className="mb-4">
            Our service is provided "as is" without any warranties. We do not guarantee the accuracy, reliability, 
            or completeness of any information provided through our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. We will notify users of any material changes 
            by posting the new terms on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
          <p className="mb-4">
            For any questions regarding these terms, please contact us at support@freeqrcodegenerator.com
          </p>
        </section>

        <section>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  )
} 