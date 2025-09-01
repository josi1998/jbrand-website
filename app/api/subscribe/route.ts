import { type NextRequest, NextResponse } from "next/server"
import { subscribeSchema } from "../../../utils/validation"
import clientPromise from "../../../lib/mongodb"
import type { ObjectId } from "mongodb"
import nodemailer from "nodemailer"

// Types for better type safety
interface SubscriberData {
  email: string
  source?: string
  tags?: string[]
  preferences?: SubscriberPreferences
}

interface SubscriberPreferences {
  frequency: "daily" | "weekly" | "monthly"
  categories: string[]
  format: "html" | "text"
}

interface SubscriberRecord extends SubscriberData {
  _id?: ObjectId
  email: string
  status: "active" | "unsubscribed" | "bounced" | "pending"
  source: string
  subscribedAt: Date
  updatedAt: Date
  confirmedAt?: Date | undefined
  unsubscribedAt?: Date | undefined
  ipAddress?: string
  userAgent?: string
  tags: string[]
  preferences: SubscriberPreferences
  engagementScore: number
  lastEmailSent?: Date | undefined
  emailsSent: number
  emailsOpened: number
  emailsClicked: number
  bounceCount: number
  notes?: string
}

interface WelcomeEmailConfig {
  from: string
  to: string
  subject: string
  html: string
  text: string
}

// Environment configuration
const isDevelopment = process.env.NODE_ENV === "development" || !process.env.NODE_ENV

// Database configuration
const DB_NAME = process.env.MONGODB_DB_NAME || "jbrand"
const SUBSCRIBERS_COLLECTION = "subscribers"

// Default subscriber preferences
const DEFAULT_PREFERENCES: SubscriberPreferences = {
  frequency: "weekly",
  categories: ["general", "updates"],
  format: "html",
}

// Utility functions
const getClientInfo = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for")
  const realIp = req.headers.get("x-real-ip")
  const ipAddress = forwarded?.split(",")[0] || realIp || "unknown"
  const userAgent = req.headers.get("user-agent") || "unknown"

  return { ipAddress, userAgent }
}

const generateSubscriberTags = (data: SubscriberData, clientInfo: ReturnType<typeof getClientInfo>): string[] => {
  const tags: string[] = [...(data.tags || [])]

  // Add source-based tags
  if (data.source) {
    tags.push(`source-${data.source}`)
  }

  // Add device/browser tags based on user agent
  const userAgent = clientInfo.userAgent.toLowerCase()
  if (userAgent.includes("mobile")) tags.push("mobile-user")
  if (userAgent.includes("desktop")) tags.push("desktop-user")
  if (userAgent.includes("chrome")) tags.push("chrome-user")
  if (userAgent.includes("firefox")) tags.push("firefox-user")
  if (userAgent.includes("safari")) tags.push("safari-user")

  // Add timing tags
  const hour = new Date().getHours()
  if (hour >= 9 && hour <= 17) tags.push("business-hours")
  else tags.push("after-hours")

  // Add day-of-week tags
  const dayOfWeek = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
  tags.push(`${dayOfWeek}-subscriber`)

  return [...new Set(tags)] // Remove duplicates
}

// Unused function for future engagement scoring
/*
const calculateEngagementScore = (subscriber: Partial<SubscriberRecord>): number => {
  let score = 50 // Base score

  // Email engagement metrics
  if (subscriber.emailsSent && subscriber.emailsSent > 0) {
    const openRate = (subscriber.emailsOpened || 0) / subscriber.emailsSent
    const clickRate = (subscriber.emailsClicked || 0) / subscriber.emailsSent

    score += openRate * 30 // Up to 30 points for opens
    score += clickRate * 20 // Up to 20 points for clicks
  }

  // Bounce penalty
  if (subscriber.bounceCount && subscriber.bounceCount > 0) {
    score -= subscriber.bounceCount * 10
  }

  // Recency bonus
  if (subscriber.lastEmailSent) {
    const daysSinceLastEmail = (Date.now() - subscriber.lastEmailSent.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceLastEmail < 7) score += 10
    else if (daysSinceLastEmail < 30) score += 5
  }

  return Math.max(0, Math.min(100, score)) // Clamp between 0-100
}
*/

