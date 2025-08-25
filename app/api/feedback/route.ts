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
    console.log('💬 Feedback API called')
    console.log('💬 NEXT_EMAIL_USER:', process.env.NEXT_EMAIL_USER)
    console.log('💬 NEXT_EMAIL_PASS exists:', !!process.env.NEXT_EMAIL_PASS)

    const body = await request.json()
    const { name, email, subject, message, rating, timestamp } = body

    console.log('💬 Received feedback:', { name, email, subject, rating })

    // Get user info
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || 'Direct'

    // Prepare email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4285F4; padding-bottom: 10px;">💬 New Feedback/Suggestion</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Contact Information</h3>
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>📝 Subject:</strong> ${subject}</p>
          ${rating ? `<p><strong>⭐ Rating:</strong> ${rating}/5 stars</p>` : ''}
        </div>

        <div style="background: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Message</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #4285F4;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="background: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Technical Details</h3>
          <p><strong>⏰ Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
          <p><strong>🌍 IP Address:</strong> ${realIp}</p>
          <p><strong>🔗 Referrer:</strong> ${referer}</p>
          <p><strong>💻 User Agent:</strong> ${userAgent}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            <em>💬 Feedback from Free QR Code Generator</em>
          </p>
        </div>
      </div>
    `

    // Send email notification
    console.log('💬 Attempting to send email...')
    const emailResult = await transporter.sendMail({
      from: process.env.NEXT_EMAIL_USER || 'noreply@freeqrcodegenerator.shop',
      to: 'navibyteinnovations@gmail.com',
      subject: `💬 Feedback: ${subject}`,
      html: emailContent,
      replyTo: email, // Allow direct reply to the user
    })

    console.log('💬 Email sent successfully:', emailResult.messageId)
    console.log('💬 Feedback submitted:', { name, email, subject, rating })

    return NextResponse.json({ success: true, message: 'Feedback sent successfully!' })
  } catch (error) {
    console.error('❌ Error sending feedback:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to send feedback. Please try again.'
    }, { status: 500 })
  }
}
