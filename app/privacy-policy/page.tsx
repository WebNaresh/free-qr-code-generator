import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Free QR Code Generator',
  description: 'Privacy policy for Free QR Code Generator - Learn how we handle your data and protect your privacy.',
}

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-8 text-gray-700">
        <section>
          <p className="mb-4 text-sm text-gray-600">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString()} |
            <strong> Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Free QR Code Generator ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
            This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website
            www.freeqrcodegenerator.shop (the "Service") and tells you about your privacy rights and how the law protects you.
          </p>
          <p className="mb-4">
            By using our Service, you agree to the collection and use of information in accordance with this policy.
            If you do not agree with our policies and practices, do not use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="mb-4">We collect and process the following types of information:</p>

          <h3 className="text-lg font-semibold mb-2">2.1 Information You Provide Directly</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>QR code content and customization preferences</li>
            <li>Contact information when you reach out to us</li>
            <li>Feedback and survey responses</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">2.2 Information Collected Automatically</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Usage data and analytics (pages visited, time spent, clicks)</li>
            <li>Device and browser information (browser type, operating system)</li>
            <li>IP address and general location data</li>
            <li>Referral URLs and search terms</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">2.3 Information from Third Parties</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Analytics data from Google Analytics</li>
            <li>Advertising data from Google AdSense</li>
            <li>Social media interactions (if you engage with our social content)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the collected information for the following purposes:</p>

          <h3 className="text-lg font-semibold mb-2">3.1 Service Provision</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Providing and maintaining our QR code generation service</li>
            <li>Processing your QR code generation requests</li>
            <li>Customizing your user experience</li>
            <li>Providing customer support and responding to inquiries</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">3.2 Analytics and Improvement</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Analyzing usage patterns to enhance user experience</li>
            <li>Conducting research and analytics to improve our services</li>
            <li>Monitoring and analyzing trends and usage</li>
            <li>Testing new features and functionality</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">3.3 Security and Legal</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Preventing fraud and ensuring security</li>
            <li>Detecting and preventing abuse or misuse of our service</li>
            <li>Complying with legal obligations and law enforcement requests</li>
            <li>Protecting our rights and the rights of others</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">3.4 Advertising</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Displaying relevant advertisements through Google AdSense</li>
            <li>Measuring advertising effectiveness</li>
            <li>Personalizing ad content based on your interests (with consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Collection and Analytics</h2>
          <p className="mb-4">
            We collect minimal data to improve our service and understand how users interact with our QR code generator.
          </p>

          <h3 className="text-lg font-semibold mb-2">4.1 Analytics and Advertising</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Google Analytics:</strong> We use Google Analytics to understand website usage patterns</li>
            <li><strong>Google AdSense:</strong> We display relevant advertisements to support our free service</li>
            <li><strong>No Tracking Cookies:</strong> We do not use tracking cookies or store personal data locally</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">4.2 Data Minimization</h3>
          <p className="mb-4">
            We believe in data minimization. Your QR code content is processed locally in your browser and is not stored on our servers.
            We only collect anonymous usage statistics to improve our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Storage and Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h3 className="text-lg font-semibold mb-2">5.1 Security Measures</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>SSL/TLS encryption for data transmission</li>
            <li>Secure server infrastructure</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication</li>
            <li>Data minimization and retention policies</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">5.2 Data Retention</h3>
          <p className="mb-4">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
            privacy policy, unless a longer retention period is required by law. QR code content is not permanently
            stored on our servers and is processed temporarily for generation purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services and Integrations</h2>
          <p className="mb-4">
            We use various third-party services to provide and improve our service. These services may collect
            information about your use of our website.
          </p>

          <h3 className="text-lg font-semibold mb-2">6.1 Google Services</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Google Analytics:</strong> For website analytics and user behavior analysis</li>
            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
            <li><strong>Google Fonts:</strong> For web typography</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">6.2 Other Third-Party Services</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Vercel Analytics:</strong> For performance monitoring and analytics</li>
            <li><strong>Content Delivery Networks (CDNs):</strong> For faster content delivery</li>
          </ul>

          <p className="mb-4">
            These third-party services have their own privacy policies. We encourage you to review their privacy
            policies to understand how they collect and use your information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><a href="https://policies.google.com/privacy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Your Privacy Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>

          <h3 className="text-lg font-semibold mb-2">7.1 General Rights</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Access:</strong> Request access to your personal data</li>
            <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data</li>
            <li><strong>Portability:</strong> Request transfer of your data to another service</li>
            <li><strong>Objection:</strong> Object to processing of your personal data</li>
            <li><strong>Restriction:</strong> Request restriction of processing your personal data</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">7.2 Advertising and Marketing Rights</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Opt-out of personalized advertising through Google Ad Settings</li>
            <li>Request information about data used for advertising</li>
            <li>Block ads using browser ad blockers</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">7.3 How to Exercise Your Rights</h3>
          <p className="mb-4">
            To exercise any of these rights, please contact us at support@freeqrcodegenerator.com.
            We will respond to your request within 30 days. You may also have the right to lodge a
            complaint with a data protection authority.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
          <p className="mb-4">
            Your information may be transferred to and processed in countries other than your own.
            We ensure that such transfers comply with applicable data protection laws and implement
            appropriate safeguards to protect your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
          <p className="mb-4">
            Our service is not intended for children under 13 years of age. We do not knowingly collect
            personal information from children under 13. If you are a parent or guardian and believe your
            child has provided us with personal information, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. California Privacy Rights (CCPA)</h2>
          <p className="mb-4">
            If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of the sale of personal information</li>
            <li>Right to non-discrimination for exercising your rights</li>
          </ul>
          <p className="mb-4">
            We do not sell personal information. To exercise your CCPA rights, contact us at support@freeqrcodegenerator.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. European Privacy Rights (GDPR)</h2>
          <p className="mb-4">
            If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR).
            We process your personal data based on the following legal bases:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Consent:</strong> When you provide consent for specific processing activities</li>
            <li><strong>Legitimate Interest:</strong> For analytics, security, and service improvement</li>
            <li><strong>Legal Obligation:</strong> When required by law</li>
            <li><strong>Contract Performance:</strong> To provide our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy, our data practices, or wish to exercise your privacy rights,
            please contact us:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p><strong>Email:</strong> support@freeqrcodegenerator.com</p>
            <p><strong>Website:</strong> www.freeqrcodegenerator.shop</p>
            <p><strong>Response Time:</strong> We aim to respond within 24-48 hours</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time to reflect changes in our practices, technology,
            legal requirements, or other factors. We will notify you of any material changes by:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Posting the updated policy on this page</li>
            <li>Updating the "Last Updated" date</li>
            <li>Providing notice through our website or email (for significant changes)</li>
          </ul>
          <p className="mb-4">
            Your continued use of our service after any changes constitutes acceptance of the updated privacy policy.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">14. Summary</h2>
          <p className="mb-4">
            <strong>In summary:</strong> We are committed to protecting your privacy. We collect minimal data necessary
            to provide our service, use secure practices to protect your information, and give you control over your data.
            We do not sell your personal information and are transparent about our data practices.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString()} |
            <strong> Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  )
} 