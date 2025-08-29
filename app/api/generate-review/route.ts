import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
    let body;
    let businessName = '';
    let rating = 5;

    try {
        console.log('🤖 AI Review Generation API called')
        console.log('🤖 GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY)

        body = await request.json()
        const { businessName: bn, businessType, experienceType, rating: r } = body
        businessName = bn || 'this business'
        rating = r || 5

        console.log('🤖 Received data:', { businessName, businessType, experienceType, rating })

        if (!process.env.GEMINI_API_KEY) {
            throw new Error('AI service is not configured')
        }

        // Create the model
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        // Create a detailed prompt for generating authentic reviews
        const prompt = `Generate a helpful and authentic Google review for a business called "${businessName}" which is a ${businessType}. 

The review should be:
- ${rating} stars (out of 5)
- Experience type: ${experienceType}
- Natural and conversational tone
- Specific and helpful to other customers
- Around 50-80 words
- Mention specific aspects like service, quality, atmosphere, or value
- Sound like a real person wrote it
- Include both positives and constructive feedback if appropriate

Guidelines:
- Don't be overly promotional
- Be honest and balanced
- Include specific details that make it credible
- Use casual, friendly language
- Mention something specific about the experience

Generate only the review text, no additional formatting or quotes.`

        // Generate the review
        const result = await model.generateContent(prompt)
        const response = await result.response
        const reviewText = response.text()

        console.log('🤖 Generated review successfully')

        return NextResponse.json({
            success: true,
            review: reviewText.trim(),
            businessName,
            rating
        })

    } catch (error) {
        console.error('❌ Error generating AI review:', error)

        // Use the already parsed data or fallback values
        const fallbackReviews = {
            5: `Had an excellent experience at ${businessName}! The service was outstanding and everything exceeded my expectations. Highly recommend to anyone looking for quality and professional service. Will definitely be coming back!`,
            4: `Great experience at ${businessName}! The service was very good and the staff was helpful. A few minor things could be improved, but overall very satisfied with my visit. Would recommend to others.`,
            3: `Decent experience at ${businessName}. The service was okay and met basic expectations. There's room for improvement in some areas, but it wasn't bad. Might visit again in the future.`,
            2: `Had some issues during my visit to ${businessName}. The service could definitely be better and there were several areas that need improvement. Hope they can address these concerns.`,
            1: `Unfortunately had a poor experience at ${businessName}. Multiple issues with service and quality. Hope the management takes feedback seriously and makes necessary improvements.`
        }

        return NextResponse.json({
            success: true,
            review: fallbackReviews[rating as keyof typeof fallbackReviews] || fallbackReviews[5],
            businessName: businessName,
            rating: rating,
            fallback: true
        })
    }
}
