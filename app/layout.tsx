import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Optimized font loading with next/font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif"
  ],
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

// Enhanced metadata for SEO with JBrand branding
type CustomMetadata = Omit<Metadata, "other"> & {
  other?: Record<string, string | undefined> & {
    "apple-mobile-web-app-capable"?: string
    "apple-mobile-web-app-status-bar-style"?: string
    "apple-mobile-web-app-title"?: string
    "mobile-web-app-capable"?: string
    "msapplication-TileColor"?: string
    "msapplication-TileImage"?: string
    "msapplication-config"?: string
    "application-name"?: string
    "apple-touch-fullscreen"?: string
    "format-detection"?: string
    HandheldFriendly?: string
    MobileOptimized?: string
    "theme-color"?: string
    "color-scheme"?: string
    "apple-mobile-web-app-orientation"?: string
    "mobile-web-app-status-bar-style"?: string
    "fb:app_id"?: string
    "og:site_name"?: string
    "twitter:domain"?: string
    "revisit-after"?: string
    distribution?: string
    rating?: string
    robots?: string
    "dns-prefetch"?: string
    preconnect?: string
    referrer?: string
  }
}

export const metadata: CustomMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://jbrand.agency"),
  title: {
    default: "JBrand | Strategic Branding & Digital Design Agency",
    template: "",
  },
  description:
    "Transform your business with powerful branding solutions. JBrand offers comprehensive branding, web development, digital marketing, and strategic design services that drive measurable results for businesses worldwide.",
  keywords: [
    "branding agency",
    "digital design",
    "web development",
    "brand identity",
    "logo design",
    "digital marketing",
    "brand strategy",
    "creative agency",
    "business transformation",
    "visual identity",
    "brand positioning",
    "marketing collateral",
    "website design",
    "app development",
    "social media marketing",
    "print design",
    "strategic branding",
    "corporate identity",
    "brand consulting",
    "creative solutions",
  ],
  authors: [{ name: "JBrand Creative Team", url: "https://jbrand.agency" }],
  creator: "JBrand Agency",
  publisher: "JBrand Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "JBrand | Strategic Branding & Digital Design Agency",
    description:
      "Transform your business with powerful branding solutions. From captivating brand identities to immersive digital experiences, JBrand helps businesses stand out in crowded markets.",
    siteName: "JBrand Agency",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JBrand - Strategic Branding & Digital Design Agency",
        type: "image/jpeg",
      },
      {
        url: "/images/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "JBrand Agency - Creative Solutions",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JBrand | Strategic Branding & Digital Design Agency",
    description:
      "Transform your business with powerful branding solutions. Comprehensive branding, web development, and digital marketing services.",
    images: ["/images/twitter-image.jpg"],
    creator: "@jbrandagency",
    site: "@jbrandagency",
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
      { url: "/jbrand_favicon.svg", sizes: "16x16", type: "image/svg" },
      { url: "/jbrand_favicon.svg", sizes: "32x32", type: "image/svg" },
      { url: "/jbrand_favicon.svg", sizes: "48x48", type: "image/svg" },
      { url: "/jbrand_favicon.svg", sizes: "any" },
    ],
    apple: [
      { url: "/jbrand_favicon.svg", sizes: "180x180", type: "image/svg" },
      { url: "/jbrand_favicon.svg", sizes: "152x152", type: "image/svg" },
      { url: "/jbrand_favicon.svg", sizes: "144x144", type: "image/svg" },
      { url: "/jbrand_favicon.svg", sizes: "120x120", type: "image/svg" },
    ],
    other: [
      { rel: "shortcut icon", url: "/jbrand_favicon.svg" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "Business Services",
  classification: "Creative Agency",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
      "facebook-domain-verification": process.env.FACEBOOK_DOMAIN_VERIFICATION || "",
      "p:domain_verify": process.env.PINTEREST_DOMAIN_VERIFICATION || "",
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "es-ES": "/es",
      "fr-FR": "/fr",
      "de-DE": "/de",
      "pt-BR": "/pt",
      "it-IT": "/it",
      "ja-JP": "/ja",
      "ko-KR": "/ko",
      "zh-CN": "/zh",
    },
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "JBrand Blog RSS Feed" },
        { url: "/news.xml", title: "JBrand News RSS Feed" },
      ],
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "JBrand",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#2563eb",
    "msapplication-TileImage": "/mstile-144x144.png",
    "msapplication-config": "/browserconfig.xml",
    "application-name": "JBrand Agency",
    "apple-touch-fullscreen": "yes",
    "format-detection": "telephone=no",
    HandheldFriendly: "True",
    MobileOptimized: "320",
    "theme-color": "#2563eb",
    "color-scheme": "light dark",
    // Enhanced PWA metadata
    "apple-mobile-web-app-orientation": "portrait",
    "mobile-web-app-status-bar-style": "black-translucent",
    // Social media optimization
    "fb:app_id": process.env.FACEBOOK_APP_ID || "",
    "og:site_name": "JBrand Agency",
    "twitter:domain": "jbrand.agency",
    // Enhanced SEO
    "revisit-after": "7 days",
    distribution: "global",
    rating: "general",
    robots: "index,follow,noodp,noydir",
    // Performance hints
    "dns-prefetch": "true",
    preconnect: "true",
    // Security headers
    referrer: "strict-origin-when-cross-origin",
  },
}

