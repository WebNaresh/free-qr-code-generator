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

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing email configuration...')
    console.log('🧪 NEXT_EMAIL_USER:', process.env.NEXT_EMAIL_USER)
    console.log('🧪 NEXT_EMAIL_PASS exists:', !!process.env.NEXT_EMAIL_PASS)
    console.log('🧪 NEXT_EMAIL_PASS length:', process.env.NEXT_EMAIL_PASS?.length)

    // Test email content
    const testEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4285F4; padding-bottom: 10px;">🧪 Email Test</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Test Information</h3>
          <p><strong>⏰ Test Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>📧 From:</strong> ${process.env.NEXT_EMAIL_USER}</p>
          <p><strong>📧 To:</strong> navibyteinnovations@gmail.com</p>
          <p><strong>🔧 Status:</strong> Email configuration is working!</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            <em>🧪 Test email from Free QR Code Generator</em>
          </p>
        </div>
      </div>
    `

    // Send test email
    console.log('🧪 Sending test email...')
    const emailResult = await transporter.sendMail({
      from: process.env.NEXT_EMAIL_USER,
      to: 'navibyteinnovations@gmail.com',
      subject: '🧪 Email Configuration Test',
      html: testEmailContent,
    })

    console.log('🧪 Test email sent successfully:', emailResult.messageId)

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: emailResult.messageId,
      emailUser: process.env.NEXT_EMAIL_USER,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('🧪 Test email failed:', error)
    return NextResponse.json({
      success: false,
      message: 'Test email failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      emailUser: process.env.NEXT_EMAIL_USER,
      hasPassword: !!process.env.NEXT_EMAIL_PASS
    }, { status: 500 })
  }
}
