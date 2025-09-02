"use client"

import { useTranslations } from "next-intl"

export default function PrivacyPolicyTemplate() {
  const t = useTranslations()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          {t("privacy.title") || "Privacy Policy"}
        </h1>
        <div className="prose prose-lg max-w-none">
          <p>
            {t("privacy.content") || "This is a placeholder for the privacy policy content. Please update this with your actual privacy policy."}
          </p>
        </div>
      </div>
    </div>
  )
}