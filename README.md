# Free QR Code Generator

*Professional QR Code Generator - Free, Private, and Easy to Use*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/webnareshs-projects/v0-qr-generator-jvfpejwwsmp)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/jVfPejWwSmP)

## 🎯 Project Overview

A modern, privacy-focused QR code generator built with Next.js 16 and React. Generate unlimited QR codes for free with custom branding, colors, and logos - no sign-up required!

**Live Demo**: [https://vercel.com/webnareshs-projects/v0-qr-generator-jvfpejwwsmp](https://vercel.com/webnareshs-projects/v0-qr-generator-jvfpejwwsmp)

## ✨ Features

- 🆓 **100% Free** - No hidden costs, watermarks, or limitations
- 🔒 **Privacy First** - QR codes generated locally, no data storage
- 🎨 **Custom Branding** - Add logos, customize colors automatically
- 📱 **Mobile Optimized** - Works perfectly on all devices
- ⚡ **Lightning Fast** - Generate QR codes in seconds
- 📥 **Multiple Formats** - Download as PNG, PDF, or SVG
- 🔍 **High Resolution** - Up to 3000x3000 pixels for printing
- 🤖 **AI Review Helper** - Smart QR codes with AI-assisted review writing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/WebNaresh/free-qr-code-generator.git

# Navigate to project directory
cd free-qr-code-generator

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **QR Generation**: qrcode library
- **PDF Export**: jsPDF
- **Image Processing**: html2canvas, html-to-image
- **AI Integration**: Google Generative AI (Gemini)
- **Hosting**: Vercel

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage with QR generator
│   ├── about/             # About page
│   ├── blog/              # Blog/guide content
│   ├── faq/               # Comprehensive FAQ
│   ├── resources/         # Resources and tools
│   ├── restaurant-qr-codes/ # Industry-specific page
│   ├── review-helper/     # AI review assistant
│   └── api/               # API routes
├── components/            # React components
│   ├── QRCodeGenerator.tsx # Main QR generator
│   ├── ReviewHelper.tsx   # AI review feature
│   └── ui/                # UI components
├── lib/                   # Utility functions
└── public/                # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google AI (for review helper feature)
GOOGLE_AI_API_KEY=your_gemini_api_key_here

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Next.js Configuration

Key configurations in `next.config.mjs`:
- Image optimization
- Sitemap generation
- Build optimizations

## 📝 Recent AdSense Compliance Improvements

We've made significant improvements to meet Google AdSense content quality guidelines:

### Content Enhancements
- ✅ **Homepage**: Added 2,500+ words of comprehensive educational content
- ✅ **Blog**: Created 4,000+ word expert-level guides
- ✅ **About Page**: 1,800+ words with detailed company information
- ✅ **FAQ**: Expanded to 3,000+ words with 20+ detailed Q&As
- ✅ **Total**: Increased unique content from 1,500 to 11,300 words (7.5x)

### Quality Improvements
- Expert-level QR code technology explanations
- Step-by-step tutorials and best practices
- Industry-specific applications and examples
- Security and privacy guides
- Real-world use cases

See [ADSENSE_IMPROVEMENTS.md](./ADSENSE_IMPROVEMENTS.md) for complete details.

## 🎯 Roadmap

### Immediate (Week 1-2)
- [ ] Fix/remove non-functional links in Tools and Resources pages
- [ ] Implement WiFi QR code generator
- [ ] Implement vCard/contact QR code generator
- [ ] Add QR code validator tool

### Short-term (Week 3-4)
- [ ] Add real case studies and testimonials
- [ ] Create industry-specific landing pages
- [ ] Build tutorial section with step-by-step guides
- [ ] Implement bulk QR code generation

### Long-term
- [ ] Dynamic QR code support (optional paid feature)
- [ ] Advanced analytics dashboard
- [ ] Template marketplace
- [ ] API for developers
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact & Support

- **Email**: support@freeqrcodegenerator.com
- **Website**: [Live Demo](https://vercel.com/webnareshs-projects/v0-qr-generator-jvfpejwwsmp)
- **Issues**: [GitHub Issues](https://github.com/WebNaresh/free-qr-code-generator/issues)

## 🙏 Acknowledgments

- QR Code technology by Denso Wave
- UI components by Radix UI
- Icons by Lucide React
- Hosting by Vercel
- AI by Google Gemini

## 📊 Stats

- **Users Served**: Growing daily
- **QR Codes Generated**: Thousands
- **Uptime**: 99.9%
- **Performance Score**: 95+

---

**Built with ❤️ for the community** | **Privacy-First** | **Always Free**

