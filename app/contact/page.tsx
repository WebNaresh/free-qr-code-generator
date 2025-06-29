import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Free QR Code Generator',
  description: 'Contact the Free QR Code Generator team for support, feedback, or inquiries.',
}

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="space-y-8 text-gray-700">
        <section>
          <p>If you have questions, feedback, or need support, please email us at <a href="mailto:support@freeqrcodegenerator.com" className="text-blue-700 underline">support@freeqrcodegenerator.com</a>.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact Form</h2>
          <form className="space-y-4" name="contact" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input type="text" name="name" required className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" name="email" required className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea name="message" required className="w-full border rounded px-3 py-2" rows={4}></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Send Message</button>
          </form>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Our Response Time</h2>
          <p>We strive to respond to all inquiries within 24-48 hours. Your feedback is important to us and helps us improve our service.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Your Privacy</h2>
          <p>All information you provide through this form or by email is kept confidential and is never shared with third parties. For more details, see our <a href="/privacy-policy" className="text-blue-700 underline">Privacy Policy</a>.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Alternative Support</h2>
          <p>If you prefer, you can also reach out to us via our social media channels or check our <a href="/faq" className="text-blue-700 underline">FAQ</a> for quick answers to common questions.</p>
        </section>
      </div>
    </div>
  )
} 