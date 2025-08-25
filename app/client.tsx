"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { NextIntlClientProvider } from "next-intl"

export default function ClientComponent({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const locale = document.documentElement.lang
        const response = await fetch(`/locales/${locale}.json`)
        const data = await response.json()
        setMessages(data)
        setIsLoaded(true)
      } catch (error) {
        console.error("Failed to load messages:", error)
        setIsLoaded(true)
      }
    }

    fetchMessages()
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <NextIntlClientProvider locale={document.documentElement.lang} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
