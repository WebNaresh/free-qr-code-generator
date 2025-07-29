import React from 'react'
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
          <p className="mb-4 text-sm text-gray-600">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString()} |
            <strong> Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            Welcome to Free QR Code Generator ("we," "our," or "us"). These Terms and Conditions ("Terms")
            govern your use of our website www.freeqrcodegenerator.shop and our QR code generation services
            (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
            If you do not agree to these terms, please do not use our Service.
          </p>
          <p className="mb-4">
            These Terms constitute a legally binding agreement between you and Free QR Code Generator.
            We may modify these Terms at any time, and such modifications will be effective immediately upon posting.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
          <p className="mb-4">
            Free QR Code Generator provides a web-based platform for creating, customizing, and downloading QR codes.
            Our Service includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>QR code generation for various content types (URLs, text, contact info, etc.)</li>
            <li>Customization options (colors, logos, styles)</li>
            <li>High-resolution QR code downloads</li>
            <li>Educational content and resources about QR codes</li>
            <li>Customer support and assistance</li>
          </ul>
          <p className="mb-4">
            We offer both free and premium features. Free features are available without registration,
            while premium features may require account creation and payment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities and Acceptable Use</h2>
          <p className="mb-4">As a user of our Service, you agree to:</p>

          <h3 className="text-lg font-semibold mb-2">3.1 General Responsibilities</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Provide accurate and complete information when required</li>
            <li>Use the Service in compliance with all applicable laws and regulations</li>
            <li>Respect the rights of others and our intellectual property</li>
            <li>Maintain the security of any account credentials</li>
            <li>Report any security vulnerabilities or abuse to us promptly</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">3.2 Prohibited Uses</h3>
          <p className="mb-4">You agree NOT to use our Service for:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Any illegal, harmful, or unauthorized purposes</li>
            <li>Creating QR codes that link to malicious, fraudulent, or deceptive content</li>
            <li>Generating content that violates intellectual property rights</li>
            <li>Creating QR codes for spam, phishing, or other malicious activities</li>
            <li>Distributing malware, viruses, or other harmful software</li>
            <li>Harassment, abuse, or threatening behavior</li>
            <li>Adult content, violence, or illegal activities</li>
            <li>Attempting to interfere with or disrupt the Service</li>
            <li>Reverse engineering or attempting to extract our source code</li>
            <li>Automated scraping or data mining without permission</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">3.3 Content Standards</h3>
          <p className="mb-4">All QR code content must:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comply with applicable laws and regulations</li>
            <li>Be truthful and not misleading</li>
            <li>Respect intellectual property rights</li>
            <li>Not contain harmful or malicious elements</li>
            <li>Be appropriate for all audiences (if publicly shared)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property Rights</h2>

          <h3 className="text-lg font-semibold mb-2">4.1 Your Content</h3>
          <p className="mb-4">
            You retain ownership of the content you input into our QR code generator. However, by using our Service,
            you grant us a limited, non-exclusive, royalty-free license to process, store, and display your content
            solely for the purpose of providing our Service.
          </p>

          <h3 className="text-lg font-semibold mb-2">4.2 Our Intellectual Property</h3>
          <p className="mb-4">
            Our website design, logos, trademarks, software, and other intellectual property remain our exclusive property.
            You may not copy, modify, distribute, or create derivative works based on our intellectual property without
            our written permission.
          </p>

          <h3 className="text-lg font-semibold mb-2">4.3 Generated QR Codes</h3>
          <p className="mb-4">
            The QR codes you generate using our Service are your property. We do not claim ownership of the QR codes
            themselves, but we reserve the right to remove or disable access to QR codes that violate these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Advertising and Third-Party Content</h2>

          <h3 className="text-lg font-semibold mb-2">5.1 Advertising Policy</h3>
          <p className="mb-4">
            Our Service may display advertisements provided by third-party advertising networks, including Google AdSense.
            These advertisements are not endorsed by us and we are not responsible for their content or accuracy.
          </p>

          <h3 className="text-lg font-semibold mb-2">5.2 Third-Party Links</h3>
          <p className="mb-4">
            QR codes generated through our Service may link to third-party websites or content. We are not responsible
            for the content, privacy practices, or terms of service of these third-party sites.
          </p>

          <h3 className="text-lg font-semibold mb-2">5.3 Advertising Standards</h3>
          <p className="mb-4">
            All advertising content displayed on our Service must comply with applicable advertising standards and regulations.
            We reserve the right to remove or block advertisements that violate these standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Payment Terms and Billing</h2>

          <h3 className="text-lg font-semibold mb-2">6.1 Free Services</h3>
          <p className="mb-4">
            Basic QR code generation features are provided free of charge. No payment information is required for free features.
          </p>

          <h3 className="text-lg font-semibold mb-2">6.2 Premium Services</h3>
          <p className="mb-4">
            Premium features, if available, require payment. All payments are processed securely through our payment providers.
            By purchasing premium services, you agree to pay all applicable fees and taxes.
          </p>

          <h3 className="text-lg font-semibold mb-2">6.3 Refund Policy</h3>
          <p className="mb-4">
            Refunds for premium services are subject to our refund policy and applicable laws. Please contact us
            for refund requests within 30 days of purchase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Service Availability and Modifications</h2>

          <h3 className="text-lg font-semibold mb-2">7.1 Service Availability</h3>
          <p className="mb-4">
            We strive to maintain 24/7 service availability but do not guarantee uninterrupted access.
            Service may be temporarily unavailable due to maintenance, updates, or technical issues.
          </p>

          <h3 className="text-lg font-semibold mb-2">7.2 Service Modifications</h3>
          <p className="mb-4">
            We reserve the right to modify, suspend, or discontinue any part of the Service at any time,
            with or without notice. We may also impose limits on certain features or restrict access to parts of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data Protection</h2>
          <p className="mb-4">
            Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy,
            which is incorporated into these Terms by reference. By using our Service, you also agree to our Privacy Policy.
          </p>
          <p className="mb-4">
            We implement appropriate security measures to protect your data, but we cannot guarantee absolute security.
            You are responsible for maintaining the confidentiality of any account credentials.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability and Disclaimers</h2>

          <h3 className="text-lg font-semibold mb-2">9.1 Service Disclaimer</h3>
          <p className="mb-4">
            Our Service is provided "as is" and "as available" without any warranties of any kind, either express or implied.
            We do not guarantee the accuracy, reliability, completeness, or timeliness of any information provided through our Service.
          </p>

          <h3 className="text-lg font-semibold mb-2">9.2 Limitation of Liability</h3>
          <p className="mb-4">
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities,
            resulting from your use of our Service.
          </p>

          <h3 className="text-lg font-semibold mb-2">9.3 Maximum Liability</h3>
          <p className="mb-4">
            Our total liability to you for any claims arising from or related to these Terms or your use of our Service
            shall not exceed the amount you paid us in the twelve months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify, defend, and hold harmless Free QR Code Generator and its officers, directors, employees,
            and agents from any claims, damages, losses, or expenses arising from your use of our Service, violation of these Terms,
            or infringement of any third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>

          <h3 className="text-lg font-semibold mb-2">11.1 Termination by You</h3>
          <p className="mb-4">
            You may stop using our Service at any time. If you have an account, you may delete it through your account settings.
          </p>

          <h3 className="text-lg font-semibold mb-2">11.2 Termination by Us</h3>
          <p className="mb-4">
            We may suspend or terminate your access to our Service at any time, with or without cause,
            including if you violate these Terms or engage in prohibited activities.
          </p>

          <h3 className="text-lg font-semibold mb-2">11.3 Effect of Termination</h3>
          <p className="mb-4">
            Upon termination, your right to use our Service will cease immediately. Provisions that by their nature
            should survive termination will remain in effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Dispute Resolution</h2>

          <h3 className="text-lg font-semibold mb-2">12.1 Governing Law</h3>
          <p className="mb-4">
            These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction],
            without regard to conflict of law principles.
          </p>

          <h3 className="text-lg font-semibold mb-2">12.2 Dispute Resolution</h3>
          <p className="mb-4">
            Any disputes arising from these Terms or your use of our Service will be resolved through binding arbitration,
            except where prohibited by law. You waive your right to participate in class action lawsuits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Changes to These Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. We will notify users of material changes by:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Posting the updated Terms on this page</li>
            <li>Updating the "Last Updated" date</li>
            <li>Providing notice through our website or email (for significant changes)</li>
          </ul>
          <p className="mb-4">
            Your continued use of our Service after any changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
          <p className="mb-4">
            For any questions regarding these Terms, please contact us:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p><strong>Email:</strong> support@freeqrcodegenerator.com</p>
            <p><strong>Website:</strong> www.freeqrcodegenerator.shop</p>
            <p><strong>Response Time:</strong> We aim to respond within 24-48 hours</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">15. Miscellaneous</h2>

          <h3 className="text-lg font-semibold mb-2">15.1 Entire Agreement</h3>
          <p className="mb-4">
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and us
            regarding your use of our Service.
          </p>

          <h3 className="text-lg font-semibold mb-2">15.2 Severability</h3>
          <p className="mb-4">
            If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
          </p>

          <h3 className="text-lg font-semibold mb-2">15.3 Waiver</h3>
          <p className="mb-4">
            Our failure to enforce any provision of these Terms does not constitute a waiver of that provision.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString()} |
            <strong> Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  )
} 