import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Free QR Code Generator',
  description: 'Contact the Free QR Code Generator team for support, feedback, or inquiries.',
}

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="space-y-8 text-gray-700">

        {/* Business Information */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Business Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Company Details</h3>
              <p><strong>Business Name:</strong> Free QR Code Generator</p>
              <p><strong>Website:</strong> www.freeqrcodegenerator.shop</p>
              <p><strong>Business Type:</strong> Digital Services & Software</p>
              <p><strong>Founded:</strong> 2024</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p><strong>Email:</strong> <a href="mailto:support@freeqrcodegenerator.com" className="text-blue-700 underline">support@freeqrcodegenerator.com</a></p>
              <p><strong>Business Email:</strong> <a href="mailto:business@freeqrcodegenerator.com" className="text-blue-700 underline">business@freeqrcodegenerator.com</a></p>
              <p><strong>Response Time:</strong> 24-48 hours</p>
              <p><strong>Business Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
          </div>
        </section>

        {/* Primary Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            We're here to help! Whether you have questions about our QR code generator, need technical support,
            or want to provide feedback, we'd love to hear from you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">General Support</h3>
              <p className="text-sm mb-2">Questions, feedback, or technical issues</p>
              <a href="mailto:support@freeqrcodegenerator.com" className="text-blue-700 underline">support@freeqrcodegenerator.com</a>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Business Inquiries</h3>
              <p className="text-sm mb-2">Partnerships, advertising, or business opportunities</p>
              <a href="mailto:business@freeqrcodegenerator.com" className="text-blue-700 underline">business@freeqrcodegenerator.com</a>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Privacy & Legal</h3>
              <p className="text-sm mb-2">Privacy concerns, legal matters, or data requests</p>
              <a href="mailto:privacy@freeqrcodegenerator.com" className="text-blue-700 underline">privacy@freeqrcodegenerator.com</a>
            </div>
          </div>
        </section>
        {/* Contact Form */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <div className="bg-white border rounded-lg p-6">
            <form className="space-y-4" name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Subject</label>
                <select
                  name="subject"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="business">Business Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="privacy">Privacy Concern</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Message *</label>
                <textarea
                  name="message"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={6}
                  placeholder="Please describe your question or concern in detail..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="newsletter"
                  id="newsletter"
                  className="mr-2"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  I would like to receive updates about new features and improvements (optional)
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>

              <p className="text-xs text-gray-500">
                * Required fields. We typically respond within 24-48 hours during business days.
              </p>
            </form>
          </div>
        </section>
        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="mb-4">
              Before contacting us, you might find your answer in our comprehensive FAQ section.
              We've compiled answers to the most common questions about our QR code generator.
            </p>
            <a
              href="/faq"
              className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Visit FAQ →
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
            <p className="mb-4">
              All information you provide through this form or by email is kept confidential and secure.
              We never share your personal information with third parties without your consent.
            </p>
            <a
              href="/privacy-policy"
              className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Privacy Policy →
            </a>
          </section>
        </div>

        {/* Service Level Agreement */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24-48h</div>
              <h3 className="font-semibold mb-1">Response Time</h3>
              <p className="text-sm text-gray-600">We respond to all inquiries within 24-48 hours during business days</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <h3 className="font-semibold mb-1">Privacy Protected</h3>
              <p className="text-sm text-gray-600">Your information is kept confidential and never shared</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <h3 className="font-semibold mb-1">Service Available</h3>
              <p className="text-sm text-gray-600">Our QR code generator is available around the clock</p>
            </div>
          </div>
        </section>

        {/* Legal and Compliance */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Legal & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Data Protection</h3>
              <p className="text-sm text-gray-600 mb-2">
                We comply with GDPR, CCPA, and other applicable data protection regulations.
                You have the right to access, correct, or delete your personal information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Terms of Service</h3>
              <p className="text-sm text-gray-600 mb-2">
                By using our service, you agree to our Terms and Conditions.
                Please review them to understand your rights and responsibilities.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <a href="/terms" className="text-blue-700 underline text-sm">Terms & Conditions</a>
            <a href="/privacy-policy" className="text-blue-700 underline text-sm">Privacy Policy</a>
          </div>
        </section>
      </div>
    </div>
  )
} 