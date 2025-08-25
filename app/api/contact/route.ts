import { type NextRequest, NextResponse } from "next/server"
import { contactSchema } from "../../../utils/validation"

import clientPromise from "../../../lib/mongodb"
import type { MongoClient, Db, Collection, Document } from "mongodb"
// @ts-ignore
import nodemailer from "nodemailer"
import { ObjectId } from "mongodb"

const typedClientPromise: Promise<MongoClient> = clientPromise as any

// Types for better type safety
interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  website?: string
  service?: string
  message: string
}

interface ContactRecord extends ContactFormData {
  _id?: ObjectId
  createdAt: Date
  updatedAt: Date
  status: "new" | "contacted" | "qualified" | "converted" | "closed"
  source: string
  ipAddress?: string
  userAgent?: string
  priority: "low" | "medium" | "high"
  tags: string[]
  notes?: string
}

interface EmailConfig {
  from: string
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer
  }>
}

// Environment configuration
const isDevelopment = process.env.NODE_ENV === "development" || !process.env.NODE_ENV

// Database configuration
const DB_NAME = process.env.MONGODB_DB_NAME || "jbrand"
const COLLECTION_NAME = "contacts"

// Utility functions
const getClientInfo = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for")
  const realIp = req.headers.get("x-real-ip")
  const ipAddress = forwarded?.split(",")[0] || realIp || "unknown"
  const userAgent = req.headers.get("user-agent") || "unknown"

  return { ipAddress, userAgent }
}

const determinePriority = (data: ContactFormData): "low" | "medium" | "high" => {
  // Business logic for priority determination
  if (data.company && data.phone) return "high"
  if (data.company || data.phone) return "medium"
  return "low"
}

const generateTags = (data: ContactFormData): string[] => {
  const tags: string[] = []

  if (data.company) tags.push("business")
  if (data.phone) tags.push("phone-provided")
  if (data.website) tags.push("has-website")
  if (data.service) tags.push(`service-${data.service}`)

  // Add priority tag
  tags.push(`priority-${determinePriority(data)}`)

  return tags
}

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
const saveContactToDatabase = async (data: ContactFormData, clientInfo: ReturnType<typeof getClientInfo>) => {
  try {
    const client = await typedClientPromise
    const db: Db = client.db(DB_NAME)
    const collection: Collection<ContactRecord> = db.collection<ContactRecord>(COLLECTION_NAME)

    // Check for duplicate submissions (same email within last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const existingContact = await collection.findOne({
      email: data.email,
      createdAt: { $gte: fiveMinutesAgo },
    })

    if (existingContact) {
      console.warn("⚠️ Duplicate submission detected:", data.email)
      return {
        success: true,
        isDuplicate: true,
        id: existingContact._id,
        message: "Contact already exists",
      }
    }

    // Prepare contact record
    const contactRecord: Omit<ContactRecord, "_id"> = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "new",
      source: "contact_form",
      ipAddress: clientInfo.ipAddress,
      userAgent: clientInfo.userAgent,
      priority: determinePriority(data),
      tags: generateTags(data),
    }

    // Insert into database
    const result = await collection.insertOne(contactRecord)

    console.log("✅ Contact saved to MongoDB:", {
      id: result.insertedId,
      email: data.email,
      priority: contactRecord.priority,
      tags: contactRecord.tags,
    })

    return {
      success: true,
      isDuplicate: false,
      id: result.insertedId,
      message: "Contact saved successfully",
    }
  } catch (error) {
    console.error("❌ MongoDB Error:", error)
    throw new Error(`Database operation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Email operations
const sendNotificationEmail = async (data: ContactFormData, file?: File) => {
  const transporter = getEmailTransporter()

  const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2465ED; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #2465ED; }
        .value { margin-top: 5px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">👤 Name:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value">${data.email}</div>
          </div>
          ${
            data.phone
              ? `
          <div class="field">
            <div class="label">📱 Phone:</div>
            <div class="value">${data.phone}</div>
          </div>
          `
              : ""
          }
          ${
            data.company
              ? `
          <div class="field">
            <div class="label">🏢 Company:</div>
            <div class="value">${data.company}</div>
          </div>
          `
              : ""
          }
          ${
            data.website
              ? `
          <div class="field">
            <div class="label">🌐 Website:</div>
            <div class="value">${data.website}</div>
          </div>
          `
              : ""
          }
          ${
            data.service
              ? `
          <div class="field">
            <div class="label">🎨 Service Interest:</div>
            <div class="value">${data.service}</div>
          </div>
          `
              : ""
          }
          <div class="field">
            <div class="label">💬 Message:</div>
            <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
          </div>
          ${
            file
              ? `
          <div class="field">
            <div class="label">📎 Attachment:</div>
            <div class="value">${file.name} (${(file.size / 1024).toFixed(1)} KB)</div>
          </div>
          `
              : ""
          }
        </div>
        <div class="footer">
          <p>📅 Submitted: ${new Date().toLocaleString()}</p>
          <p>🌐 Source: JBrand Contact Form</p>
        </div>
      </div>
    </body>
    </html>
  `

  const emailConfig: EmailConfig = {
    from: process.env.EMAIL_FROM || "noreply@jbrand.com",
    to: process.env.EMAIL_TO || "info@jbrand.com",
    subject: `🎯 New Contact: ${data.name} - ${data.service || "General Inquiry"}`,
    html: emailContent,
  }

  // Handle file attachment
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer())
    emailConfig.attachments = [
      {
        filename: file.name,
        content: buffer,
      },
    ]
  }

  if (isDevelopment) {
    console.log("🔧 Development Mode: Email Preview")
    console.log("📧 To:", emailConfig.to)
    console.log("📋 Subject:", emailConfig.subject)
    console.log("📎 Has Attachment:", !!emailConfig.attachments)
    console.log("📄 Content Preview:", emailContent.substring(0, 200) + "...")
    return { success: true, mode: "development" }
  }

  try {
    if (!transporter) {
      throw new Error("Email transporter not configured")
    }

    await transporter.sendMail(emailConfig)
    console.log("✅ Email sent successfully")
    return { success: true, mode: "production" }
  } catch (error) {
    console.error("❌ Email Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Email sending failed",
    }
  }
}

