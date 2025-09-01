"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // Google Analytics 4
      if (process.env.NEXT_PUBLIC_GA_ID) {
        const gtag = (window as typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag
        if (gtag) {
          gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
            page_path: pathname + searchParams.toString(),
          })
        }
      }

      // Web Vitals reporting
      if ("web-vital" in window) {
        import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
          onCLS(console.log)
          onINP(console.log)
          onFCP(console.log)
          onLCP(console.log)
          onTTFB(console.log)
        })
      }
    }
  }, [pathname, searchParams])

  // Only render analytics scripts in production
  if (process.env.NODE_ENV !== "production") {
    return null
  }

  return (
    <>
      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                  respect_dnt: true
                });
              `,
            }}
          />
        </>
      )}

      {/* Microsoft Clarity */}
      {process.env.NEXT_PUBLIC_CLARITY_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `,
          }}
        />
      )}
    </>
  )
}
