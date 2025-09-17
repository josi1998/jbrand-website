"use client"
import type React from "react"
import { useState, useEffect, type ReactNode } from "react"
import { useTranslations, useLocale } from "next-intl"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ArrowRight,
  Globe,
  Calendar,
  Zap,
  Star,
  Heart,
  Target,
} from "lucide-react"

// Enhanced Particle component for background effects
const Particle = ({ delay = 0, index = 0 }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const particleTypes = [
    { size: "w-1 h-1", color: "bg-blue-400/20" },
    { size: "w-0.5 h-0.5", color: "bg-cyan-300/30" },
    { size: "w-1.5 h-1.5", color: "bg-indigo-400/15" },
  ]

  const particle = particleTypes[index % particleTypes.length]
  if (!particle) return null

  return (
    <motion.div
      className={`absolute ${particle.size} ${particle.color} rounded-full hidden md:block`}
      initial={{
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
        opacity: 0,
      }}
      animate={{
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 20 + 20,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "linear",
      }}
    />
  )
}

// Enhanced Spotlight component
const CursorSpotlight = () => {
  const [mounted, setMounted] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 30, stiffness: 800 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setMounted(true)
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", moveCursor)
      return () => {
        window.removeEventListener("mousemove", moveCursor)
      }
    }
    
    // Always return a cleanup function
    return () => {}
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${cursorXSpring}px ${cursorYSpring}px, rgba(59, 130, 246, 0.08), transparent 70%)`,
      }}
    />
  )
}

// Floating elements for enhanced visual appeal
const FloatingElement = ({
  children,
  delay = 0,
  duration = 6,
}: {
  children: ReactNode
  delay?: number
  duration?: number
}) => {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
  file: File | null
}

export default function ContactPage() {
  const t = useTranslations()
  const locale = useLocale()
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    file: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const input = e.target as HTMLInputElement
      setFormData((prev) => ({
        ...prev,
        [name]: input.files && input.files[0] ? input.files[0] : null,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Comprehensive form validation
    const requiredFields = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      service: formData.service,
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

    try {
      // Prepare clean form data
      const cleanFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || "",
        company: formData.company.trim() || "",
        service: formData.service,
        budget: formData.budget || "",
        timeline: formData.timeline || "",
        message: formData.message.trim(),
        source: "contact_page",
        locale: locale || "en"
      }

      console.log("Submitting contact page form data:", {
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

      console.log("Parsed contact page form response:", result)

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
          service: "",
          budget: "",
          timeline: "",
          message: "",
          file: null,
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
      console.error("Contact page form submission error:", {
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

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="w-full max-w-lg mx-4 border-0 shadow-2xl bg-white/90 backdrop-blur-xl dark:bg-gray-900/90">
            <CardContent className="pt-12 pb-12 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
              >
                <CheckCircle2 className="h-10 w-10 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                {t("common.messageSent") || "Message Sent Successfully!"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm max-w-md">
                {t("contact.successMessage") || "Thank you for reaching out! We'll get back to you within 24 hours."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={() => setSubmitStatus("idle")}
                  size="default"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
                >
                  {t("contact.sendAnotherMessage") || "Send Another Message"}
                </Button>
                <Button 
                  size="default"
                  variant="outline" 
                  onClick={() => (window.location.href = `/${locale}/`)} 
                  className="flex-1 font-medium"
                >
                  {t("contact.backToHome") || "Back to Home"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <CursorSpotlight />

      {/* Enhanced Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-blue-900/90 to-gray-800 overflow-hidden">
        {/* Enhanced Background Particles */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <Particle key={i} delay={i * 0.05} />
          ))}
        </div>

        {/* Enhanced Decorative Elements */}
        <motion.div
          className="absolute -top-32 -right-32 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-cyan-400/15 to-blue-600/15 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Grid Background */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px]"
          style={{ y: backgroundY }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center text-center w-full max-w-5xl mx-auto pt-4 md:pt-0"
          >
            <div className="w-full px-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block"
              >
                <Badge
                  variant="gradient"
                  className="mb-6 md:mb-8 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold tracking-wider shadow-lg whitespace-nowrap overflow-visible relative z-10"
                >
                  <MessageSquare className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  GET IN TOUCH
                </Badge>
              </motion.div>
            </div>

            <motion.h1
              className="text-xl lg:text-2xl font-bold text-white leading-tight mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {t("contact.hero.title") || (
                <>
                  Let us Create Something{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 animate-pulse">
                    Amazing
                  </span>{" "}
                  Together
                </>
              )}
            </motion.h1>

            <motion.p
              className="text-sm text-blue-200/90 mb-6 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t("contact.hero.description") ||
                "Ready to transform your business with innovative design and strategic thinking? Let's discuss your project and bring your vision to life with our expert team."}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                size="default"
                variant="glass"
                className="bg-white/20 !text-white hover:bg-white/30 border-white/30"
                onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("contact.startYourProject") || "Start Your Project"}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button
                size="default"
                variant="outline"
                className="border-white !text-white hover:bg-white/10 bg-transparent hover:!text-white"
                onClick={() => document.getElementById("contact-info")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Phone className="mr-1.5 h-4 w-4" />
                {t("contact.contactInfo") || "Contact Info"}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section
        id="contact-form"
        className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Enhanced Contact Info Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div>
                <Badge variant="secondary" className="mb-4 px-3 py-1.5 text-xs font-semibold">
                  <Heart className="w-3 h-3 mr-1.5" />
                  {t("contact.form.getInTouch") || "Get In Touch"}
                </Badge>
                <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                  {t("contact.form.title") || "Ready to Start Your Project?"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("contact.hero.description") ||
                    "We're here to help bring your vision to life. Whether you need branding, web development, or digital marketing, our team is ready to create something extraordinary together."}
                </p>
              </div>

              <div className="space-y-4" id="contact-info">
                {[
                  {
                    icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
                    title: t("contact.info.address.title") || "Our Office",
                    value:
                      t("contact.info.address.value") || "123 Creative Street, Design District, New York, NY 10001",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />,
                    title: t("contact.info.phone.title") || "Phone Number",
                    value: t("contact.info.phone.value") || "+1 (555) 123-4567",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />,
                    title: t("contact.info.email.title") || "Email Address",
                    value: t("contact.info.email.value") || "hello@jbrand.agency",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
                    title: t("contact.info.hours.title") || "Business Hours",
                    value: t("contact.info.hours.value") || "Mon - Fri: 9:00 AM - 6:00 PM EST",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 md:gap-6 group"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">24h</h3>
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-xs">Response Time</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">
                    100%
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-xs">
                    Satisfaction Rate
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Contact Form Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <FloatingElement delay={1} duration={8}>
                <Card className="bg-white/95 dark:bg-gray-900/95 border-0 shadow-2xl backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-2 shadow-lg">
                        <Send className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold">
                          {t("contact.form.sendUsMessage") || "Send Us a Message"}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Fill out the form below and we will get back to you within 24 hours.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      {/* Name/Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-xs font-medium flex items-center">
                            {t("contact.form.fields.name.label") || "Full Name *"}
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("contact.form.fields.name.placeholder") || "John Doe"}
                            className={`h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all duration-300 text-sm placeholder:text-xs ${
                              !formData.name.trim() && submitStatus === "error" ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                            }`}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-xs font-medium flex items-center">
                            {t("contact.form.fields.email.label") || "Email Address *"}
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t("contact.form.fields.email.placeholder") || "john@company.com"}
                            className={`h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all duration-300 text-sm placeholder:text-xs ${
                              !formData.email.trim() && submitStatus === "error" ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                            }`}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone/Company Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-xs font-medium">
                            {t("contact.form.fields.phone.label") || "Phone Number"}
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t("contact.form.fields.phone.placeholder") || "+1 (555) 123-4567"}
                            className="h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all duration-300 text-sm placeholder:text-xs"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="company" className="text-xs font-medium">
                            {t("contact.form.fields.company.label") || "Company Name"}
                          </Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder={t("contact.form.fields.company.placeholder") || "Your Company"}
                            className="h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all duration-300 text-sm placeholder:text-xs"
                          />
                        </div>
                      </div>

                      {/* Service/Budget Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="service" className="text-xs font-medium flex items-center">
                            {t("contact.form.fields.service.label") || "Service Needed *"}
                          </Label>
                          <Select value={formData.service} onValueChange={handleSelectChange("service")} required>
                            <SelectTrigger className={`h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-sm placeholder:text-xs ${
                              !formData.service && submitStatus === "error" ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                            }`}>
                              <SelectValue
                                placeholder={t("contact.form.fields.service.placeholder") || "Select a service..."}
                                className="text-sm placeholder:text-xs"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="brandIdentity">
                                {t("contact.form.fields.service.options.brandIdentity") || "Brand Identity Design"}
                              </SelectItem>
                              <SelectItem value="webDevelopment">
                                {t("contact.form.fields.service.options.webDevelopment") || "Web Development"}
                              </SelectItem>
                              <SelectItem value="digitalMarketing">
                                {t("contact.form.fields.service.options.digitalMarketing") || "Digital Marketing"}
                              </SelectItem>
                              <SelectItem value="socialMedia">
                                {t("contact.form.fields.service.options.socialMedia") || "Social Media Management"}
                              </SelectItem>
                              <SelectItem value="videoProduction">Video Production</SelectItem>
                              <SelectItem value="audioProduction">Audio Production</SelectItem>
                              <SelectItem value="other">
                                {t("contact.form.fields.service.options.other") || "Other"}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="budget" className="text-xs font-medium">
                            Project Budget
                          </Label>
                          <Select value={formData.budget} onValueChange={handleSelectChange("budget")}>
                            <SelectTrigger className="h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-sm placeholder:text-xs">
                              <SelectValue placeholder="Select budget range..." className="text-sm placeholder:text-xs" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-5k">Under $5,000</SelectItem>
                              <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                              <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                              <SelectItem value="over-100k">Over $100,000</SelectItem>
                              <SelectItem value="discuss">Let us discuss</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-1.5">
                        <Label htmlFor="timeline" className="text-xs font-medium">
                          Project Timeline
                        </Label>
                        <Select value={formData.timeline} onValueChange={handleSelectChange("timeline")}>
                          <SelectTrigger className="h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-sm placeholder:text-xs">
                            <SelectValue placeholder="When do you need this completed?" className="text-sm placeholder:text-xs" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-month">Within 1 month</SelectItem>
                            <SelectItem value="2-3-months">2-3 months</SelectItem>
                            <SelectItem value="3-6-months">3-6 months</SelectItem>
                            <SelectItem value="6-months-plus">6+ months</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-xs font-medium flex items-center justify-between">
                          <span className="flex items-center">
                            {t("contact.form.fields.message.label") || "Project Details *"}
                          </span>
                          <span className={`text-xs ${
                            formData.message.length < 10 
                              ? "text-red-500" 
                              : formData.message.length > 1800 
                                ? "text-orange-500" 
                                : "text-gray-500"
                          }`}>
                            {formData.message.length}/2000
                          </span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={
                            t("contact.form.fields.message.placeholder") ||
                            "Tell us about your project, goals, and any specific requirements... (minimum 10 characters)"
                          }
                          rows={4}
                          className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all duration-300 text-sm placeholder:text-xs ${
                            (!formData.message.trim() || formData.message.length < 10) && submitStatus === "error" 
                              ? "border-red-500 bg-red-50 dark:bg-red-900/10" 
                              : ""
                          }`}
                          required
                        />
                        {formData.message.length > 0 && formData.message.length < 10 && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <span className="mr-1">⚠️</span>
                            Message must be at least 10 characters long ({10 - formData.message.length} more needed)
                          </p>
                        )}
                        {formData.message.length >= 1800 && formData.message.length < 2000 && (
                          <p className="text-orange-500 text-xs mt-1 flex items-center">
                            <span className="mr-1">⚠️</span>
                            Approaching character limit ({2000 - formData.message.length} characters remaining)
                          </p>
                        )}
                        {formData.message.length >= 2000 && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <span className="mr-1">❌</span>
                            Message exceeds maximum length. Please shorten your message.
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="default"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t("common.sending") || "Sending..."}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            {t("contact.form.submit") || "Send Message"}
                          </div>
                        )}
                      </Button>

                      {/* Enhanced Status Messages */}
                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium space-y-2"
                        >
                          <div className="font-semibold flex items-center">
                            <span className="mr-2">⚠️</span>
                            Submission Failed
                          </div>
                          <div>
                            {t("contact.form.error") || "Please check that all required fields are filled correctly and try again."}
                          </div>
                          <div className="text-xs opacity-90 mt-2 space-y-1">
                            <div className="font-semibold mb-1">Requirements checklist:</div>
                            <div className={`flex items-center ${formData.name.trim() ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              <span className="mr-2">{formData.name.trim() ? '✓' : '❌'}</span>
                              Name is required
                            </div>
                            <div className={`flex items-center ${formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              <span className="mr-2">{formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '✓' : '❌'}</span>
                              Valid email address is required
                            </div>
                            <div className={`flex items-center ${formData.service ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              <span className="mr-2">{formData.service ? '✓' : '❌'}</span>
                              Service selection is required
                            </div>
                            <div className={`flex items-center ${formData.message.trim().length >= 10 && formData.message.trim().length <= 2000 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              <span className="mr-2">{formData.message.trim().length >= 10 && formData.message.trim().length <= 2000 ? '✓' : '❌'}</span>
                              Message must be 10-2000 characters (currently: {formData.message.length})
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-semibold">
              <Globe className="w-4 h-4 mr-2" />
              Visit Us
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
              Find Our Location
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get in touch through any of the contact methods below. We are always excited to meet new clients and
              discuss exciting projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden shadow-2xl border-0">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 min-h-[400px] md:min-h-[500px] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3377.933822541347!2d119.3977744523872!3d32.152084448661746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b5d34690f6fd5b%3A0x18737ffdc2360523!2sZhen%20Jiang%20Nan%20Hu%20Tong%2C%20Run%20Zhou%20Qu%2C%20Zhen%20Jiang%20Shi%2C%20Jiang%20Su%20Sheng%2C%20China%2C%20212021!5e0!3m2!1sen!2sca!4v1758147406553!5m2!1sen!2sca"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      minHeight: "400px",
                      filter: "grayscale(20%) contrast(1.1) opacity(0.9)",
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 shadow-lg">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs md:text-sm font-semibold text-gray-900">We are Here!</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-gray-900 p-4 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-2 shadow-lg">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {t("contact.info.title") || "Contact Information"}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" />,
                        title: t("contact.info.address.title") || "Address",
                        value:
                          t("contact.info.address.value") || "123 Creative Street, Design District, New York, NY 10001",
                        color: "text-blue-600 dark:text-blue-400",
                      },
                      {
                        icon: <Phone className="w-4 h-4 md:w-5 md:h-5" />,
                        title: t("contact.info.phone.title") || "Phone",
                        value: t("contact.info.phone.value") || "+1 (555) 123-4567",
                        color: "text-green-600 dark:text-green-400",
                      },
                      {
                        icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />,
                        title: t("contact.info.email.title") || "Email",
                        value: t("contact.info.email.value") || "hello@jbrand.agency",
                        color: "text-purple-600 dark:text-purple-400",
                      },
                      {
                        icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />,
                        title: t("contact.info.hours.title") || "Hours",
                        value: t("contact.info.hours.value") || "Mon - Fri: 9:00 AM - 6:00 PM EST",
                        color: "text-orange-600 dark:text-orange-400",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-2"
                      >
                        <div className={`${item.color} mt-0.5`}>{item.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-0.5 text-sm">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {/* Quick Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button
                        variant="glass"
                        size="sm"
                        className="flex items-center justify-center space-x-1.5 h-9 text-xs"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Schedule Call</span>
                      </Button>
                      <Button
                        variant="glass"
                        size="sm"
                        className="flex items-center justify-center space-x-1.5 h-9 text-xs"
                      >
                        <Target className="w-3 h-3" />
                        <span>Get Directions</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
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
            <Badge
              variant="glass"
              className="mb-6 text-white border-white/30 px-4 py-2 text-sm font-semibold"
            >
              <Star className="w-4 h-4 mr-2" />
              Ready to Begin?
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">
              Your Success Story Starts Here
            </h2>
            <p className="text-sm text-blue-100 mb-6">
              Join hundreds of satisfied clients who have transformed their businesses with our innovative solutions.
              Let us create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="default"
                variant="glass"
                className="bg-white/20 !text-white hover:bg-white/30 border-white/30"
                onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start Your Project Now
                <Zap className="ml-1.5 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white !text-white hover:bg-white/10 bg-transparent hover:!text-white"
              >
                {/* Call Us Now option could go here */}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