// Get contact statistics
const getContactStats = async () => {
  try {
    const client = await typedClientPromise
    const db: Db = client.db(DB_NAME)
    const collection: Collection<ContactRecord> = db.collection<ContactRecord>(COLLECTION_NAME)

    const [totalContacts, todayContacts, priorityStatsRaw] = await Promise.all([
      collection.countDocuments(),
      collection.countDocuments({
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      }),
      collection
        .aggregate([
          {
            $group: {
              _id: "$priority",
              count: { $sum: 1 },
            },
          },
        ])
        .toArray(),
    ])
    const priorityStats = priorityStatsRaw as { _id: string; count: number }[]
    return {
      total: totalContacts,
      today: todayContacts,
      priority: priorityStats.reduce(
        (acc: Record<string, number>, stat) => {
          acc[stat._id] = stat.count
          return acc
        },
        {} as Record<string, number>,
      ),
    }
  } catch (error) {
    console.error("❌ Stats Error:", error)
    return null
  }
}

// Validation and processing
const processAndValidateData = async (body: any): Promise<ContactFormData> => {
  // Prepare data for validation
  const formData: ContactFormData = {
    name: body.name?.trim(),
    email: body.email?.trim().toLowerCase(),
    phone: body.phone?.trim(),
    company: body.company?.trim(),
    website: body.website?.trim(),
    service: body.service?.trim(),
    message: body.message?.trim(),
  }

  // Validate using Joi schema
  const { error, value } = contactSchema.validate(formData)
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
    console.log("🚀 Processing contact form submission for database storage...")

    // Parse request body
    const body = await req.json()

    // Get client information
    const clientInfo = getClientInfo(req)

    // Log received data (excluding sensitive information)
    console.log("📝 Form data received:", {
      name: body.name,
      email: body.email,
      hasPhone: !!body.phone,
      hasCompany: !!body.company,
      hasWebsite: !!body.website,
      service: body.service,
      messageLength: body.message?.length || 0,
      ipAddress: clientInfo.ipAddress,
    })

    // Process and validate data
    const validatedData = await processAndValidateData(body)

    // Save to database
    const dbResult = await saveContactToDatabase(validatedData, clientInfo)

    const processingTime = Date.now() - startTime
    console.log(`✅ Contact processing completed in ${processingTime}ms`)

    return NextResponse.json({
      success: true,
      message: dbResult.message,
      details: {
        id: dbResult.id,
        isDuplicate: dbResult.isDuplicate,
        priority: determinePriority(validatedData),
        tags: generateTags(validatedData),
        processingTime: `${processingTime}ms`,
      },
    })
  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error("❌ Contact form error:", error)

    // Determine error type and status code
    let statusCode = 500
    let errorMessage = "Internal server error"

    if (error instanceof Error) {
      if (error.message.includes("Validation failed")) {
        statusCode = 400
        errorMessage = "Validation error"
      } else if (error.message.includes("Database operation failed")) {
        statusCode = 503
        errorMessage = "Database service error"
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

// GET handler for contact statistics and health check
export async function GET() {
  try {
    const stats = await getContactStats()

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: isDevelopment ? "development" : "production",
      database: {
        name: DB_NAME,
        collection: COLLECTION_NAME,
        status: "connected",
      },
      statistics: stats || {
        total: 0,
        today: 0,
        priority: { low: 0, medium: 0, high: 0 },
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
          collection: COLLECTION_NAME,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        version: "2.0.0",
      },
      { status: 503 },
    )
  }
}

// PUT handler for updating contact status (admin functionality)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, notes } = body

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid contact ID" }, { status: 400 })
    }

    if (!["new", "contacted", "qualified", "converted", "closed"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 })
    }

    const client = await typedClientPromise
    const db: Db = client.db(DB_NAME)
    const collection: Collection<ContactRecord> = db.collection<ContactRecord>(COLLECTION_NAME)

    const updateData: Partial<ContactRecord> = {
      status,
      updatedAt: new Date(),
    }

    if (notes) {
      updateData.notes = notes
    }

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Contact not found" }, { status: 404 })
    }

    console.log("✅ Contact updated:", { id, status, notes: !!notes })

    return NextResponse.json({
      success: true,
      message: "Contact updated successfully",
      details: {
        id,
        status,
        hasNotes: !!notes,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("❌ Contact update error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update contact",
        error: isDevelopment ? (error instanceof Error ? error.message : "Unknown error") : "Update failed",
      },
      { status: 500 },
    )
  }
}
