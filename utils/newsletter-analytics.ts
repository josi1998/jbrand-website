// Newsletter analytics utilities for better insights

export interface NewsletterAnalytics {
    totalSubscribers: number
    activeSubscribers: number
    subscribersToday: number
    subscribersThisWeek: number
    subscribersThisMonth: number
    unsubscribeRate: number
    averageEngagementScore: number
    topSources: Array<{ source: string; count: number }>
    engagementTrends: Array<{ date: string; score: number }>
  }
  
  export interface SubscriberSegment {
    name: string
    criteria: Record<string, any>
    count: number
    averageEngagement: number
    description: string
  }
  
  // Predefined subscriber segments for marketing
  export const subscriberSegments: SubscriberSegment[] = [
    {
      name: "High Engagement",
      criteria: { engagementScore: { $gte: 80 } },
      count: 0,
      averageEngagement: 0,
      description: "Highly engaged subscribers who regularly open and click emails",
    },
    {
      name: "New Subscribers",
      criteria: {
        subscribedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 days
      },
      count: 0,
      averageEngagement: 0,
      description: "Recently subscribed users (last 30 days)",
    },
    {
      name: "Business Subscribers",
      criteria: { tags: { $in: ["business-hours", "desktop-user"] } },
      count: 0,
      averageEngagement: 0,
      description: "Subscribers who likely represent businesses",
    },
    {
      name: "Mobile Users",
      criteria: { tags: { $in: ["mobile-user"] } },
      count: 0,
      averageEngagement: 0,
      description: "Subscribers who primarily use mobile devices",
    },
    {
      name: "At Risk",
      criteria: {
        engagementScore: { $lt: 30 },
        lastEmailSent: { $lt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }, // 60 days ago
      },
      count: 0,
      averageEngagement: 0,
      description: "Low engagement subscribers who may unsubscribe soon",
    },
  ]
  
  // Email campaign performance tracking
  export interface CampaignMetrics {
    campaignId: string
    subject: string
    sentAt: Date
    recipientCount: number
    openCount: number
    clickCount: number
    unsubscribeCount: number
    bounceCount: number
    openRate: number
    clickRate: number
    unsubscribeRate: number
    bounceRate: number
  }
  
  // A/B testing utilities
  export interface ABTestConfig {
    testId: string
    variants: Array<{
      name: string
      subject: string
      content: string
      weight: number // Percentage of traffic
    }>
    startDate: Date
    endDate: Date
    winningVariant?: string
  }
  
  // Engagement scoring algorithm
  export const calculateDetailedEngagementScore = (subscriber: {
    emailsSent: number
    emailsOpened: number
    emailsClicked: number
    bounceCount: number
    subscribedAt: Date
    lastEmailSent?: Date
    unsubscribedAt?: Date
  }): {
    score: number
    factors: Record<string, number>
    recommendations: string[]
  } => {
    const factors: Record<string, number> = {}
    const recommendations: string[] = []
  
    // Base score
    let score = 50
    factors.base = 50
  
    // Email engagement
    if (subscriber.emailsSent > 0) {
      const openRate = subscriber.emailsOpened / subscriber.emailsSent
      const clickRate = subscriber.emailsClicked / subscriber.emailsSent
  
      const openScore = openRate * 30
      const clickScore = clickRate * 20
  
      score += openScore + clickScore
      factors.opens = openScore
      factors.clicks = clickScore
  
      if (openRate < 0.2) recommendations.push("Consider more engaging subject lines")
      if (clickRate < 0.05) recommendations.push("Improve call-to-action placement and content")
    }
  
    // Bounce penalty
    if (subscriber.bounceCount > 0) {
      const bounceScore = -subscriber.bounceCount * 10
      score += bounceScore
      factors.bounces = bounceScore
  
      if (subscriber.bounceCount > 2) recommendations.push("Verify email address validity")
    }
  
    // Recency factor
    if (subscriber.lastEmailSent) {
      const daysSinceLastEmail = (Date.now() - subscriber.lastEmailSent.getTime()) / (1000 * 60 * 60 * 24)
      let recencyScore = 0
  
      if (daysSinceLastEmail < 7) recencyScore = 10
      else if (daysSinceLastEmail < 30) recencyScore = 5
      else if (daysSinceLastEmail > 90) recencyScore = -5
  
      score += recencyScore
      factors.recency = recencyScore
  
      if (daysSinceLastEmail > 60) recommendations.push("Re-engagement campaign recommended")
    }
  
    // Longevity bonus
    const daysSinceSubscribed = (Date.now() - subscriber.subscribedAt.getTime()) / (1000 * 60 * 60 * 24)
    let longevityScore = 0
  
    if (daysSinceSubscribed > 365) longevityScore = 10
    else if (daysSinceSubscribed > 180) longevityScore = 5
  
    score += longevityScore
    factors.longevity = longevityScore
  
    // Clamp score between 0-100
    score = Math.max(0, Math.min(100, score))
  
    return { score, factors, recommendations }
  }
  
  // List health metrics
  export const calculateListHealth = (
    subscribers: Array<{
      status: string
      engagementScore: number
      subscribedAt: Date
      bounceCount: number
    }>,
  ): {
    healthScore: number
    metrics: Record<string, number>
    recommendations: string[]
  } => {
    const total = subscribers.length
    if (total === 0) return { healthScore: 0, metrics: {}, recommendations: [] }
  
    const active = subscribers.filter((s) => s.status === "active").length
    const avgEngagement = subscribers.reduce((sum, s) => sum + s.engagementScore, 0) / total
    const highEngagement = subscribers.filter((s) => s.engagementScore >= 70).length
    const lowEngagement = subscribers.filter((s) => s.engagementScore < 30).length
    const recentSubscribers = subscribers.filter(
      (s) => Date.now() - s.subscribedAt.getTime() < 30 * 24 * 60 * 60 * 1000,
    ).length
    const highBounce = subscribers.filter((s) => s.bounceCount > 2).length
  
    const metrics = {
      activeRate: (active / total) * 100,
      averageEngagement: avgEngagement,
      highEngagementRate: (highEngagement / total) * 100,
      lowEngagementRate: (lowEngagement / total) * 100,
      growthRate: (recentSubscribers / total) * 100,
      bounceRate: (highBounce / total) * 100,
    }
  
    // Calculate overall health score
    let healthScore = 0
    healthScore += metrics.activeRate * 0.3 // 30% weight
    healthScore += metrics.averageEngagement * 0.25 // 25% weight
    healthScore += metrics.highEngagementRate * 0.2 // 20% weight
    healthScore += Math.max(0, 100 - metrics.lowEngagementRate) * 0.15 // 15% weight
    healthScore += metrics.growthRate * 0.1 // 10% weight
  
    const recommendations: string[] = []
  
    if (metrics.activeRate < 80) recommendations.push("Clean inactive subscribers")
    if (metrics.averageEngagement < 50) recommendations.push("Improve content quality and relevance")
    if (metrics.lowEngagementRate > 30) recommendations.push("Segment low-engagement subscribers for re-engagement")
    if (metrics.bounceRate > 5) recommendations.push("Implement email validation")
    if (metrics.growthRate < 5) recommendations.push("Increase subscriber acquisition efforts")
  
    return { healthScore, metrics, recommendations }
  }
  