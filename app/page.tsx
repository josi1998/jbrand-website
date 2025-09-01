import { redirect } from "next/navigation"
import { headers } from "next/headers"
import type { Metadata } from "next"

// Enhanced supported locales configuration with regional variants
const SUPPORTED_LOCALES = [
  "en", // English
  "es", // Spanish
  "fr", // French
  "de", // German
  "it", // Italian
  "pt", // Portuguese
  "ja", // Japanese
  "ko", // Korean
  "zh", // Chinese
  "ar", // Arabic
  "ru", // Russian
  "hi", // Hindi
] as const

const DEFAULT_LOCALE = "en"

// Locale metadata for better UX
const LOCALE_INFO = {
  en: { name: "English", nativeName: "English", region: "US", dir: "ltr" },
  es: { name: "Spanish", nativeName: "Español", region: "ES", dir: "ltr" },
  fr: { name: "French", nativeName: "Français", region: "FR", dir: "ltr" },
  de: { name: "German", nativeName: "Deutsch", region: "DE", dir: "ltr" },
  it: { name: "Italian", nativeName: "Italiano", region: "IT", dir: "ltr" },
  pt: { name: "Portuguese", nativeName: "Português", region: "BR", dir: "ltr" },
  ja: { name: "Japanese", nativeName: "日本語", region: "JP", dir: "ltr" },
  ko: { name: "Korean", nativeName: "한국어", region: "KR", dir: "ltr" },
  zh: { name: "Chinese", nativeName: "中文", region: "CN", dir: "ltr" },
  ar: { name: "Arabic", nativeName: "العربية", region: "SA", dir: "rtl" },
  ru: { name: "Russian", nativeName: "Русский", region: "RU", dir: "ltr" },
  hi: { name: "Hindi", nativeName: "हिन्दी", region: "IN", dir: "ltr" },
} as const

// Enhanced locale detection with regional preferences
function detectLocale(acceptLanguage: string | null, userAgent: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE

  // Parse Accept-Language header with regional support
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [fullCode, q = "1"] = lang.trim().split(";q=")
      if (!fullCode) return null
      const [primaryCode, regionCode] = fullCode.toLowerCase().split("-")
      return {
        primary: primaryCode,
        region: regionCode,
        full: fullCode.toLowerCase(),
        quality: Number.parseFloat(q) || 1,
      }
    })
    .filter((lang): lang is NonNullable<typeof lang> => lang !== null)
    .sort((a, b) => b.quality - a.quality)

  // First, try to find exact match (language + region)
  for (const lang of languages) {
    if (SUPPORTED_LOCALES.includes(lang.primary as (typeof SUPPORTED_LOCALES)[number])) {
      return lang.primary as (typeof SUPPORTED_LOCALES)[number]
    }
  }

  // Fallback to primary language code
  for (const lang of languages) {
    const primaryMatch = SUPPORTED_LOCALES.find((locale) => locale === lang.primary)
    if (primaryMatch) {
      return primaryMatch
    }
  }

  // Enhanced user agent detection for mobile/region preferences
  if (userAgent) {
    const ua = userAgent.toLowerCase()
    // Mobile-specific locale detection
    if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
      // Could add mobile-specific locale preferences here
    }
    // Region-specific detection from user agent
    if (ua.includes("zh-cn") || ua.includes("china")) return "zh"
    if (ua.includes("ja-jp") || ua.includes("japan")) return "ja"
    if (ua.includes("ko-kr") || ua.includes("korea")) return "ko"
  }

  return DEFAULT_LOCALE
}

// Enhanced metadata with comprehensive SEO
export const metadata: Metadata = {
  title: {
    default: "JBrand - Strategic Branding & Digital Design Agency | Redirecting...",
    template: "%s | JBrand",
  },
  description:
    "Redirecting to your preferred language. JBrand transforms businesses through powerful branding solutions, web development, and strategic design services worldwide.",
  keywords: [
    "branding agency",
    "digital design",
    "web development",
    "international",
    "multilingual",
    "global branding",
    "creative agency",
    "brand strategy",
    "logo design",
    "website design",
  ],
  authors: [{ name: "JBrand Creative Team", url: "https://jbrand.agency" }],
  creator: "JBrand Agency",
  publisher: "JBrand Agency",
  robots: {
    index: false, // Don't index redirect pages
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
    languages: Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, `/${locale}`])),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: SUPPORTED_LOCALES.map((locale) => `${locale}_${LOCALE_INFO[locale].region}`),
    url: "/",
    title: "JBrand - Strategic Branding & Digital Design Agency",
    description: "Transform your business with powerful branding solutions. Available in multiple languages worldwide.",
    siteName: "JBrand Agency",
    images: [
      {
        url: "/images/og-image-redirect.jpg",
        width: 1200,
        height: 630,
        alt: "JBrand - Available Worldwide",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JBrand - Strategic Branding & Digital Design Agency",
    description: "Transform your business with powerful branding solutions. Available in multiple languages worldwide.",
    images: ["/images/twitter-image-redirect.jpg"],
    creator: "@jbrandagency",
    site: "@jbrandagency",
  },
  other: {
    "content-language": "en",
    "geo.region": "US",
    "geo.placename": "Global",
    distribution: "global",
    audience: "all",
    rating: "general",
    "revisit-after": "1 day",
  },
}

