import type { Metadata, Viewport } from "next"

// Base configuration for the application
export const siteConfig = {
  name: "JBrand - Creative Agency",
  title: "JBrand - Your Branding Partner",
  description:
    "Your branding partner for digital success. Professional branding, web development, and digital marketing services to transform your business.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jbrand.agency",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/jbrand_agency",
    linkedin: "https://linkedin.com/company/jbrand-agency",
    instagram: "https://instagram.com/jbrand.agency",
    facebook: "https://facebook.com/jbrand.agency",
  },
  creator: "JBrand Creative Agency",
  keywords: [
    "branding",
    "web design",
    "digital marketing",
    "logo design",
    "brand identity",
    "creative agency",
    "web development",
    "UI/UX design",
    "graphic design",
    "marketing strategy",
    "brand strategy",
    "creative services",
  ],
  authors: [
    {
      name: "JBrand Team",
      url: "https://jbrand.agency/about",
    },
  ],
  contact: {
    email: "hello@jbrand.agency",
    phone: "+1 (555) 123-4567",
    address: "123 Creative Street, Design City, DC 12345",
  },
}

// Default metadata configuration
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Creative Agency`,
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: `${siteConfig.name} - Square Logo`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@jbrand_agency",
    site: "@jbrand_agency",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2465ED" }],
  },
  manifest: "/site.webmanifest",
  category: "business",
  classification: "Creative Services",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": "/en",
      "es-ES": "/es",
      "fr-FR": "/fr",
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "JBrand",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#2465ED",
    "msapplication-config": "/browserconfig.xml",
  },
}

// Default viewport configuration
export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
}

// Page-specific metadata generators
export const pageMetadata = {
  home: (): Metadata => ({
    title: "Home",
    description:
      "Transform your brand with JBrand's creative expertise. Professional branding, web design, and digital marketing services.",
    openGraph: {
      title: "JBrand - Creative Agency | Transform Your Brand",
      description: "Professional branding and digital solutions for modern businesses.",
      images: ["/og-home.jpg"],
    },
  }),

  about: (): Metadata => ({
    title: "About Us",
    description:
      "Learn about JBrand's mission, values, and the creative team behind award-winning brand transformations.",
    openGraph: {
      title: "About JBrand - Creative Agency Team",
      description: "Meet the creative minds behind successful brand transformations.",
      images: ["/og-about.jpg"],
    },
  }),

  services: (): Metadata => ({
    title: "Services",
    description:
      "Comprehensive branding, web design, and digital marketing services. From logo design to complete brand identity systems.",
    keywords: [
      ...siteConfig.keywords,
      "branding services",
      "web design services",
      "logo design",
      "brand identity",
      "digital marketing services",
    ],
    openGraph: {
      title: "JBrand Services - Branding & Digital Solutions",
      description: "Professional branding, web design, and digital marketing services.",
      images: ["/og-services.jpg"],
    },
  }),

  contact: (): Metadata => ({
    title: "Contact Us",
    description:
      "Get in touch with JBrand for your next creative project. Free consultation available for branding and web design services.",
    openGraph: {
      title: "Contact JBrand - Start Your Creative Project",
      description: "Ready to transform your brand? Contact our creative team today.",
      images: ["/og-contact.jpg"],
    },
  }),

  portfolio: (): Metadata => ({
    title: "Portfolio",
    description:
      "Explore JBrand's portfolio of successful brand transformations, web designs, and creative projects across various industries.",
    openGraph: {
      title: "JBrand Portfolio - Creative Work & Case Studies",
      description: "Discover our award-winning creative work and successful brand transformations.",
      images: ["/og-portfolio.jpg"],
    },
  }),

  blog: (): Metadata => ({
    title: "Blog",
    description:
      "Latest insights on branding, design trends, and digital marketing strategies from the JBrand creative team.",
    openGraph: {
      title: "JBrand Blog - Design & Branding Insights",
      description: "Expert insights on branding, design, and digital marketing.",
      images: ["/og-blog.jpg"],
    },
  }),
}

// Dynamic metadata generator for blog posts
export const generateBlogPostMetadata = (post: {
  title: string
  description: string
  slug: string
  publishedAt: string
  author: string
  tags: string[]
  image?: string
}): Metadata => ({
  title: post.title,
  description: post.description,
  keywords: [...siteConfig.keywords, ...post.tags],
  authors: [{ name: post.author }],
  openGraph: {
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.publishedAt,
    authors: [post.author],
    images: post.image ? [post.image] : [siteConfig.ogImage],
    url: `${siteConfig.url}/blog/${post.slug}`,
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: post.image ? [post.image] : [siteConfig.ogImage],
  },
  alternates: {
    canonical: `${siteConfig.url}/blog/${post.slug}`,
  },
})

// Dynamic metadata generator for service pages
export const generateServiceMetadata = (service: {
  title: string
  description: string
  slug: string
  features: string[]
  image?: string
}): Metadata => ({
  title: service.title,
  description: service.description,
  keywords: [...siteConfig.keywords, ...service.features],
  openGraph: {
    title: `${service.title} | JBrand Services`,
    description: service.description,
    images: service.image ? [service.image] : ["/og-services.jpg"],
    url: `${siteConfig.url}/services/${service.slug}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${service.title} | JBrand`,
    description: service.description,
    images: service.image ? [service.image] : ["/og-services.jpg"],
  },
  alternates: {
    canonical: `${siteConfig.url}/services/${service.slug}`,
  },
})

// Structured data generators
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phone,
    contactType: "customer service",
    email: siteConfig.contact.email,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address,
  },
  sameAs: Object.values(siteConfig.links),
})

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
})

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteConfig.url}${item.url}`,
  })),
})

// Utility functions
export const mergeMetadata = (base: Metadata, override: Partial<Metadata>): Metadata => {
  return {
    ...base,
    ...override,
    openGraph: {
      ...base.openGraph,
      ...override.openGraph,
    },
    twitter: {
      ...base.twitter,
      ...override.twitter,
    },
  }
}

export const generateCanonicalUrl = (path: string): string => {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
}

export const generateAlternateLanguages = (path: string) => ({
  "en-US": `/en${path}`,
  "es-ES": `/es${path}`,
  "fr-FR": `/fr${path}`,
})

// Export the original metadata for backward compatibility
export const metadata = defaultMetadata
