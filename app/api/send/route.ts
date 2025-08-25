import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "../../../utils/validation"

// Types for better type safety
interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  website?: string
  services?: string[]
  service?: string
  budget?: string
  timeline?: string
  message: string
}

interface EmailTemplateProps {
  name: string
  email: string
  phone: string | undefined
  company: string | undefined
  website: string | undefined
  services: string
  service: string | undefined
  budget: string | undefined
  timeline: string | undefined
  message: string
  submittedAt: string
}

// Environment configuration
const isDevelopment = process.env.NODE_ENV === "development" || !process.env.NODE_ENV

// Initialize Resend with error handling
let resend: Resend | null = null

try {
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY is not configured in environment variables")
    if (!isDevelopment) {
      throw new Error("RESEND_API_KEY is required in production")
    }
  } else {
    resend = new Resend(process.env.RESEND_API_KEY)
    console.log("✅ Resend initialized successfully")
  }
} catch (error) {
  console.error("❌ Failed to initialize Resend:", error)
}

// Modern HTML Email Template Component
const EmailTemplate = ({
  name,
  email,
  phone,
  company,
  website,
  services,
  service,
  budget,
  timeline,
  message,
  submittedAt,
}: EmailTemplateProps) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f9fafb;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #2465ED 0%, #1d4ed8 100%);
      color: white;
      padding: 32px 24px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .header p {
      opacity: 0.9;
      font-size: 16px;
    }
    
    .content {
      padding: 32px 24px;
    }
    
    .field-group {
      margin-bottom: 24px;
      padding: 20px;
      background-color: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #2465ED;
    }
    
    .field {
      margin-bottom: 16px;
    }
    
    .field:last-child {
      margin-bottom: 0;
    }
    
    .label {
      font-weight: 600;
      color: #2465ED;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .value {
      color: #374151;
      font-size: 16px;
      word-wrap: break-word;
    }
    
    .message-field {
      background-color: #ffffff;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      margin-top: 8px;
    }
    
    .message-field .value {
      white-space: pre-wrap;
      line-height: 1.7;
    }
    
    .footer {
      background-color: #f3f4f6;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer p {
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    .badge {
      display: inline-block;
      background-color: #dbeafe;
      color: #1e40af;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #e5e7eb, transparent);
      margin: 24px 0;
    }
    
    @media (max-width: 600px) {
      .container {
        margin: 0;
        border-radius: 0;
      }
      
      .header, .content, .footer {
        padding-left: 16px;
        padding-right: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Contact Submission</h1>
      <p>Someone is interested in your services!</p>
    </div>
    
    <div class="content">
      <div class="field-group">
        <div class="field">
          <div class="label">👤 Contact Information</div>
        </div>
        
        <div class="field">
          <div class="label">Full Name</div>
          <div class="value">${name}</div>
        </div>
        
        <div class="field">
          <div class="label">Email Address</div>
          <div class="value">
            <a href="mailto:${email}" style="color: #2465ED; text-decoration: none;">${email}</a>
          </div>
        </div>
        
        ${
          phone
            ? `
        <div class="field">
          <div class="label">Phone Number</div>
          <div class="value">
            <a href="tel:${phone}" style="color: #2465ED; text-decoration: none;">${phone}</a>
          </div>
        </div>
        `
            : ""
        }
      </div>
      
      ${
        company || website
          ? `
      <div class="field-group">
        <div class="field">
          <div class="label">🏢 Business Information</div>
        </div>
        
        ${
          company
            ? `
        <div class="field">
          <div class="label">Company Name</div>
          <div class="value">${company}</div>
        </div>
        `
            : ""
        }
        
        ${
          website
            ? `
        <div class="field">
          <div class="label">Website</div>
          <div class="value">
            <a href="${website}" target="_blank" style="color: #2465ED; text-decoration: none;">${website}</a>
          </div>
        </div>
        `
            : ""
        }
      </div>
      `
          : ""
      }
      
      <div class="field-group">
        <div class="field">
          <div class="label">🎨 Service Required</div>
          <div class="value">
            <span class="badge">${service || services}</span>
          </div>
        </div>
        <div class="field">
          <div class="label">💰 Project Budget</div>
          <div class="value">${budget || "-"}</div>
        </div>
        <div class="field">
          <div class="label">⏳ Project Timeline</div>
          <div class="value">${timeline || "-"}</div>
        </div>
      </div>
      
      <div class="field-group">
        <div class="field">
          <div class="label">💬 Message</div>
          <div class="message-field">
            <div class="value">${message.replace(/\n/g, "<br>")}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>📅 Submitted:</strong> ${submittedAt}</p>
      <p><strong>🌐 Source:</strong> JBrand Contact Form</p>
      <div class="divider"></div>
      <p style="font-size: 12px; color: #9ca3af;">
        This email was automatically generated from your website contact form.
      </p>
    </div>
  </div>
</body>
</html>
`

// Service mapping for better display
const serviceMapping: Record<string, string> = {
  logoDesign: "Logo Design",
  webDesign: "Web Design",
  brandStrategy: "Brand Strategy",
  softwareDevelopment: "Software Development",
  socialMedia: "Social Media Management",
  printDesign: "Print Design",
  brandIdentity: "Brand Identity",
  webDevelopment: "Web Development",
  digitalMarketing: "Digital Marketing",
  videoProduction: "Video Production",
  musicPodcastMixing: "Music & Podcast Mixing",
  other: "Other Services",
}

// Form data processing and validation
const processAndValidateData = async (body: any): Promise<ContactFormData> => {
  const { name, email, phone, company, website, services, service, budget, timeline, message } = body

  // Prepare data for validation
  const formData: ContactFormData = {
    name: name?.trim(),
    email: email?.trim().toLowerCase(),
    phone: phone?.trim(),
    company: company?.trim(),
    website: website?.trim(),
    message: message?.trim(),
  }

  // Handle services (array from hero form or string from contact form)
  if (Array.isArray(services) && services.length > 0) {
    formData.services = services
  } else if (typeof service === "string" && service.trim()) {
    formData.service = service.trim()
  }

  // Handle budget and timeline
  formData.budget = budget?.trim()
  formData.timeline = timeline?.trim()

  // Validate using Joi schema
  const { error, value } = contactSchema.validate(formData)
  if (error) {
    const errorMessage = error.details && error.details[0] ? error.details[0].message : "Invalid input"
    throw new Error(`Validation failed: ${errorMessage}`)
  }

  return value
}

// Format services for display
const formatServices = (data: ContactFormData): string => {
  if (data.services && Array.isArray(data.services) && data.services.length > 0) {
    return data.services.map((service) => serviceMapping[service] || service).join(", ")
  }

  if (data.service) {
    return serviceMapping[data.service] || data.service
  }

  return "General Inquiry"
}

// Send email using Resend
const sendEmail = async (data: ContactFormData) => {
  if (!resend) {
    if (isDevelopment) {
      console.log("🔧 Development Mode: Email would be sent")
      console.log("📧 To:", process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jtech0576@gmail.com")
      console.log("📋 Subject: New Contact Form Submission")
      console.log("👤 From:", data.name, `<${data.email}>`)
      console.log("📝 Message:", data.message.substring(0, 100) + "...")
      return { success: true, mode: "development", data: null }
    }
    throw new Error("Resend is not properly configured")
  }

  const services = formatServices(data)
  const submittedAt = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })

  const emailHtml = EmailTemplate({
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    website: data.website,
    services,
    service: data.service,
    budget: data.budget,
    timeline: data.timeline,
    message: data.message,
    submittedAt,
  })

  const emailConfig = {
    from: process.env.RESEND_FROM_EMAIL || "JBrand Contact <onboarding@resend.dev>",
    to: [process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jtech0576@gmail.com"],
    subject: `🎯 New Contact: ${data.name} - ${services}`,
    html: emailHtml,
    replyTo: data.email,
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
    },
  }

  const { data: emailData, error } = await resend.emails.send(emailConfig)

  if (error) {
    console.error("❌ Resend API Error:", error)
    throw new Error(`Email sending failed: ${error.message}`)
  }

  console.log("✅ Email sent successfully:", emailData?.id)
  return { success: true, mode: "production", data: emailData }
}

// Main POST handler
export async function POST(req: NextRequest) {
  const startTime = Date.now()

  try {
    console.log("🚀 Processing contact form submission via Resend...")

    // Parse request body
    const body = await req.json()

    // Log received data (excluding sensitive information)
    console.log("📝 Form data received:", {
      name: body.name,
      email: body.email,
      hasPhone: !!body.phone,
      hasCompany: !!body.company,
      hasWebsite: !!body.website,
      services: body.services || body.service,
      messageLength: body.message?.length || 0,
    })

    // Process and validate data
    const validatedData = await processAndValidateData(body)

    // Send email
    const emailResult = await sendEmail(validatedData)

    const processingTime = Date.now() - startTime
    console.log(`✅ Email processing completed in ${processingTime}ms`)

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      details: {
        mode: emailResult.mode,
        emailId: emailResult.data?.id,
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
      } else if (error.message.includes("Email sending failed")) {
        statusCode = 502
        errorMessage = "Email service error"
      } else if (error.message.includes("Resend is not properly configured")) {
        statusCode = 503
        errorMessage = "Email service not configured"
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
        debug: isDevelopment ? {
          resendConfigured: !!process.env.RESEND_API_KEY,
          contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
          environment: process.env.NODE_ENV,
        } : undefined,
      },
      { status: statusCode },
    )
  }
}

// Health check endpoint
export async function GET() {
  const isResendConfigured = !!process.env.RESEND_API_KEY
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jtech0576@gmail.com"

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: isDevelopment ? "development" : "production",
    services: {
      resend: isResendConfigured ? "configured" : "not-configured",
      contactEmail: contactEmail.replace(/(.{2}).*(@.*)/, "$1***$2"), // Mask email for security
    },
    version: "2.0.0",
  })
}
