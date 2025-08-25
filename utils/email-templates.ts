// Additional email template utilities for future use

export interface EmailTemplateData {
    name: string
    email: string
    phone?: string
    company?: string
    website?: string
    services: string
    message: string
    submittedAt: string
  }
  
  // Plain text version for better email client compatibility
  export const getPlainTextTemplate = (data: EmailTemplateData): string => `
  NEW CONTACT FORM SUBMISSION
  ===========================
  
  CONTACT INFORMATION:
  👤 Name: ${data.name}
  📧 Email: ${data.email}
  ${data.phone ? `📱 Phone: ${data.phone}` : ""}
  
  ${
    data.company || data.website
      ? `
  BUSINESS INFORMATION:
  ${data.company ? `🏢 Company: ${data.company}` : ""}
  ${data.website ? `🌐 Website: ${data.website}` : ""}
  `
      : ""
  }
  
  SERVICE INTEREST:
  🎨 ${data.services}
  
  MESSAGE:
  💬 ${data.message}
  
  SUBMISSION DETAILS:
  📅 Submitted: ${data.submittedAt}
  🌐 Source: JBrand Contact Form
  
  ---
  This email was automatically generated from your website contact form.
  `
  
  // Service categories for better organization
  export const serviceCategories = {
    design: ["logoDesign", "brandIdentity", "printDesign"],
    digital: ["webDesign", "webDevelopment", "digitalMarketing"],
    media: ["socialMedia", "videoProduction", "musicPodcastMixing"],
    strategy: ["brandStrategy", "softwareDevelopment"],
    other: ["other"],
  }
  
  // Get service category for better email organization
  export const getServiceCategory = (service: string): string => {
    for (const [category, services] of Object.entries(serviceCategories)) {
      if (services.includes(service)) {
        return category.charAt(0).toUpperCase() + category.slice(1)
      }
    }
    return "General"
  }
  