// Enhanced viewport configuration with better mobile optimization
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-reduced-motion: reduce)", color: "#2563eb" },
  ],
  colorScheme: "light dark",
  interactiveWidget: "resizes-content",
}

// Enhanced JSON-LD structured data for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://jbrand.agency/#organization",
      name: "JBrand Agency",
      alternateName: "JBrand",
      url: "https://jbrand.agency",
      logo: {
        "@type": "ImageObject",
        url: "https://jbrand.agency/images/logo.png",
        width: 512,
        height: 512,
      },
      image: {
        "@type": "ImageObject",
        url: "https://jbrand.agency/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
      description:
        "Strategic branding and digital design agency specializing in brand identity, web development, and digital marketing solutions.",
      foundingDate: "2019",
      founders: [
        {
          "@type": "Person",
          name: "JBrand Team",
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Creative Street",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10001",
        addressCountry: "US",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+1-555-123-4567",
          contactType: "customer service",
          email: "hello@jbrand.agency",
          availableLanguage: ["English", "Spanish", "French"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+1-555-123-4567",
          contactType: "sales",
          email: "sales@jbrand.agency",
        },
      ],
      sameAs: [
        "https://facebook.com/jbrandagency",
        "https://twitter.com/jbrandagency",
        "https://instagram.com/jbrandagency",
        "https://linkedin.com/company/jbrandagency",
        "https://youtube.com/jbrandagency",
      ],
      serviceArea: {
        "@type": "Place",
        name: "Worldwide",
      },
      areaServed: "Worldwide",
      knowsAbout: [
        "Brand Identity Design",
        "Web Development",
        "Digital Marketing",
        "Logo Design",
        "Brand Strategy",
        "Social Media Marketing",
        "Print Design",
        "App Development",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "JBrand Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Brand Identity Design",
              description:
                "Complete brand identity packages including logo design, color palettes, and brand guidelines.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Development",
              description: "Custom website development with modern design and optimal performance.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Marketing",
              description: "Comprehensive digital marketing strategies to grow your online presence.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://jbrand.agency/#website",
      url: "https://jbrand.agency",
      name: "JBrand Agency",
      description: "Strategic branding and digital design agency",
      publisher: {
        "@id": "https://jbrand.agency/#organization",
      },
      inLanguage: "en-US",
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://jbrand.agency/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://jbrand.agency/#webpage",
      url: "https://jbrand.agency",
      name: "JBrand | Strategic Branding & Digital Design Agency",
      isPartOf: {
        "@id": "https://jbrand.agency/#website",
      },
      about: {
        "@id": "https://jbrand.agency/#organization",
      },
      description:
        "Transform your business with powerful branding solutions. JBrand offers comprehensive branding, web development, and digital marketing services.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://jbrand.agency",
          },
        ],
      },
      mainEntity: {
        "@id": "https://jbrand.agency/#organization",
      },
      datePublished: "2019-01-01T00:00:00+00:00",
      dateModified: new Date().toISOString(),
    },
  ],
}