// Email configuration
const getEmailTransporter = () => {
  if (isDevelopment) return null

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

// Database operations
const addSubscriberToDatabase = async (
  data: SubscriberData,
  clientInfo: ReturnType<typeof getClientInfo>,
): Promise<{
  success: boolean
  isExisting: boolean
  id: ObjectId
  message: string
  subscriber?: SubscriberRecord
}> => {
  try {
    // Handle case where MongoDB is not configured
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️ MongoDB not configured - subscriber feature disabled');
      throw new Error('Database not configured');
    }
    
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection<SubscriberRecord>(SUBSCRIBERS_COLLECTION)

    // Check if subscriber already exists
    const existingSubscriber = await collection.findOne({ email: data.email })

    if (existingSubscriber) {
      // If unsubscribed, reactivate
      if (existingSubscriber.status === "unsubscribed") {
        const updatedSubscriber = await collection.findOneAndUpdate(
          { email: data.email },
          {
            $set: {
              status: "active",
              subscribedAt: new Date(),
              updatedAt: new Date(),
              unsubscribedAt: undefined,
              tags: generateSubscriberTags(data, clientInfo),
              source: data.source || existingSubscriber.source,
            },
          },
          { returnDocument: "after" },
        )

        console.log("✅ Subscriber reactivated:", data.email)
        return {
          success: true,
          isExisting: true,
          id: existingSubscriber._id!,
          message: "Subscription reactivated successfully",
          subscriber: updatedSubscriber!,
        }
      }

      // If already active, update tags and source
      if (existingSubscriber.status === "active") {
        const updatedTags = [...new Set([...existingSubscriber.tags, ...generateSubscriberTags(data, clientInfo)])]

        await collection.updateOne(
          { email: data.email },
          {
            $set: {
              updatedAt: new Date(),
              tags: updatedTags,
              source: data.source || existingSubscriber.source,
            },
          },
        )

        console.log("ℹ️ Existing active subscriber updated:", data.email)
        return {
          success: true,
          isExisting: true,
          id: existingSubscriber._id!,
          message: "Already subscribed - preferences updated",
          subscriber: existingSubscriber,
        }
      }
    }

    // Create new subscriber
    const newSubscriber: Omit<SubscriberRecord, "_id"> = {
      email: data.email,
      status: "active",
      source: data.source || "direct",
      subscribedAt: new Date(),
      updatedAt: new Date(),
      ipAddress: clientInfo.ipAddress,
      userAgent: clientInfo.userAgent,
      tags: generateSubscriberTags(data, clientInfo),
      preferences: { ...DEFAULT_PREFERENCES, ...data.preferences },
      engagementScore: 50, // Default score for new subscribers
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
      bounceCount: 0,
    }

    const result = await collection.insertOne(newSubscriber)

    console.log("✅ New subscriber added:", {
      id: result.insertedId,
      email: data.email,
      source: newSubscriber.source,
      tags: newSubscriber.tags,
    })

    return {
      success: true,
      isExisting: false,
      id: result.insertedId,
      message: "Subscribed successfully",
      subscriber: { ...newSubscriber, _id: result.insertedId },
    }
  } catch (error) {
    console.error("❌ MongoDB Error:", error)
    throw new Error(`Database operation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Welcome email operations
const sendWelcomeEmail = async (subscriber: SubscriberRecord) => {
  const transporter = getEmailTransporter()

  const welcomeEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to JBrand Newsletter</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2465ED 0%, #1d4ed8 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #ffffff; padding: 30px 20px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .welcome-message { font-size: 18px; margin-bottom: 20px; }
        .benefits { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .benefit-item { display: flex; align-items: center; margin-bottom: 10px; }
        .benefit-icon { margin-right: 10px; font-size: 20px; }
        .cta-button { display: inline-block; background: #2465ED; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
        .unsubscribe { color: #9ca3af; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to JBrand!</h1>
          <p>Thank you for joining our creative community</p>
        </div>
        <div class="content">
          <div class="welcome-message">
            <p>Hi there! 👋</p>
            <p>We're thrilled to have you as part of the JBrand family. You've just joined a community of creative professionals and business owners who are passionate about exceptional design and digital solutions.</p>
          </div>
          
          <div class="benefits">
            <h3>Here's what you can expect:</h3>
            <div class="benefit-item">
              <span class="benefit-icon">🎨</span>
              <span>Design tips and creative inspiration</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">💡</span>
              <span>Industry insights and trends</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">🚀</span>
              <span>Exclusive offers and early access</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">📚</span>
              <span>Free resources and templates</span>
            </div>
          </div>
          
          <p>We respect your inbox and will only send you valuable content. You can expect to hear from us ${subscriber.preferences.frequency}.</p>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://jbrand.com"}" class="cta-button">
              Explore Our Services
            </a>
          </div>
          
          <p>Have questions or want to get started on a project? Simply reply to this email - we'd love to hear from you!</p>
          
          <p>Best regards,<br>The JBrand Team</p>
        </div>
        <div class="footer">
          <p>You're receiving this because you subscribed to our newsletter.</p>
          <p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://jbrand.com"}/unsubscribe?email=${encodeURIComponent(subscriber.email)}" class="unsubscribe">
              Unsubscribe
            </a> | 
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://jbrand.com"}/preferences?email=${encodeURIComponent(subscriber.email)}" class="unsubscribe">
              Update Preferences
            </a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  const welcomeEmailText = `
Welcome to JBrand! 🎉

Hi there! 👋

We're thrilled to have you as part of the JBrand family. You've just joined a community of creative professionals and business owners who are passionate about exceptional design and digital solutions.

Here's what you can expect:
🎨 Design tips and creative inspiration
💡 Industry insights and trends  
🚀 Exclusive offers and early access
📚 Free resources and templates

We respect your inbox and will only send you valuable content. You can expect to hear from us ${subscriber.preferences.frequency}.

Have questions or want to get started on a project? Simply reply to this email - we'd love to hear from you!

Best regards,
The JBrand Team

---
You're receiving this because you subscribed to our newsletter.
Unsubscribe: ${process.env.NEXT_PUBLIC_SITE_URL || "https://jbrand.com"}/unsubscribe?email=${encodeURIComponent(subscriber.email)}
Update Preferences: ${process.env.NEXT_PUBLIC_SITE_URL || "https://jbrand.com"}/preferences?email=${encodeURIComponent(subscriber.email)}
  `

  const emailConfig: WelcomeEmailConfig = {
    from: process.env.EMAIL_FROM || "JBrand <noreply@jbrand.com>",
    to: subscriber.email,
    subject: "🎉 Welcome to JBrand - Let's Create Something Amazing!",
    html: welcomeEmailHtml,
    text: welcomeEmailText,
  }

  if (isDevelopment) {
    console.log("🔧 Development Mode: Welcome Email Preview")
    console.log("📧 To:", emailConfig.to)
    console.log("📋 Subject:", emailConfig.subject)
    console.log("📄 Content Preview:", welcomeEmailText.substring(0, 200) + "...")
    return { success: true, mode: "development" }
  }

  try {
    if (!transporter) {
      throw new Error("Email transporter not configured")
    }

    if (!subscriber._id) {
      console.error("❌ Welcome Email Error: subscriber._id is missing")
      return { success: false, error: "Subscriber ID is missing" }
    }

    await transporter.sendMail(emailConfig)
    console.log("✅ Welcome email sent successfully to:", subscriber.email)

    // Update subscriber record with email sent
    const client = await clientPromise
    const db = client.db(DB_NAME)
    await db.collection<SubscriberRecord>(SUBSCRIBERS_COLLECTION).updateOne(
      { _id: subscriber._id },
      {
        $inc: { emailsSent: 1 },
        $set: { lastEmailSent: new Date() },
      },
    )

    return { success: true, mode: "production" }
  } catch (error) {
    console.error("❌ Welcome Email Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Email sending failed",
    }
  }
}

// Get subscriber statistics
const getSubscriberStats = async () => {
  try {
    // Handle case where MongoDB is not configured
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️ MongoDB not configured - returning default stats');
      return {
        total: 0,
        active: 0,
        today: 0,
        statusDistribution: { active: 0, unsubscribed: 0, bounced: 0, pending: 0 },
        sourceDistribution: { direct: 0 },
        engagement: { highEngagement: 0, mediumEngagement: 0, lowEngagement: 0 }
      };
    }
    
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection<SubscriberRecord>(SUBSCRIBERS_COLLECTION)

    const [totalSubscribers, activeSubscribers, todaySubscribers, statusStats, sourceStats, engagementStats] =
      await Promise.all([
        collection.countDocuments(),
        collection.countDocuments({ status: "active" }),
        collection.countDocuments({
          subscribedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        }),
        collection
          .aggregate([
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ])
          .toArray(),
        collection
          .aggregate([
            {
              $group: {
                _id: "$source",
                count: { $sum: 1 },
              },
            },
          ])
          .toArray(),
        collection
          .aggregate([
            {
              $group: {
                _id: null,
                avgEngagement: { $avg: "$engagementScore" },
                totalEmailsSent: { $sum: "$emailsSent" },
                totalEmailsOpened: { $sum: "$emailsOpened" },
                totalEmailsClicked: { $sum: "$emailsClicked" },
              },
            },
          ])
          .toArray(),
      ])

    const engagementData = engagementStats[0] || {
      avgEngagement: 0,
      totalEmailsSent: 0,
      totalEmailsOpened: 0,
      totalEmailsClicked: 0,
    }

    return {
      total: totalSubscribers,
      active: activeSubscribers,
      today: todaySubscribers,
      status: statusStats.reduce(
        (acc, stat) => {
          acc[stat._id] = stat.count
          return acc
        },
        {} as Record<string, number>,
      ),
      source: sourceStats.reduce(
        (acc, stat) => {
          acc[stat._id] = stat.count
          return acc
        },
        {} as Record<string, number>,
      ),
      engagement: {
        averageScore: Math.round(engagementData.avgEngagement || 0),
        openRate:
          engagementData.totalEmailsSent > 0
            ? Math.round((engagementData.totalEmailsOpened / engagementData.totalEmailsSent) * 100)
            : 0,
        clickRate:
          engagementData.totalEmailsSent > 0
            ? Math.round((engagementData.totalEmailsClicked / engagementData.totalEmailsSent) * 100)
            : 0,
      },
    }
  } catch (error) {
    console.error("❌ Stats Error:", error)
    return null
  }
}

// Validation and processing
const processAndValidateData = async (body: Record<string, unknown>): Promise<SubscriberData> => {
  // Prepare data for validation
  const subscriberData: SubscriberData = {
    email: typeof body.email === 'string' ? body.email.trim().toLowerCase() : '',
    source: typeof body.source === 'string' ? body.source.trim() : "direct",
    tags: Array.isArray(body.tags) ? body.tags : [],
    preferences: (body.preferences as SubscriberPreferences) || DEFAULT_PREFERENCES,
  }

  // Validate using Joi schema
  const { error, value } = subscribeSchema.validate(subscriberData)
  if (error) {
    const errorMessage = error.details && error.details[0] ? error.details[0].message : "Invalid input"
    throw new Error(`Validation failed: ${errorMessage}`)
  }

  return value
}

// Main POST handler
export async function POST(req: NextRequest) {
  const startTime = Date.now()

  try {
    console.log("🚀 Processing newsletter subscription...")

    // Parse request body
    const body = await req.json()

    // Get client information
    const clientInfo = getClientInfo(req)

    // Log received data
    console.log("📝 Subscription data received:", {
      email: body.email,
      source: body.source || "direct",
      hasTags: Array.isArray(body.tags) && body.tags.length > 0,
      hasPreferences: !!body.preferences,
      ipAddress: clientInfo.ipAddress,
    })

    // Process and validate data
    const validatedData = await processAndValidateData(body)

    // Add subscriber to database
    const dbResult = await addSubscriberToDatabase(validatedData, clientInfo)

    // Send welcome email for new subscribers
    let emailResult = null
    if (!dbResult.isExisting && dbResult.subscriber) {
      emailResult = await sendWelcomeEmail(dbResult.subscriber)
    }

    const processingTime = Date.now() - startTime
    console.log(`✅ Subscription processing completed in ${processingTime}ms`)

    return NextResponse.json({
      success: true,
      message: dbResult.message,
      details: {
        id: dbResult.id,
        isExisting: dbResult.isExisting,
        welcomeEmailSent: emailResult?.success || false,
        tags: dbResult.subscriber?.tags || [],
        engagementScore: dbResult.subscriber?.engagementScore || 50,
        processingTime: `${processingTime}ms`,
      },
    })
  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error("❌ Newsletter subscription error:", error)

    // Determine error type and status code
    let statusCode = 500
    let errorMessage = "Internal server error"

    if (error instanceof Error) {
      if (error.message.includes("Validation failed")) {
        statusCode = 400
        errorMessage = "Invalid email address"
      } else if (error.message.includes("Database operation failed") || error.message.includes("Database not configured")) {
        statusCode = 503
        errorMessage = "Service temporarily unavailable"
      } else if (error.message.includes("bad auth") || error.message.includes("authentication failed")) {
        statusCode = 503
        errorMessage = "Service temporarily unavailable"
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: isDevelopment
          ? error instanceof Error
            ? error.message
            : "Unknown error"
          : "Something went wrong. Please try again.",
        processingTime: `${processingTime}ms`,
      },
      { status: statusCode },
    )
  }
}

// GET handler for subscriber statistics and health check
export async function GET() {
  try {
    const stats = await getSubscriberStats()

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: isDevelopment ? "development" : "production",
      database: {
        name: DB_NAME,
        collection: SUBSCRIBERS_COLLECTION,
        status: "connected",
      },
      statistics: stats || {
        total: 0,
        active: 0,
        today: 0,
        status: {},
        source: {},
        engagement: { averageScore: 0, openRate: 0, clickRate: 0 },
      },
      version: "2.0.0",
    })
  } catch (error) {
    console.error("❌ Health check error:", error)

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        environment: isDevelopment ? "development" : "production",
        database: {
          name: DB_NAME,
          collection: SUBSCRIBERS_COLLECTION,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        version: "2.0.0",
      },
      { status: 503 },
    )
  }
}

// DELETE handler for unsubscribe functionality
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection<SubscriberRecord>(SUBSCRIBERS_COLLECTION)

    const result = await collection.updateOne(
      { email: email.toLowerCase() },
      {
        $set: {
          status: "unsubscribed",
          unsubscribedAt: new Date(),
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Subscriber not found" }, { status: 404 })
    }

    console.log("✅ Subscriber unsubscribed:", email)

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed",
      details: {
        email,
        unsubscribedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("❌ Unsubscribe error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to unsubscribe",
        error: isDevelopment ? (error instanceof Error ? error.message : "Unknown error") : "Unsubscribe failed",
      },
      { status: 500 },
    )
  }
}

// PUT handler for updating subscriber preferences
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, preferences, tags } = body

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection<SubscriberRecord>(SUBSCRIBERS_COLLECTION)

    const updateData: Partial<SubscriberRecord> = {
      updatedAt: new Date(),
    }

    if (preferences) {
      updateData.preferences = { ...DEFAULT_PREFERENCES, ...preferences }
    }

    if (tags && Array.isArray(tags)) {
      updateData.tags = tags
    }

    const result = await collection.updateOne({ email: email.toLowerCase() }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Subscriber not found" }, { status: 404 })
    }

    console.log("✅ Subscriber preferences updated:", email)

    return NextResponse.json({
      success: true,
      message: "Preferences updated successfully",
      details: {
        email,
        updatedAt: new Date().toISOString(),
        preferences: updateData.preferences,
        tags: updateData.tags,
      },
    })
  } catch (error) {
    console.error("❌ Preferences update error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update preferences",
        error: isDevelopment ? (error instanceof Error ? error.message : "Unknown error") : "Update failed",
      },
      { status: 500 },
    )
  }
}