// Enhanced analytics and logging
function logRedirectAnalytics(data: {
  acceptLanguage: string | null
  detectedLocale: string
  userAgent: string | null
  timestamp: string
}) {
  if (process.env.NODE_ENV === "development") {
    console.log("🌐 Root page redirect analytics:", {
      ...data,
      supportedLocales: SUPPORTED_LOCALES.length,
      defaultLocale: DEFAULT_LOCALE,
    })
  }

  // In production, send to analytics service
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GA_ID) {
    // Could send custom event to Google Analytics
    // gtag('event', 'locale_redirect', { ... })
  }
}

export default async function RootPage() {
  // Get headers for enhanced locale detection
  const headersList = await headers()
  const acceptLanguage = headersList.get("accept-language")
  const userAgent = headersList.get("user-agent")
  // Additional headers for future use
  // const xForwardedFor = headersList.get("x-forwarded-for")
  // const cfIpCountry = headersList.get("cf-ipcountry") // Cloudflare country header

  // Enhanced locale detection
  const detectedLocale = detectLocale(acceptLanguage, userAgent)

  // Log analytics data
  logRedirectAnalytics({
    acceptLanguage,
    detectedLocale,
    userAgent,
    timestamp: new Date().toISOString(),
  })

  // Enhanced redirect with proper status code
  redirect(`/${detectedLocale}`)
}