export default async function RootLayout({
  children,
  params = { locale: "en" },
}: {
  children: React.ReactNode
  params?: { locale?: string }
}) {
  const locale = params?.locale || "en"

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Enhanced DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured data for enhanced SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Enhanced security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

        {/* Enhanced PWA support */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JBrand" />
        <meta name="application-name" content="JBrand Agency" />
        <meta name="msapplication-tooltip" content="JBrand - Strategic Branding Agency" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-navbutton-color" content="#2563eb" />

        {/* Enhanced social media optimization */}
        <meta property="og:image:alt" content="JBrand - Strategic Branding & Digital Design Agency" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image:alt" content="JBrand - Strategic Branding & Digital Design Agency" />

        {/* Enhanced performance hints */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS for initial paint */
            html {
              scroll-behavior: smooth;
              font-size: 16px;
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              text-size-adjust: 100%;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
              font-feature-settings: "cv02", "cv03", "cv04", "cv11", "kern", "liga", "calt";
              font-variant-ligatures: common-ligatures contextual;
              font-variant-numeric: oldstyle-nums proportional-nums;
              overflow-x: hidden;
              background-color: var(--surface-primary, hsl(0 0% 100%));
              color: var(--text-primary, hsl(222.2 84% 4.9%));
              transition: background-color 0.3s cubic-bezier(0.33, 1, 0.68, 1), color 0.3s cubic-bezier(0.33, 1, 0.68, 1);
            }
            
            /* Enhanced focus styles for accessibility */
            *:focus-visible {
              outline: none;
              box-shadow: 0 0 0 2px hsl(221.2 83.2% 53.3%), 0 0 0 4px hsl(221.2 83.2% 53.3% / 0.3);
              transition: box-shadow 0.2s cubic-bezier(0.33, 1, 0.68, 1);
            }
            
            /* Loading state styles */
            .loading-skeleton {
              background: linear-gradient(90deg, var(--surface-secondary, #f0f0f0) 25%, var(--border, #e0e0e0) 50%, var(--surface-secondary, #f0f0f0) 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            
            /* Dark mode loading skeleton */
            @media (prefers-color-scheme: dark) {
              .loading-skeleton {
                background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
                background-size: 200% 100%;
              }
              
              body {
                background-color: var(--dark-surface-primary, hsl(222.2 84% 4.9%));
                color: var(--dark-text-primary, hsl(210 40% 98%));
              }
            }
            
            /* Light mode defaults */
            @media (prefers-color-scheme: light) {
              body {
                background-color: var(--surface-primary, hsl(0 0% 100%));
                color: var(--text-primary, hsl(222.2 84% 4.9%));
              }
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
              *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
              html { scroll-behavior: auto; }
            }
            
            /* High contrast mode support */
            @media (prefers-contrast: high) {
              * {
                text-shadow: none !important;
                box-shadow: none !important;
              }
            }
            
            /* Enhanced selection styles */
            ::selection {
              background-color: hsl(221.2 83.2% 53.3% / 0.2);
              color: hsl(210 40% 98%);
            }
            
            ::-moz-selection {
              background-color: hsl(221.2 83.2% 53.3% / 0.2);
              color: hsl(210 40% 98%);
            }
            
            /* Enhanced scrollbar for critical loading */
            ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: hsl(210 40% 96.1% / 0.3);
              border-radius: 100px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: hsl(215.4 16.3% 46.9% / 0.4);
              border-radius: 100px;
              transition: background 0.2s cubic-bezier(0.33, 1, 0.68, 1);
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: hsl(215.4 16.3% 46.9% / 0.6);
            }
            
            /* Critical layout styles */
            .container {
              width: 100%;
              margin-left: auto;
              margin-right: auto;
              padding-left: 1rem;
              padding-right: 1rem;
            }
            
            @media (min-width: 640px) {
              .container { max-width: 640px; }
            }
            
            @media (min-width: 768px) {
              .container { max-width: 768px; }
            }
            
            @media (min-width: 1024px) {
              .container { max-width: 1024px; }
            }
            
            @media (min-width: 1280px) {
              .container { max-width: 1280px; }
            }
            
            @media (min-width: 1536px) {
              .container { max-width: 1536px; }
            }
          `,
          }}
        />
      </head>
      <body className={`min-h-screen bg-surface-primary text-text-primary dark:bg-dark-surface-primary dark:text-dark-text-primary antialiased ${inter.variable} ${poppins.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
