"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { FaCheck } from "react-icons/fa"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, FeatureCard, TestimonialCard, StatsCard } from "@/components/ui/card"
// import NewsletterSignup from "@/components/NewsletterSignup"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Lightbulb,
  Users,
  TrendingUp,
  Search,
  PenTool,
  Settings,
  Globe,
  Award,
  Briefcase,
  ArrowRight,
  Star,
  Sparkles,
  Play,
  Zap,
  Target,
  Rocket,
} from "lucide-react"

// Simplified floating animation component
const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const t = useTranslations()
  const locale = useLocale()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
    services: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Future scroll animations
  // const { scrollYProgress } = useScroll()
  // const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Comprehensive form validation
    const requiredFields = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim()
    }

    // Check for required fields
    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value)
      .map(([fieldName]) => fieldName)

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields)
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      console.error("Invalid email format:", formData.email)
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    // Message length validation (must be at least 10 characters)
    if (formData.message.trim().length < 10) {
      console.error("Message too short:", formData.message.length, "characters. Minimum required: 10")
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    // Message length validation (must not exceed 2000 characters)
    if (formData.message.trim().length > 2000) {
      console.error("Message too long:", formData.message.length, "characters. Maximum allowed: 2000")
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    // Services validation (at least one service should be selected)
    if (formData.services.length === 0) {
      console.error("No services selected")
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    try {
      // Prepare clean form data
      const cleanFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim() || "",
        website: formData.website.trim() || "",
        message: formData.message.trim(),
        services: formData.services,
        source: "home_page",
        locale: locale || "en"
      }

      console.log("Submitting home page form data:", {
        ...cleanFormData,
        message: cleanFormData.message.substring(0, 100) + "...",
        timestamp: new Date().toISOString()
      })

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanFormData),
      })

      console.log("API Response status:", response.status, response.statusText)

      let result
      try {
        const textResponse = await response.text()
        console.log("Raw API response:", textResponse)
        
        if (textResponse) {
          result = JSON.parse(textResponse)
        } else {
          result = { success: false, error: "Empty response from server" }
        }
      } catch (parseError) {
        console.error("Failed to parse API response:", parseError)
        result = { success: false, error: "Invalid response format from server" }
      }

      console.log("Parsed home page form response:", result)

      // Check multiple success conditions
      const isSuccess = response.ok && (result.success === true || result.message === "Email sent successfully")
      
      if (isSuccess) {
        console.log("Form submission successful")
        setSubmitStatus("success")
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          website: "",
          message: "",
          services: [],
        })
      } else {
        console.error("Form submission failed:", {
          status: response.status,
          statusText: response.statusText,
          result: result,
          responseOk: response.ok
        })
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Home page form submission error:", {
        error: error,
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      })
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-primary px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <Card variant="glass" className="shadow-modern-xl">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{t("common.messageSent")}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{t("common.weWillGetBackToYou")}</p>
              <Button 
                onClick={() => setSubmitStatus("idle")} 
                size="default"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
              >
                {t("common.sendAnotherMessage")}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-primary content-loading">
      {/* Enhanced Modern Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 lg:space-y-7"
            >
              {/* Badge - Now visible on all screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block"
              >
                <Badge variant="shimmer" size="lg" className="mb-4 !text-white hover:!text-white">
                  {t("home.heroSection.badgeText")}
                </Badge>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <>
                  {t("home.heroSection.mainHeading.part1")}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 animate-pulse">
                    {t("home.heroSection.mainHeading.business")}
                  </span>
                  {t("home.heroSection.mainHeading.part2")}
                </>
              </motion.h1>

              <motion.h2
                className="text-lg sm:text-xl lg:text-2xl font-medium text-blue-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t("home.hero.subtitle")}
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {t("home.hero.description")}
              </motion.p>

              {/* Buttons - Hidden on small screens */}
              <motion.div
                className="hidden lg:flex flex-col sm:flex-row gap-4 w-full max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button
                  size="lg"
                  variant="glow"
                  className="px-6 shadow-lg hover:shadow-xl transition-all duration-300 retain-text-color !text-white hover:!text-white"
                  asChild
                >
                  <Link href="/services">
                    {t("home.hero.exploreServices")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="glass"
                  className="border-white/20 !text-white hover:bg-white/10 bg-transparent backdrop-blur-sm retain-text-color hover:!text-white"
                  asChild
                >
                  <Link href="/contact">
                    <Play className="mr-2 h-4 w-4" />
                    {t("home.hero.getCustomPlan")}
                  </Link>
                </Button>
              </motion.div>

              {/* Buttons - Visible on small screens */}
              <motion.div
                className="lg:hidden flex flex-col gap-3 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link href="/contact" className="w-full">
                  <Button size="lg" variant="glow" className="w-full shadow-lg retain-text-color !text-white hover:!text-white">
                    {t("home.hero.getCustomPlan")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services" className="w-full">
                  <Button
                    size="lg"
                    variant="glass"
                    className="w-full text-white border-white/40 hover:bg-white/10 hover:border-white/60 bg-transparent backdrop-blur-sm retain-text-color !text-white hover:!text-white"
                  >
                    {t("home.hero.exploreServices")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-lg mx-auto lg:mx-0"
            >
              <Card variant="glass" className="shadow-modern-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold !text-white mb-2">
                      {t("home.heroSection.consultationTitle")}
                    </h3>
                    <p className="text-text-secondary text-sm">{t("home.contactForm.subtitle")}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Input
                          placeholder={`${t("home.contactForm.fields.name")} *`}
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className={`bg-surface-primary border-border text-text-primary text-sm placeholder:text-xs ${
                            !formData.name.trim() && submitStatus === "error" ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                          }`}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Input
                          type="email"
                          placeholder={`${t("home.contactForm.fields.email")} *`}
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className={`bg-surface-primary border-border text-text-primary text-sm placeholder:text-xs ${
                            (!formData.email.trim() || (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))) && submitStatus === "error" 
                              ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                          }`}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Input
                          type="tel"
                          placeholder={`${t("home.contactForm.fields.phone")} *`}
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          className={`bg-surface-primary border-border text-text-primary text-sm placeholder:text-xs ${
                            !formData.phone.trim() && submitStatus === "error" ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                          }`}
                          required
                        />
                      </div>
                      <Input
                        placeholder={t("home.contactForm.fields.company")}
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        className="bg-surface-primary border-border text-text-primary text-sm placeholder:text-xs"
                      />
                    </div>
                    <Input
                      type="url"
                      placeholder={t("home.contactForm.fields.website")}
                      value={formData.website}
                      onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                      className="bg-surface-primary border-border text-text-primary text-sm placeholder:text-xs"
                    />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-text-secondary">Message *</span>
                        <span className={`text-xs ${
                          formData.message.length < 10 
                            ? "text-red-500" 
                            : formData.message.length > 1800 
                              ? "text-orange-500" 
                              : "text-gray-500"
                        }`}>
                          {formData.message.length}/2000
                        </span>
                      </div>
                      <Textarea
                        placeholder={`${t("home.contactForm.fields.message")} (minimum 10 characters)`}
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        className={`min-h-[80px] bg-surface-primary border-border text-text-primary text-sm placeholder:text-xs ${
                          (!formData.message.trim() || formData.message.length < 10) && submitStatus === "error" 
                            ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                        }`}
                        required
                      />
                      {formData.message.length > 0 && formData.message.length < 10 && (
                        <p className="text-red-500 text-xs flex items-center">
                          <span className="mr-1">⚠️</span>
                          Message must be at least 10 characters long ({10 - formData.message.length} more needed)
                        </p>
                      )}
                      {formData.message.length >= 1800 && formData.message.length < 2000 && (
                        <p className="text-orange-500 text-xs flex items-center">
                          <span className="mr-1">⚠️</span>
                          Approaching character limit ({2000 - formData.message.length} characters remaining)
                        </p>
                      )}
                      {formData.message.length >= 2000 && (
                        <p className="text-red-500 text-xs flex items-center">
                          <span className="mr-1">❌</span>
                          Message exceeds maximum length. Please shorten your message.
                        </p>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-text-primary">
                          {t("home.contactForm.servicesTitle")} *
                        </p>
                        {formData.services.length === 0 && submitStatus === "error" && (
                          <span className="text-red-500 text-xs">⚠️ Required</span>
                        )}
                      </div>
                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border-2 transition-colors ${
                        formData.services.length === 0 && submitStatus === "error" 
                          ? "border-red-500 bg-red-50 dark:bg-red-900/10" 
                          : "border-transparent"
                      }`}>
                        {Object.entries(t.raw("home.contactForm.services") as Record<string, string>).map(
                          ([key, label]) => (
                            <label key={key} className="flex items-center space-x-2 cursor-pointer">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="peer h-4 w-4 appearance-none rounded border border-border checked:bg-blue-600 checked:border-blue-600"
                                  checked={formData.services.includes(key)}
                                  onChange={() => handleServiceChange(key)}
                                />
                                <FaCheck className="absolute top-0 left-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none p-0.5" />
                              </div>
                              <span className="text-sm text-text-secondary">{label as string}</span>
                            </label>
                          ),
                        )}
                      </div>
                      {formData.services.length === 0 && submitStatus === "error" && (
                        <p className="text-red-500 text-xs flex items-center">
                          <span className="mr-1">⚠️</span>
                          Please select at least one service
                        </p>
                      )}
                    </div>
                    <Button type="submit" disabled={isSubmitting} variant="glow" className="w-full">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          {t("home.contactForm.sendingButton")}
                        </>
                      ) : (
                        t("home.contactForm.submitButton")
                      )}
                    </Button>
                    {submitStatus === "error" && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium space-y-2">
                        <div className="font-semibold flex items-center">
                          <span className="mr-2">⚠️</span>
                          Submission Failed
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="font-semibold mb-1">Requirements checklist:</div>
                          <div className={`flex items-center ${formData.name.trim() ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            <span className="mr-2">{formData.name.trim() ? '✓' : '❌'}</span>
                            Name is required
                          </div>
                          <div className={`flex items-center ${formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            <span className="mr-2">{formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '✓' : '❌'}</span>
                            Valid email address is required
                          </div>
                          <div className={`flex items-center ${formData.phone.trim() ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            <span className="mr-2">{formData.phone.trim() ? '✓' : '❌'}</span>
                            Phone number is required
                          </div>
                          <div className={`flex items-center ${formData.message.trim().length >= 10 && formData.message.trim().length <= 2000 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            <span className="mr-2">{formData.message.trim().length >= 10 && formData.message.trim().length <= 2000 ? '✓' : '❌'}</span>
                            Message must be 10-2000 characters (currently: {formData.message.length})
                          </div>
                          <div className={`flex items-center ${formData.services.length > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            <span className="mr-2">{formData.services.length > 0 ? '✓' : '❌'}</span>
                            At least one service must be selected ({formData.services.length} selected)
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section - Enhanced Design */}
      <section className="py-12 md:py-16 bg-surface-primary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_50%,transparent_75%)] bg-[length:60px_60px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Badge variant="brand" size="lg" className="mb-5">
                <Users className="w-4 h-4 mr-2" />
                {t("common.aboutUs")}
              </Badge>
              <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-5">{t("common.whoWeAre")}</h2>
              <p className="text-base text-text-secondary leading-relaxed mb-6">{t("common.atJBrandWeAre")}</p>
              <div className="grid grid-cols-2 gap-3">
                <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                  <Card variant="interactive" className="p-3 shadow-modern">
                    <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-1.5">
                      200+
                    </h3>
                    <p className="text-text-primary font-medium text-xs">{t("common.successfulProjects")}</p>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                  <Card variant="interactive" className="p-3 shadow-modern">
                    <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-1.5">
                      1+
                    </h3>
                    <p className="text-text-primary font-medium text-xs">{t("common.yearsExperience")}</p>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 w-16 h-16 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/who-we-are.jpeg"
                  alt="Our Team"
                  width={500}
                  height={350}
                  className="object-cover w-full h-[350px] transition-transform duration-700 group-hover:scale-105"
                />
                {/* Enhanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/20" />
                {/* Floating badge */}
                <div className="absolute top-4 left-4 bg-surface-secondary/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-text-primary">Team Collaboration</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="gradient" size="lg" className="mb-3">
              <Award className="w-4 h-4 mr-2" />
              {t("common.whyChooseUs")}
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-3">{t("home.whyChooseUs.title")}</h2>
            <p className="text-base text-text-secondary max-w-xl mx-auto">{t("common.deliverExceptionalResults")}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Lightbulb className="h-6 w-6" />,
                title: t("home.whyChooseUs.features.innovative.title"),
                description: t("home.whyChooseUs.features.innovative.description"),
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: t("home.whyChooseUs.features.experienced.title"),
                description: t("home.whyChooseUs.features.experienced.description"),
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: t("home.whyChooseUs.features.proven.title"),
                description: t("home.whyChooseUs.features.proven.description"),
                gradient: "from-green-500 to-emerald-500",
              },
            ].map((feature, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  gradient={feature.gradient}
                />
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="purple" size="lg" className="mb-3">
              <Sparkles className="w-4 h-4 mr-2" />
              {t("common.ourServices")}
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-3">{t("home.ourServices.title")}</h2>
            <p className="text-base text-text-secondary max-w-xl mx-auto">{t("common.comprehensiveSolutions")}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Target className="h-6 w-6" />,
                title: t("home.ourServices.items.brandIdentity.title"),
                description: t("home.ourServices.items.brandIdentity.description"),
                gradient: "from-purple-500 to-pink-500",
                href: `/${locale}/services`,
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: t("home.ourServices.items.webDevelopment.title"),
                description: t("home.ourServices.items.webDevelopment.description"),
                gradient: "from-blue-500 to-cyan-500",
                href: `/${locale}/services`,
              },
              {
                icon: <Rocket className="h-6 w-6" />,
                title: t("home.ourServices.items.digitalMarketing.title"),
                description: t("home.ourServices.items.digitalMarketing.description"),
                gradient: "from-green-500 to-emerald-500",
                href: `/${locale}/services`,
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: t("home.ourServices.items.socialMedia.title"),
                description: t("home.ourServices.items.socialMedia.description"),
                gradient: "from-orange-500 to-red-500",
                href: `/${locale}/services`,
              },
              {
                icon: <PenTool className="h-6 w-6" />,
                title: t("home.ourServices.items.logoDesign.title"),
                description: t("home.ourServices.items.logoDesign.description"),
                gradient: "from-indigo-500 to-purple-500",
                href: `/${locale}/services`,
              },
            ].map((service, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <FeatureCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  gradient={service.gradient}
                  href={service.href}
                  linkText="Learn More"
                />
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Enhanced Design */}
      <section className="py-12 md:py-16 bg-surface-secondary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_25%,rgba(59,130,246,0.02)_50%,transparent_75%)] bg-[length:80px_80px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="teal" size="lg" className="mb-3">
              <Settings className="w-4 h-4 mr-2" />
              {t("common.ourProcess")}
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-3">{t("home.ourProcess.title")}</h2>
            <p className="text-base text-text-secondary max-w-xl mx-auto">{t("common.provenMethodology")}</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              {[
                {
                  icon: <Search className="w-5 h-5" />,
                  title: t("home.ourProcess.steps.discovery.title"),
                  description: t("home.ourProcess.steps.discovery.description"),
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Lightbulb className="w-5 h-5" />,
                  title: t("home.ourProcess.steps.strategy.title"),
                  description: t("home.ourProcess.steps.strategy.description"),
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: <PenTool className="w-5 h-5" />,
                  title: t("home.ourProcess.steps.design.title"),
                  description: t("home.ourProcess.steps.design.description"),
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: <Settings className="w-5 h-5" />,
                  title: t("home.ourProcess.steps.implementation.title"),
                  description: t("home.ourProcess.steps.implementation.description"),
                  gradient: "from-orange-500 to-red-500",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 group relative"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${step.gradient} rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-modern`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-1.5">{step.title}</h3>
                    <p className="text-text-secondary text-sm">{step.description}</p>
                  </div>
                  {/* Connection line */}
                  {index < 3 && (
                    <div className="absolute left-5 top-12 w-0.5 h-12 bg-gradient-to-b from-border to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              {/* Decorative elements */}
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-5 -left-5 w-28 h-28 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/our-process.jpeg"
                  alt="Process Visualization"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[400px] transition-transform duration-700 group-hover:scale-105"
                />
                {/* Enhanced overlay with color coordination */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-pink-900/20" />
                {/* Floating process indicators */}
                <div className="absolute top-4 right-4 bg-surface-secondary/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-text-primary">Strategy Session</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-surface-secondary/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-text-primary">Creative Process</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="info" size="lg" className="mb-3">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t("common.ourAchievements")}
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-3">{t("home.ambitiousGoals.title")}</h2>
            <p className="text-base text-text-secondary max-w-xl mx-auto">{t("home.ambitiousGoals.description")}</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                value: t("home.ambitiousGoals.stats.brandsNumber"),
                label: t("home.ambitiousGoals.stats.brandsLabel"),
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                value: t("home.ambitiousGoals.stats.solutionsNumber"),
                label: t("home.ambitiousGoals.stats.solutionsLabel"),
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: <Award className="w-6 h-6" />,
                value: t("home.ambitiousGoals.stats.awardsNumber"),
                label: t("home.ambitiousGoals.stats.awardsLabel"),
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                value: t("home.ambitiousGoals.stats.marketsNumber"),
                label: t("home.ambitiousGoals.stats.marketsLabel"),
                gradient: "from-orange-500 to-red-500",
              },
            ].map((stat, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <StatsCard icon={stat.icon} value={stat.value} label={stat.label} gradient={stat.gradient} />
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="success" size="lg" className="mb-3">
              <Star className="w-4 h-4 mr-2" />
              {t("common.testimonials")}
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-4">{t("common.whatOurClientsSay")}</h2>
            <p className="text-sm text-text-secondary max-w-2xl mx-auto">{t("common.trustedByForwardThinking")}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Your Message",
                author: "Your Name",
                role: "Your Role",
                rating: 5,
                avatar: "AV",
              },
              {
                quote:
                  "Your Message",
                author: "Your Name",
                role: "Your Role",
                rating: 5,
                avatar: "AV",
              },
              {
                quote:
                  "Your Message",
                author: "Your Name",
                role: "Your Role",
                rating: 5,
                avatar: "AV",
              },
              
            ].map((testimonial, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  rating={testimonial.rating}
                  avatar={testimonial.avatar}
                />
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Sign-Up Section */}
      {/* <NewsletterSignup /> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:60px_60px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Badge variant="glass" size="lg" className="mb-6 text-white border-white/30">
              <Rocket className="w-4 h-4 mr-2" />
              Ready to Start?
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">{t("home.getStartedToday.title")}</h2>
            <p className="text-sm text-blue-100 mb-6">{t("home.getStartedToday.description")}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="default" variant="glass" className="bg-white/20 !text-white hover:bg-white/30 border-white/30" asChild>
                <Link href={`/${locale}/contact`}>
                  {t("home.getStartedToday.contactUs")}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white !text-white hover:bg-white/10 bg-transparent hover:!text-white"
                asChild
              >
                <Link href={`/${locale}/services`}>{t("home.getStartedToday.exploreServices")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
