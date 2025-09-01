import type React from "react"
import { Inter, Poppins } from "next/font/google"
import "../globals.css"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import Navigation from "@/components/Navigation"
import TawkToChat from "@/components/TawkToChat"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { ProgressBar } from "@/components/progress-bar"
import { ErrorBoundary } from "@/components/error-boundary"
import PageTransition from "@/components/PageTransition"
import type { Metadata } from "next"
import { Suspense } from "react"

// Enhanced font configuration with multiple weights and display optimization
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
})

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
})

// Enhanced static params generation with supported locales
export function generateStaticParams(): Array<{ locale: string }> {
  return [{ locale: "en" }, { locale: "fr" }]
}

// Enhanced metadata with dynamic locale support
export async function generateMetadata({
  params: { locale = "en" },
}: {
  params: { locale?: string }
}): Promise<Metadata> {
  // Load locale-specific metadata
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    // Fallback to English if locale not found
    messages = (await import(`../../messages/en.json`)).default
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jbrand.agency"

  return {
    title: {
      default: messages?.metadata?.title || "JBrand - Strategic Branding & Digital Design Agency",
      template: `%s | ${messages?.metadata?.siteName || "JBrand"}`,
    },
    description:
      messages?.metadata?.description ||
      "Transform your business with powerful branding solutions. JBrand offers comprehensive branding, web development, digital marketing, and strategic design services that drive measurable results.",
    keywords: messages?.metadata?.keywords || [
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
    ],
    authors: [{ name: "JBrand Creative Team", url: baseUrl }],
    creator: "JBrand Agency",
    publisher: "JBrand Agency",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "fr_FR"],
      url: `/${locale}`,
      title: messages?.metadata?.ogTitle || "JBrand - Strategic Branding & Digital Design Agency",
      description:
        messages?.metadata?.ogDescription ||
        "Transform your business with powerful branding solutions. From captivating brand identities to immersive digital experiences.",
      siteName: messages?.metadata?.siteName || "JBrand Agency",
      images: [
        {
          url: `/images/og-image-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: messages?.metadata?.ogImageAlt || "JBrand - Strategic Branding Agency",
          type: "image/jpeg",
        },
        {
          url: `/images/og-image-square-${locale}.jpg`,
          width: 1200,
          height: 1200,
          alt: messages?.metadata?.ogImageAlt || "JBrand Agency Logo",
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages?.metadata?.twitterTitle || "JBrand - Strategic Branding & Digital Design Agency",
      description:
        messages?.metadata?.twitterDescription ||
        "Transform your business with powerful branding solutions. Comprehensive branding, web development, and digital marketing services.",
      images: [`/images/twitter-image-${locale}.jpg`],
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
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
      other: {
        "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
        "facebook-domain-verification": process.env.FACEBOOK_DOMAIN_VERIFICATION || "",
      },
    },
    category: "Business Services",
    classification: "Creative Agency",
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": messages?.metadata?.appTitle || "JBrand",
      "mobile-web-app-capable": "yes",
      "format-detection": "telephone=no",
      // Locale-specific metadata
      "content-language": locale,
      language: locale,
      "geo.region": getRegionFromLocale(locale),
      "geo.placename": getCityName(locale),
    },
  }
}

// Enhanced viewport configuration with proper theme colors
export function generateViewport({ params: { locale = "en" } }: { params: { locale?: string } }) {
  // Use locale for future localization features
  const themeColors = locale === "fr" ? 
    [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ] :
    [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ];

  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: themeColors,
    colorScheme: "light dark",
  }
}

// Helper functions for geo metadata
function getRegionFromLocale(locale = "en"): string {
  const regions: Record<string, string> = {
    en: "US-NY",
    fr: "FR-IDF",
  }
  return regions[locale] || "US-NY"
}

function getCityName(locale = "en"): string {
  const cities: Record<string, string> = {
    en: "New York",
    fr: "Paris",
  }
  return cities[locale] || "New York"
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale?: string }
}

export default async function LocaleLayout({ children, params: { locale = "en" } }: LocaleLayoutProps) {
  // Enhanced message loading with fallback
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    console.warn(`Messages for locale "${locale}" not found, falling back to English`)
    try {
      messages = (await import(`../../messages/en.json`)).default
    } catch {
      console.error("Failed to load fallback messages")
      notFound()
    }
  }

  // Validate locale
  const supportedLocales = ["en", "fr"] as const
  if (!(supportedLocales as readonly string[]).includes(locale)) {
    notFound()
  }

  return (
    <div className={`min-h-screen bg-surface-primary font-sans antialiased ${inter.variable} ${poppins.variable}`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ErrorBoundary>
          {/* Progress bar for navigation */}
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>

          {/* Main app structure */}
          <div className="relative flex min-h-screen flex-col">
            {/* Enhanced navigation with locale support */}
            <Navigation />

            {/* Main content area with enhanced accessibility */}
            <main
              className="flex-1 w-full"
              id="main-content"
              role="main"
              aria-label={messages?.accessibility?.mainContent || "Main content"}
            >
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                }
              >
                <PageTransition>{children}</PageTransition>
              </Suspense>
            </main>

            {/* Enhanced footer */}
            <Footer />
          </div>

          {/* Chat widget */}
          <TawkToChat locale={locale} />

          {/* Toast notifications */}
          <Toaster />

          {/* Analytics */}
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>

          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
          >
            {messages?.accessibility?.skipToMain || "Skip to main content"}
          </a>
        </ErrorBoundary>
      </NextIntlClientProvider>
    </div>
  )
}

// Service worker registration is handled in a client component
