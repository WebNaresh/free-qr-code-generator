import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NEXT_EMAIL_USER,
    pass: process.env.NEXT_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
})

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Email tracking API called')
    console.log('📧 NEXT_EMAIL_USER:', process.env.NEXT_EMAIL_USER)
    console.log('📧 NEXT_EMAIL_PASS exists:', !!process.env.NEXT_EMAIL_PASS)

    const body = await request.json()
    const { businessName, url, contactNumber, qrType, timestamp, userAgent } = body

    console.log('📧 Received data:', { businessName, url, contactNumber, qrType })

    // Get real IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Get additional headers for tracking
    const referer = request.headers.get('referer') || 'Direct'
    const acceptLanguage = request.headers.get('accept-language') || 'unknown'

    const trackingData = {
      businessName,
      url,
      contactNumber: contactNumber || 'Not provided',
      qrType,
      timestamp: new Date(timestamp).toLocaleString(),
      userAgent,
      ip: realIp,
      referer,
      language: acceptLanguage,
    }

    // Prepare email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4285F4; padding-bottom: 10px;">🎯 New QR Code Generated</h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Business Information</h3>
          <p><strong>📊 Business Name:</strong> ${businessName}</p>
          <p><strong>🌐 URL:</strong> <a href="${url}" target="_blank">${url}</a></p>
          <p><strong>📞 Contact:</strong> ${contactNumber || 'Not provided'}</p>
          <p><strong>🏷️ QR Type:</strong> ${qrType === 'feedback' ? '⭐ Feedback/Reviews' : '🌐 Website'}</p>
        </div>

        <div style="background: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Technical Details</h3>
          <p><strong>⏰ Generated:</strong> ${new Date(timestamp).toLocaleString()}</p>
          <p><strong>🌍 IP Address:</strong> ${realIp}</p>
          <p><strong>🔗 Referrer:</strong> ${referer}</p>
          <p><strong>🗣️ Language:</strong> ${acceptLanguage}</p>
          <p><strong>💻 User Agent:</strong> ${userAgent}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            <em>📱 Generated via Free QR Code Generator</em>
          </p>
        </div>
      </div>
    `

    // Send email notification to your email
    console.log('🎯 Attempting to send QR tracking email...')
    const emailResult = await transporter.sendMail({
      from: process.env.NEXT_EMAIL_USER || 'noreply@freeqrcodegenerator.shop',
      to: 'navibyteinnovations@gmail.com',
      subject: `🎯 New QR Code: ${businessName} (${qrType})`,
      html: emailContent,
    })

    console.log('🎯 QR tracking email sent successfully:', emailResult.messageId)
    console.log('🎯 QR Code Generated:', trackingData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Error tracking QR code:', error)
    // Return success even if tracking fails to not break user experience
    return NextResponse.json({ success: true })
  }
}