// Enhanced fallback component with modern design using new design system
// Note: This component is kept for potential future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function RootPageFallback() {
  const currentYear = new Date().getFullYear()

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="refresh" content="0; url=/en" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light dark" />
        <title>JBrand - Redirecting to Your Language...</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            /* New design system colors */
            --surface-primary: 0 0% 100%;
            --surface-secondary: 0 0% 98%;
            --surface-tertiary: 210 40% 96.1%;
            --text-primary: 222.2 84% 4.9%;
            --text-secondary: 215.4 16.3% 46.9%;
            --text-tertiary: 215.4 16.3% 65%;
            --border: 214.3 31.8% 91.4%;
            
            /* Brand colors */
            --brand-blue: 221.2 83.2% 53.3%;
            --brand-indigo: 239 84% 67%;
            --brand-purple: 262.1 83.3% 57.8%;
            
            /* Enhanced design tokens */
            --radius: 0.75rem;
            --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            --blur-lg: 12px;
            --blur-xl: 16px;
            
            /* Animation system */
            --animation-fast: 0.2s;
            --animation-normal: 0.3s;
            --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --surface-primary: 222.2 84% 4.9%;
              --surface-secondary: 217.2 32.6% 17.5%;
              --surface-tertiary: 217.2 32.6% 20%;
              --text-primary: 210 40% 98%;
              --text-secondary: 215 20.2% 65.1%;
              --text-tertiary: 215 20.2% 50%;
              --border: 217.2 32.6% 17.5%;
            }
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
            min-height: 100dvh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, hsl(var(--brand-blue)) 0%, hsl(var(--brand-indigo)) 50%, hsl(var(--brand-purple)) 100%);
            color: hsl(var(--surface-primary));
            padding: 1rem;
            overflow: hidden;
            position: relative;
          }

          /* Enhanced animated background with design system */
          body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
            animation: float 20s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(1deg); }
            66% { transform: translateY(10px) rotate(-1deg); }
          }

          .container {
            text-align: center;
            padding: 3rem 2rem;
            max-width: 600px;
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(var(--blur-xl));
            -webkit-backdrop-filter: blur(var(--blur-xl));
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: calc(var(--radius) * 2);
            box-shadow: var(--shadow-xl);
            position: relative;
            z-index: 1;
          }

          .logo {
            font-family: 'Poppins', sans-serif;
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.025em;
            position: relative;
          }

          .logo::after {
            content: '';
            position: absolute;
            bottom: -0.5rem;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
            border-radius: 2px;
          }

          .subtitle {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            opacity: 0.95;
            color: hsl(var(--surface-primary));
          }

          .message {
            font-size: 1.125rem;
            margin-bottom: 3rem;
            opacity: 0.85;
            line-height: 1.6;
            color: hsl(var(--surface-primary));
          }

          .spinner-container {
            margin-bottom: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }

          .spinner {
            width: 48px;
            height: 48px;
            border: 3px solid rgba(255, 255, 255, 0.2);
            border-top: 3px solid rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .progress-bar {
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
            position: relative;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
            border-radius: 2px;
            animation: progress 3s ease-out forwards;
          }

          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }

          .fallback-section {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
          }

          .fallback-title {
            font-size: 1rem;
            font-weight: 600;
            opacity: 0.9;
            margin-bottom: 1.5rem;
            color: hsl(var(--surface-primary));
          }

          .language-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.75rem;
            max-width: 500px;
            margin: 0 auto;
          }

          .language-link {
            color: hsl(var(--surface-primary));
            text-decoration: none;
            padding: 0.75rem 1rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: var(--radius);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
            transition: all var(--animation-normal) var(--ease-out-cubic);
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(var(--blur-lg));
            -webkit-backdrop-filter: blur(var(--blur-lg));
            font-size: 0.875rem;
            font-weight: 500;
          }

          .language-link:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }

          .language-link:active {
            transform: translateY(0);
          }

          .language-native {
            font-weight: 600;
            font-size: 0.9rem;
          }

          .language-english {
            opacity: 0.8;
            font-size: 0.75rem;
          }

          .footer {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.875rem;
            opacity: 0.7;
            color: hsl(var(--surface-primary));
          }

          /* Enhanced responsive design */
          @media (max-width: 640px) {
            .container {
              padding: 2rem 1.5rem;
              margin: 1rem;
            }
            .language-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 0.5rem;
            }
            .language-link {
              padding: 0.625rem 0.75rem;
              font-size: 0.8rem;
            }
          }

          /* Accessibility enhancements */
          @media (prefers-reduced-motion: reduce) {
            .spinner,
            .progress-fill,
            body::before {
              animation: none;
            }
            .language-link:hover {
              transform: none;
            }
          }

          @media (prefers-contrast: high) {
            .container {
              background: rgba(0, 0, 0, 0.8);
              border: 2px solid white;
            }
            .language-link {
              border: 2px solid rgba(255, 255, 255, 0.8);
            }
          }

          /* Focus styles for accessibility */
          .language-link:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8), 0 0 0 4px rgba(255, 255, 255, 0.3);
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="logo">JBrand</div>
          <div className="subtitle">Strategic Branding & Digital Design</div>
          <div className="message">Detecting your preferred language and redirecting you to the best experience...</div>

          <div className="spinner-container">
            <div className="spinner" aria-label="Loading"></div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>

          <div className="fallback-section">
            <div className="fallback-title">If you&apos;re not redirected automatically, choose your language:</div>
            <div className="language-grid">
              {Object.entries(LOCALE_INFO).map(([code, info]) => (
                <a key={code} href={`/${code}`} className="language-link">
                  <span className="language-native">{info.nativeName}</span>
                  <span className="language-english">{info.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer">
            © {currentYear} JBrand Agency. Available worldwide in {SUPPORTED_LOCALES.length} languages.
          </div>
        </div>

        <script>{`
          // Enhanced fallback JavaScript redirect with analytics
          (function() {
            const SUPPORTED_LOCALES = ${JSON.stringify(SUPPORTED_LOCALES)};
            const DEFAULT_LOCALE = '${DEFAULT_LOCALE}';

            function detectBrowserLocale() {
              // Try multiple browser locale detection methods
              const browserLang = navigator.language || navigator.languages?.[0] || navigator.userLanguage;
              if (!browserLang) return DEFAULT_LOCALE;

              const primaryLang = browserLang.toLowerCase().split('-')[0];
              return SUPPORTED_LOCALES.includes(primaryLang) ? primaryLang : DEFAULT_LOCALE;
            }

            function performRedirect() {
              if (window.location.pathname === '/') {
                const targetLang = detectBrowserLocale();

                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'locale_redirect', {
                    'detected_locale': targetLang,
                    'browser_language': navigator.language,
                    'redirect_method': 'javascript_fallback'
                  });
                }

                // Smooth redirect
                window.location.replace('/' + targetLang);
              }
            }

            // Immediate redirect attempt
            performRedirect();

            // Fallback after 3 seconds
            setTimeout(performRedirect, 3000);

            // Handle visibility change (tab focus)
            document.addEventListener('visibilitychange', function() {
              if (!document.hidden) {
                performRedirect();
              }
            });
          })();
        `}</script>
      </body>
    </html>
  )
}
