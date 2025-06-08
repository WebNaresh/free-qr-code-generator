import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Free QR Code Generator',
  description: 'Learn more about the Free QR Code Generator project, our mission, and what makes us unique.',
}

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Free QR Code Generator</h1>
      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p>Our mission is to make QR code creation accessible, free, and easy for everyone. We believe in empowering businesses, creators, and individuals with the tools they need to connect and share information effortlessly.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">What Makes Us Unique?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Truly Free:</strong> No hidden fees, no watermarks, and no required signups for basic features.</li>
            <li><strong>Privacy First:</strong> We do not store your data or generated QR codes. Your privacy is our priority.</li>
            <li><strong>Customizable & Versatile:</strong> Generate QR codes for a wide range of uses, with full customization options.</li>
            <li><strong>Modern & User-Friendly:</strong> Our platform is designed for speed, simplicity, and accessibility on any device.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
          <p>We are a team of developers and designers passionate about making digital tools that are open, useful, and user-centric. We're always working to improve and welcome your feedback!</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>Have questions, suggestions, or feedback? Visit our Contact page or email us at support@freeqrcodegenerator.com.</p>
        </section>
      </div>
    </div>
  )
} 