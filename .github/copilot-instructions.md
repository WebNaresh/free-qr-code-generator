# GitHub Copilot Instructions - Free QR Code Generator

## Project Architecture

**Core Purpose**: Privacy-focused, client-side QR code generator with Google AdSense monetization strategy.

### Tech Stack & Versions
- **Next.js 16** (App Router) - All pages in `app/` directory, not `pages/`
- **React 19.2.0** - Uses latest concurrent features
- **TypeScript 5.0.2** - Note: Build ignores TS errors (`ignoreBuildErrors: true` in next.config)
- **Tailwind CSS** - Utility-first styling with `cn()` helper from `lib/utils.ts`
- **Radix UI** - All UI components (`components/ui/`) use Radix primitives
- **QR Libraries**: `qrcode` (generation), `jsqr` (scanning/validation)
- **Export**: `jspdf`, `html2canvas`, `html-to-image` for download formats

### Critical Architectural Decisions

**1. Client-Side First Philosophy**
- ALL QR generation happens in browser (privacy guarantee)
- Components use `"use client"` directive extensively
- No server-side QR generation - this is a core value proposition
- Example: `QRCodeGenerator.tsx` (1,761 lines) processes everything locally

**2. AdSense Compliance Strategy**
- **Content Requirement**: Minimum 1,000+ words per page for approval
- **Recent Enhancement**: Increased from 1,500 → 11,300 total words (see `ADSENSE_IMPROVEMENTS.md`)
- **Ad Placement Pattern**: Use pre-built components from `components/AdSense.tsx`
  ```tsx
  import { TopBannerAd, ContentAd, BottomBannerAd } from '@/components/AdSense'
  // Then place: <TopBannerAd /> instead of placeholder divs
  ```
- **"Coming Soon" Pattern**: Mark incomplete features with badges, disable links (see `app/tools/page.tsx`)
  ```tsx
  {!tool.available && <span className="bg-yellow-100 text-yellow-800">Coming Soon</span>}
  ```

**3. Color Extraction System** (Unique to this project)
- Logo upload triggers automatic color palette extraction
- Uses HTML Canvas API for dominant color detection
- Located in `QRCodeGenerator.tsx` lines 100-300 (approx)
- Color state: `logoColors`, `detectedColors`, multiple index trackers
- This powers the "smart color matching" feature

**4. Dual QR Type Architecture**
```tsx
qrType: "feedback" | "website"
// "feedback" = Google Review QR codes with AI helper
// "website" = Standard URL QR codes
```

## Development Workflows

### Quick Start
```bash
pnpm install  # NOT npm - project uses pnpm
pnpm dev      # Development server on :3000
pnpm build    # Production build (runs next-sitemap post-build)
```

### Development Mode Defaults
The `QRCodeGenerator` component auto-fills test data in dev mode:
```tsx
const isDevelopment = process.env.NODE_ENV === 'development'
const [url, setUrl] = useState(isDevelopment ? "test-url" : "")
```
This speeds up iteration - remove when building new features.

### Environment Variables Required
```env
GOOGLE_AI_API_KEY=xxx  # For AI review helper (Gemini API)
NEXT_PUBLIC_GA_ID=xxx  # Google Analytics (optional)
```

### Adding New Tools
Pattern established in `app/tools/wifi-qr/`, `app/tools/vcard-qr/`, `app/tools/qr-validator/`:
1. Create `app/tools/[tool-name]/page.tsx`
2. Import QRCode generation: `import QRCode from 'qrcode'`
3. Use client-side form state, validate inputs, generate locally
4. Add download functionality (PNG/PDF)
5. Update `app/tools/page.tsx` to list it with `available: true`
6. Include comprehensive instructions section (500+ words for AdSense)

## Project-Specific Patterns

### Component Structure Convention
```tsx
// 1. Client directive (most components need this)
"use client"

// 2. State declarations with development defaults
const [state, setState] = useState(isDev ? "test" : "")

// 3. Responsive detection (common pattern)
const [isMobile, setIsMobile] = useState(false)
useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768)
  check()
  window.addEventListener("resize", check)
  return () => window.removeEventListener("resize", check)
}, [])

// 4. Toast notifications for UX feedback
import { toast } from "sonner"
toast.success("Generated!")  // Always provide user feedback
```

### Page Metadata Pattern (SEO Critical)
Every page MUST export metadata for AdSense approval:
```tsx
export const metadata: Metadata = {
  title: 'Specific Title | Free QR Code Generator',
  description: 'Detailed 150-160 char description',
  keywords: 'relevant, keywords, list'
}
```

