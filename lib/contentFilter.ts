// Content filtering and moderation utilities

interface FilterResult {
  isAllowed: boolean
  reason?: string
  category?: string
}

// Prohibited content patterns
const PROHIBITED_PATTERNS = {
  malicious: [
    /malware/i,
    /virus/i,
    /trojan/i,
    /phishing/i,
    /scam/i,
    /fraud/i,
    /hack/i,
    /exploit/i,
  ],
  adult: [
    /porn/i,
    /xxx/i,
    /adult/i,
    /sex/i,
    /nude/i,
    /nsfw/i,
  ],
  illegal: [
    /drugs/i,
    /cocaine/i,
    /heroin/i,
    /marijuana/i,
    /weapons/i,
    /bomb/i,
    /terrorism/i,
    /illegal/i,
  ],
  spam: [
    /click here/i,
    /free money/i,
    /get rich quick/i,
    /miracle cure/i,
    /lose weight fast/i,
  ],
  violence: [
    /kill/i,
    /murder/i,
    /violence/i,
    /harm/i,
    /threat/i,
  ]
}

// Suspicious URL patterns
const SUSPICIOUS_URLS = [
  /bit\.ly/i,
  /tinyurl/i,
  /t\.co/i,
  /goo\.gl/i,
  /ow\.ly/i,
  /is\.gd/i,
  /buff\.ly/i,
  // Add more suspicious shorteners
]

// Known malicious domains (simplified list)
const BLOCKED_DOMAINS = [
  'malware-site.com',
  'phishing-example.com',
  'scam-website.org',
  // Add more as needed
]

export function validateQRContent(content: string): FilterResult {
  if (!content || content.trim().length === 0) {
    return {
      isAllowed: false,
      reason: 'Content cannot be empty',
      category: 'validation'
    }
  }

  // Check content length
  if (content.length > 2000) {
    return {
      isAllowed: false,
      reason: 'Content is too long (max 2000 characters)',
      category: 'validation'
    }
  }

  // Check for prohibited patterns
  for (const [category, patterns] of Object.entries(PROHIBITED_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        return {
          isAllowed: false,
          reason: `Content contains prohibited ${category} material`,
          category
        }
      }
    }
  }

  // If content looks like a URL, perform additional checks
  if (isURL(content)) {
    return validateURL(content)
  }

  return { isAllowed: true }
}

function isURL(text: string): boolean {
  try {
    new URL(text)
    return true
  } catch {
    return text.match(/^https?:\/\//i) !== null
  }
}

function validateURL(url: string): FilterResult {
  try {
    const urlObj = new URL(url)
    
    // Check for blocked domains
    const domain = urlObj.hostname.toLowerCase()
    if (BLOCKED_DOMAINS.includes(domain)) {
      return {
        isAllowed: false,
        reason: 'This domain is blocked for security reasons',
        category: 'security'
      }
    }

    // Check for suspicious URL shorteners
    for (const pattern of SUSPICIOUS_URLS) {
      if (pattern.test(domain)) {
        return {
          isAllowed: false,
          reason: 'URL shorteners are not allowed for security reasons',
          category: 'security'
        }
      }
    }

    // Check for suspicious protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        isAllowed: false,
        reason: 'Only HTTP and HTTPS URLs are allowed',
        category: 'security'
      }
    }

    // Check for suspicious ports
    const suspiciousPorts = ['22', '23', '25', '53', '110', '143', '993', '995']
    if (urlObj.port && suspiciousPorts.includes(urlObj.port)) {
      return {
        isAllowed: false,
        reason: 'URLs with suspicious ports are not allowed',
        category: 'security'
      }
    }

    return { isAllowed: true }
  } catch (error) {
    return {
      isAllowed: false,
      reason: 'Invalid URL format',
      category: 'validation'
    }
  }
}

// Rate limiting for QR code generation
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(identifier: string, maxRequests = 50, windowMs = 3600000): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(identifier)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }

  if (userLimit.count >= maxRequests) {
    return false
  }

  userLimit.count++
  return true
}

// Content sanitization
export function sanitizeContent(content: string): string {
  return content
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .substring(0, 2000) // Limit length
}

// Log suspicious activity
export function logSuspiciousActivity(
  content: string, 
  reason: string, 
  userAgent?: string, 
  ip?: string
): void {
  // In a real application, you would log this to your security monitoring system
  console.warn('Suspicious QR code generation attempt:', {
    content: content.substring(0, 100) + '...',
    reason,
    userAgent,
    ip,
    timestamp: new Date().toISOString()
  })
}

// Educational content for users
export const CONTENT_GUIDELINES = {
  allowed: [
    'Website URLs (https://example.com)',
    'Contact information (vCard format)',
    'WiFi network credentials',
    'Plain text messages',
    'Email addresses',
    'Phone numbers',
    'Social media profiles',
    'Business information'
  ],
  prohibited: [
    'Malicious or harmful content',
    'Adult or inappropriate material',
    'Illegal activities or substances',
    'Spam or misleading content',
    'Threats or violent content',
    'Copyrighted material without permission',
    'Personal information of others',
    'URL shorteners or suspicious links'
  ],
  tips: [
    'Always test your QR code before sharing',
    'Use HTTPS URLs when possible',
    'Keep content concise and relevant',
    'Respect privacy and intellectual property',
    'Provide clear context about what the QR code contains'
  ]
}
