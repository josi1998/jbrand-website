// Type definitions for subscriber management

export interface Subscriber {
    _id?: string
    email: string
    status: SubscriberStatus
    source: SubscriberSource
    subscribedAt: Date
    updatedAt: Date
    confirmedAt?: Date
    unsubscribedAt?: Date
    ipAddress?: string
    userAgent?: string
    tags: string[]
    preferences: SubscriberPreferences
    engagementScore: number
    lastEmailSent?: Date
    emailsSent: number
    emailsOpened: number
    emailsClicked: number
    bounceCount: number
    notes?: string
    customFields?: Record<string, any>
  }
  
  export type SubscriberStatus = "active" | "unsubscribed" | "bounced" | "pending" | "complained"
  
  export type SubscriberSource = "direct" | "hero_form" | "footer" | "popup" | "social" | "referral" | "api" | "import"
  
  export interface SubscriberPreferences {
    frequency: "daily" | "weekly" | "monthly"
    categories: string[]
    format: "html" | "text"
    timezone?: string
    language?: string
  }
  
  export interface SubscriberFilter {
    status?: SubscriberStatus[]
    source?: SubscriberSource[]
    tags?: string[]
    engagementRange?: {
      min: number
      max: number
    }
    dateRange?: {
      start: Date
      end: Date
    }
    hasEngagement?: boolean
    search?: string
  }
  
  export interface SubscriberListResponse {
    subscribers: Subscriber[]
    total: number
    page: number
    limit: number
    hasMore: boolean
  }
  
  export interface SubscriberStats {
    total: number
    active: number
    today: number
    thisWeek: number
    thisMonth: number
    byStatus: Record<SubscriberStatus, number>
    bySource: Record<SubscriberSource, number>
    engagement: {
      averageScore: number
      openRate: number
      clickRate: number
    }
    growth: {
      daily: number[]
      weekly: number[]
      monthly: number[]
    }
  }
  
  export interface NewsletterCampaign {
    _id?: string
    name: string
    subject: string
    content: string
    htmlContent: string
    textContent: string
    status: "draft" | "scheduled" | "sending" | "sent" | "cancelled"
    scheduledAt?: Date
    sentAt?: Date
    recipientCount: number
    openCount: number
    clickCount: number
    unsubscribeCount: number
    bounceCount: number
    createdAt: Date
    updatedAt: Date
    tags: string[]
    segmentCriteria?: Record<string, any>
  }
  
  export interface UnsubscribeRequest {
    email: string
    reason?: "too_frequent" | "not_relevant" | "never_subscribed" | "spam" | "other"
    feedback?: string
    unsubscribedAt: Date
    campaignId?: string
  }
  