### QR Code Generation Standard
```tsx
const qrDataUrl = await QRCode.toDataURL(data, {
  errorCorrectionLevel: 'M',  // Medium error correction (standard)
  type: 'image/png',
  quality: 1,
  margin: 1,
  width: 1000,  // High resolution for printing
  color: {
    dark: '#000000',
    light: '#ffffff',
  },
})
```

### AdSense Component Usage
Replace placeholder ad sections with real components:
```tsx
// OLD (placeholder):
<div className="bg-gray-100 border-2 border-dashed">
  <p>Advertisement Space</p>
</div>

// NEW (functional):
import { TopBannerAd, ContentAd } from '@/components/AdSense'
<TopBannerAd />  // Auto-handles responsive sizing
```

## Integration Points

### Google Gemini AI Integration
- Location: `app/api/generate-review/route.ts`
- Used by: `components/ReviewHelper.tsx`
- Purpose: AI-assisted Google review writing for QR codes
- Rate limiting: Client-side throttling in component
- Error handling: Graceful fallback if API key missing

### Analytics & Tracking
- Vercel Analytics: `@vercel/analytics/next` in `app/layout.tsx`
- Google Analytics: GTM script in layout head
- QR tracking: `app/api/track-qr/route.ts` (privacy-conscious, minimal data)

### External Services
- **Vercel Hosting**: Auto-deploy on push to main
- **AdSense**: Publisher ID `ca-pub-4895071519734738` hardcoded
- **No Database**: Stateless by design (privacy feature)
- **No Auth**: Intentionally open access

## Common Pitfalls & Solutions

### 1. Image Export Issues
- Use `html2canvas` for QR with logos (handles complex DOM)
- Use `QRCode.toDataURL()` for simple QR (faster)
- ALWAYS handle errors - image export is fragile:
  ```tsx
  try {
    const dataUrl = await html2canvas(element)
  } catch (error) {
    toast.error('Export failed - try without logo')
  }
  ```

### 2. Mobile Responsiveness
- Test on mobile FIRST - 60%+ traffic is mobile
- Use responsive breakpoints: `md:` (768px), `lg:` (1024px)
- Camera access for QR scanning requires HTTPS (works on localhost)

### 3. Content Length for AdSense
- Pages MUST have 1,000+ words minimum
- Use structured sections with headings (H2, H3)
- Include "How to Use" sections with step-by-step instructions
- See `app/blog/page.tsx` (4,000 words) as reference

### 4. Build Warnings to Ignore
- TypeScript errors (intentionally ignored in config)
- React 19 compatibility warnings (overrides in package.json handle this)
- Missing alt tags (address these - SEO important)

## File Organization Logic

```
app/
├── page.tsx              # Homepage - main QR generator (most traffic)
├── tools/                # Individual tool pages (WiFi, vCard, Validator)
├── blog/                 # SEO content (static, high word count)
├── api/                  # Server actions (feedback, review gen, tracking)
└── [info-pages]/         # About, FAQ, Privacy, Terms (required for AdSense)

components/
├── QRCodeGenerator.tsx   # 1,761 lines - core feature, complex color logic
├── ReviewHelper.tsx      # AI integration component
├── AdSense.tsx           # Pre-configured ad placements
└── ui/                   # Radix UI wrappers (don't modify directly)
```

## Testing & Validation

### Before Committing
1. Check mobile rendering (60% of users)
2. Test QR code generation with/without logo
3. Verify download works (PNG, PDF, SVG)
4. Check console for errors (especially in production build)
5. Run `pnpm build` to catch build-time issues

### AdSense Pre-Submission Checklist
- [ ] Page has 1,000+ unique words
- [ ] No placeholder links (use "Coming Soon" badges instead)
- [ ] All tools are functional or clearly marked unavailable
- [ ] AdSense components imported and placed
- [ ] Privacy policy and terms pages exist
- [ ] No copyright violations in content

## Key Files Reference

- **`components/QRCodeGenerator.tsx`** - Main generator logic, color extraction, export
- **`app/tools/page.tsx`** - Tool directory, demonstrates "Coming Soon" pattern
- **`components/AdSense.tsx`** - Ad placement components (TopBanner, ContentAd, etc.)
- **`app/layout.tsx`** - Global metadata, analytics, SEO setup
- **`next.config.mjs`** - Security headers, CSP for AdSense
- **`ADSENSE_IMPROVEMENTS.md`** - Content strategy documentation

## Content Strategy

When adding new pages or features:
1. **Minimum 1,000 words** of unique, valuable content
2. **H2/H3 structure** for readability and SEO
3. **Examples and tutorials** - show don't just tell
4. **"How to Use" sections** - 4-step processes work well
5. **Privacy notes** - remind users data stays local
6. **Mobile instructions** - most users are on phones

---

*Last Updated: November 2024 | For questions: See README.md*
