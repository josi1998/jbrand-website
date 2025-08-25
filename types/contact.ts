// Type definitions for contact management

export interface Contact {
    _id?: string
    name: string
    email: string
    phone?: string
    company?: string
    website?: string
    service?: string
    message: string
    createdAt: Date
    updatedAt: Date
    status: ContactStatus
    source: ContactSource
    ipAddress?: string
    userAgent?: string
    priority: ContactPriority
    tags: string[]
    notes?: string
    leadScore?: number
    segments?: string[]
    lastContactedAt?: Date
    assignedTo?: string
  }
  
  export type ContactStatus = "new" | "contacted" | "qualified" | "converted" | "closed"
  
  export type ContactPriority = "low" | "medium" | "high"
  
  export type ContactSource = "contact_form" | "hero_form" | "newsletter" | "api" | "import"
  
  export interface ContactFilter {
    status?: ContactStatus[]
    priority?: ContactPriority[]
    source?: ContactSource[]
    dateRange?: {
      start: Date
      end: Date
    }
    tags?: string[]
    hasPhone?: boolean
    hasCompany?: boolean
    hasWebsite?: boolean
    search?: string
  }
  
  export interface ContactSortOptions {
    field: "createdAt" | "updatedAt" | "name" | "email" | "priority" | "leadScore"
    direction: "asc" | "desc"
  }
  
  export interface ContactListResponse {
    contacts: Contact[]
    total: number
    page: number
    limit: number
    hasMore: boolean
  }
  
  export interface ContactStats {
    total: number
    today: number
    thisWeek: number
    thisMonth: number
    byStatus: Record<ContactStatus, number>
    byPriority: Record<ContactPriority, number>
    bySource: Record<ContactSource, number>
    conversionRate: number
    averageResponseTime: number
  }
  