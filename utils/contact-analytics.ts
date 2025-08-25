// Contact analytics utilities for better insights

export interface ContactAnalytics {
  totalContacts: number
  contactsToday: number
  contactsThisWeek: number
  contactsThisMonth: number
  priorityDistribution: Record<string, number>
  serviceDistribution: Record<string, number>
  sourceDistribution: Record<string, number>
  conversionRate: number
  averageResponseTime: number
}

export interface ContactTrend {
  date: string
  count: number
  priority: Record<string, number>
}

// Service mapping for analytics
export const serviceAnalyticsMapping: Record<string, string> = {
  logoDesign: "Logo Design",
  webDesign: "Web Design",
  brandStrategy: "Brand Strategy",
  softwareDevelopment: "Software Development",
  socialMedia: "Social Media",
  printDesign: "Print Design",
  brandIdentity: "Brand Identity",
  webDevelopment: "Web Development",
  digitalMarketing: "Digital Marketing",
  videoProduction: "Video Production",
  musicPodcastMixing: "Music & Podcast",
  other: "Other Services",
}

// Priority scoring algorithm
export const calculatePriorityScore = (contact: {
  company?: string
  phone?: string
  website?: string
  message: string
}): number => {
  let score = 0

  // Company presence adds significant value
  if (contact.company) score += 30

  // Phone number indicates serious interest
  if (contact.phone) score += 25

  // Website suggests established business
  if (contact.website) score += 15

  // Message length indicates engagement level
  const messageLength = contact.message.length
  if (messageLength > 200) score += 20
  else if (messageLength > 100) score += 10
  else if (messageLength > 50) score += 5

  // Keywords in message that indicate high value
  const highValueKeywords = [
    "budget",
    "timeline",
    "project",
    "business",
    "enterprise",
    "corporate",
    "professional",
    "urgent",
    "asap",
  ]

  const messageWords = contact.message.toLowerCase().split(/\s+/)
  const keywordMatches = highValueKeywords.filter((keyword) => messageWords.includes(keyword))
  score += keywordMatches.length * 5

  return Math.min(score, 100) // Cap at 100
}

// Convert score to priority level
export const scoreToPriority = (score: number): "low" | "medium" | "high" => {
  if (score >= 70) return "high"
  if (score >= 40) return "medium"
  return "low"
}

// Contact segmentation
export const segmentContact = (contact: {
  company?: string
  phone?: string
  website?: string
  service?: string
  message: string
}): string[] => {
  const segments: string[] = []

  // Business type segmentation
  if (contact.company) {
    segments.push("business")
    if (contact.website) segments.push("established-business")
  } else {
    segments.push("individual")
  }

  // Contact method segmentation
  if (contact.phone) segments.push("phone-contact")

  // Service segmentation
  if (contact.service) {
    const serviceCategory = getServiceCategory(contact.service)
    segments.push(`service-${serviceCategory.toLowerCase()}`)
  }

  // Engagement level segmentation
  const messageLength = contact.message.length
  if (messageLength > 200) segments.push("high-engagement")
  else if (messageLength > 100) segments.push("medium-engagement")
  else segments.push("low-engagement")

  return segments
}

// Helper function to get service category
const getServiceCategory = (service: string): string => {
  const categories = {
    design: ["logoDesign", "brandIdentity", "printDesign"],
    digital: ["webDesign", "webDevelopment", "digitalMarketing"],
    media: ["socialMedia", "videoProduction", "musicPodcastMixing"],
    strategy: ["brandStrategy", "softwareDevelopment"],
  }

  for (const [category, services] of Object.entries(categories)) {
    if (services.includes(service)) {
      return category
    }
  }
  return "other"
}

// Lead scoring for sales prioritization
export const calculateLeadScore = (contact: {
  company?: string
  phone?: string
  website?: string
  service?: string
  message: string
  createdAt: Date
}): number => {
  let score = calculatePriorityScore(contact)

  // Time-based scoring (recent contacts get higher scores)
  const hoursSinceSubmission = (Date.now() - contact.createdAt.getTime()) / (1000 * 60 * 60)
  if (hoursSinceSubmission < 1) score += 10
  else if (hoursSinceSubmission < 24) score += 5

  // Service-based scoring
  const highValueServices = ["brandStrategy", "softwareDevelopment", "webDevelopment"]
  if (contact.service && highValueServices.includes(contact.service)) {
    score += 15
  }

  return Math.min(score, 100)
}
