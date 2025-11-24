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
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Story</h2>
          <p className="mb-4 leading-relaxed">
            Free QR Code Generator was born in 2023 out of a simple yet powerful observation: businesses and individuals 
            needed a reliable, truly free tool to create QR codes without the hidden costs, watermarks, or data privacy 
            concerns that plagued existing solutions. As developers and entrepreneurs ourselves, we experienced firsthand 
            the frustration of "free" services that charged for basic features or compromised user privacy.
          </p>
          <p className="mb-4 leading-relaxed">
            Our founding team, comprising software engineers from companies like Google, Microsoft, and various startups, 
            came together with a shared vision: make QR code generation accessible to everyone while maintaining the 
            highest standards of quality and privacy. We started by building the tool we wished existed - one that puts 
            users first, always.
          </p>
          <p className="mb-4 leading-relaxed">
            What started as a weekend project quickly grew into a platform serving thousands of users daily. From small 
            businesses creating their first digital menu to large enterprises deploying QR codes across thousands of 
            locations, we've been humbled by the trust our users place in us. This trust drives our commitment to 
            continuous improvement and innovation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h2>
          <p className="mb-4 leading-relaxed">
            Our mission is to democratize QR code technology by providing free, high-quality tools that empower businesses, 
            creators, and individuals to connect and share information effortlessly. We believe that powerful technology 
            shouldn't be locked behind paywalls or compromised by invasive data collection practices.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-4">
            <h3 className="font-bold text-lg mb-2">Our Core Principles</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span><strong>Accessibility First:</strong> Essential features always free, no compromises</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span><strong>Privacy by Design:</strong> Your data is yours, we never store or sell it</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span><strong>Quality Without Exception:</strong> Free doesn't mean low-quality</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span><strong>Community-Driven Innovation:</strong> We build what you need</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">What Makes Us Unique?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-gray-900">🎯 Truly Free, Forever</h3>
              <p className="text-sm mb-3">
                No hidden fees, no watermarks, no "premium" features. What you see is what you get - a fully functional 
                QR code generator without any gimmicks. We're committed to keeping our core service free indefinitely.
              </p>
              <p className="text-xs text-gray-600 italic">
                We're sustainable through ethical advertising and optional donations from users who love our service.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-gray-900">🔒 Privacy First</h3>
              <p className="text-sm mb-3">
                Unlike many competitors, we don't store your QR codes or track your usage beyond basic analytics. 
                Many QR codes are generated entirely in your browser without ever touching our servers.
              </p>
              <p className="text-xs text-gray-600 italic">
                We're GDPR and CCPA compliant, and we actually mean it.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-gray-900">🎨 Customizable & Professional</h3>
              <p className="text-sm mb-3">
                Generate QR codes for URLs, text, contact information, WiFi credentials, Google reviews, and more. 
                Customize colors, add logos, and download in multiple formats (PNG, SVG, PDF) at high resolution.
              </p>
              <p className="text-xs text-gray-600 italic">
                Professional quality that rivals expensive paid services.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-gray-900">⚡ Modern & Fast</h3>
              <p className="text-sm mb-3">
                Built with cutting-edge web technologies, our platform is lightning-fast, mobile-optimized, and works 
                seamlessly across all devices. Generate and download QR codes in seconds, not minutes.
              </p>
              <p className="text-xs text-gray-600 italic">
                Powered by Next.js, React, and modern cloud infrastructure.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Meet the Team</h2>
          <p className="mb-4 leading-relaxed">
            We're a distributed team of passionate developers, designers, and QR code enthusiasts. Our backgrounds 
            span software engineering, UX design, digital marketing, and product management. What unites us is a 
            commitment to building tools that genuinely help people.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-4">
            <h3 className="font-bold text-lg mb-3">Our Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Engineering Team</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Full-stack development</li>
                  <li>• Cloud architecture</li>
                  <li>• Security & encryption</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Design Team</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• UI/UX design</li>
                  <li>• Accessibility standards</li>
                  <li>• Brand development</li>
                  <li>• User research</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Product Team</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Feature planning</li>
                  <li>• User feedback analysis</li>
                  <li>• Quality assurance</li>
                  <li>• Documentation</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 italic">
            We're always working to improve and welcome your feedback! If you have suggestions, questions, or just want 
            to say hello, don't hesitate to reach out through our contact page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Technology Stack</h2>
          <p className="mb-4 leading-relaxed">
            We believe in using the best tools for the job and staying current with technology. Here's what powers 
            our platform:
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-bold mb-2">Frontend</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Next.js 16 (React framework)</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Advanced QR code libraries</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Infrastructure</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Vercel for hosting</li>
                  <li>• Edge computing for speed</li>
                  <li>• CDN for global delivery</li>
                  <li>• 99.9% uptime guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Vision for the Future</h2>
          <p className="mb-4 leading-relaxed">
            We're committed to continuous innovation while keeping our core service free. Here's what we're working on:
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-bold text-gray-900">Enhanced Customization</h4>
              <p className="text-sm text-gray-700">
                More design templates, advanced color schemes, and custom branding options to make your QR codes 
                truly unique while maintaining scannability.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-bold text-gray-900">AI-Powered Features</h4>
              <p className="text-sm text-gray-700">
                Intelligent QR code optimization, automatic design suggestions, and AI-assisted content creation 
                to help you create the perfect QR code for your needs.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h4 className="font-bold text-gray-900">Advanced Analytics (Optional)</h4>
              <p className="text-sm text-gray-700">
                For users who want it, we're building optional analytics features that respect privacy while 
                providing valuable insights into QR code performance.
              </p>
            </div>
            
            <div className="border-l-4 border-pink-500 pl-4 py-2">
              <h4 className="font-bold text-gray-900">Community Features</h4>
              <p className="text-sm text-gray-700">
                Template sharing, best practice guides, and a community forum where users can learn from each 
                other and share creative QR code applications.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Commitment to Sustainability</h2>
          <p className="mb-4 leading-relaxed">
            We're building a sustainable business model that doesn't rely on exploiting user data or forcing users 
            into paid plans. Our revenue comes from:
          </p>
          
          <ul className="space-y-2 text-gray-700 mb-4">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">•</span>
              <span><strong>Ethical Advertising:</strong> Non-intrusive ads that respect your experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">•</span>
              <span><strong>Voluntary Support:</strong> Users who love our service can choose to support us</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">•</span>
              <span><strong>Enterprise Solutions:</strong> Custom solutions for large organizations with specific needs</span>
            </li>
          </ul>
          
          <p className="text-sm text-gray-600 italic">
            100% of our revenue goes back into improving the platform and keeping it free for everyone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
          <p className="mb-4">
            We love hearing from our users! Whether you have questions, suggestions, feedback, or just want to 
            share how you're using QR codes, we're here to help.
          </p>
          
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">General Inquiries</h4>
                <p className="text-sm text-gray-700 mb-1">Email: hello@freeqrcodegenerator.com</p>
                <p className="text-xs text-gray-600">We typically respond within 24-48 hours</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support</h4>
                <p className="text-sm text-gray-700 mb-1">Email: support@freeqrcodegenerator.com</p>
                <p className="text-xs text-gray-600">Technical help and troubleshooting</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Feature Requests</h4>
                <p className="text-sm text-gray-700 mb-1">Visit our Contact page</p>
                <p className="text-xs text-gray-600">Share your ideas for improvements</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Business Partnerships</h4>
                <p className="text-sm text-gray-700 mb-1">Email: partnerships@freeqrcodegenerator.com</p>
                <p className="text-xs text-gray-600">Collaboration and integration opportunities</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Thousands of Satisfied Users</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Whether you're a small business owner, marketer, educator, or just someone who needs a QR code, 
            we're here to help you succeed.
          </p>
          <a 
            href="/" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-lg"
          >
            Create Your First QR Code →
          </a>
        </section>
      </div>
    </div>
  )
} 