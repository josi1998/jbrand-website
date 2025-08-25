"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { FaCheck } from "react-icons/fa"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, FeatureCard, TestimonialCard, StatsCard } from "@/components/ui/card"
import NewsletterSignup from "@/components/NewsletterSignup"
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

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      console.log("Submitting home page form data:", {
        ...formData,
        message: formData.message.substring(0, 50) + "...",
      })

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          services: formData.services,
        }),
      })

      const result = await response.json()
      console.log("Home page form response:", result)

      if (response.ok && result.success) {
        setSubmitStatus("success")
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
        setSubmitStatus("error")
        console.error("Home page form error response:", result)
      }
    } catch (error) {
      console.error("Home page form submission error:", error)
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
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t("common.messageSent")}</h3>
              <p className="text-text-secondary mb-6">{t("common.weWillGetBackToYou")}</p>
              <Button onClick={() => setSubmitStatus("idle")} variant="glow">
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
      <section className="relative min-h-[85vh] pt-16 md:pt-20 lg:pt-0 bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:80px_80px]" />

          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
            animate={{
              y: [0, 15, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-500/8 rounded-full blur-2xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-full blur-3xl"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/15 to-blue-500/10 rounded-full blur-3xl"
            animate={{
              rotate: -360,
              scale: [1, 0.8, 1],
            }}
            transition={{
              rotate: { duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 },
            }}
          />

          {/* Subtle particle effect */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(85vh-4rem)] py-8">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:space-y-8"
            >
              

              {/* Badge - Hidden on small screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:block"
              >
                <Badge variant="shimmer" size="lg" className="mt-8 md:mt-12 mb-0 !text-white">
                  {t("home.heroSection.badgeText")}
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight pt-8 md:pt-12"
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
                className="text-xl sm:text-2xl lg:text-3xl font-medium text-blue-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t("home.hero.subtitle")}
              </motion.h2>

              <motion.p
                className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {t("home.hero.description")}
              </motion.p>

              {/* Buttons - Hidden on small screens */}
              <motion.div
                className="hidden lg:flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button
                  size="xl"
                  variant="glow"
                  className="px-8 shadow-lg hover:shadow-xl transition-all duration-300 retain-text-color !text-white"
                  asChild
                >
                  <Link href="/services">
                    {t("home.hero.exploreServices")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="glass"
                  className="border-white/20 !text-white hover:bg-white/10 bg-transparent backdrop-blur-sm retain-text-color"
                  asChild
                >
                  <Link href="/contact">
                    <Play className="mr-2 h-5 w-5" />
                    {t("home.hero.getCustomPlan")}
                  </Link>
                </Button>
              </motion.div>

              {/* Buttons - Visible on small screens */}
              <motion.div
                className="lg:hidden flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="glow" className="w-full shadow-lg retain-text-color !text-white hover:!text-white active:!text-white focus:!text-white">
                    {t("home.hero.getCustomPlan")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="glass"
                    className="w-full !text-white border-white/40 hover:bg-white/10 hover:border-white/60 bg-transparent backdrop-blur-sm retain-text-color hover:!text-white active:!text-white focus:!text-white"
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
            >
              <Card variant="glass" className="shadow-modern-2xl">
                <CardContent className="p-6 lg:p-8">
                  <div className="text-center mb-6 lg:mb-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                      {t("home.heroSection.consultationTitle")}
                    </h3>
                    <p className="text-text-secondary">{t("home.contactForm.subtitle")}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder={t("home.contactForm.fields.name")}
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-surface-primary border-border text-text-primary"
                        required
                      />
                      <Input
                        type="email"
                        placeholder={t("home.contactForm.fields.email")}
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-surface-primary border-border text-text-primary"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        type="tel"
                        placeholder={t("home.contactForm.fields.phone")}
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="bg-surface-primary border-border text-text-primary"
                        required
                      />
                      <Input
                        placeholder={t("home.contactForm.fields.company")}
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        className="bg-surface-primary border-border text-text-primary"
                      />
                    </div>
                    <Input
                      type="url"
                      placeholder={t("home.contactForm.fields.website")}
                      value={formData.website}
                      onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                      className="bg-surface-primary border-border text-text-primary"
                    />
                    <Textarea
                      placeholder={t("home.contactForm.fields.message")}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="min-h-[80px] lg:min-h-[100px] bg-surface-primary border-border text-text-primary"
                      required
                    />
                    <div>
                      <p className="font-medium mb-3 lg:mb-4 text-text-primary">
                        {t("home.contactForm.servicesTitle")}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      <p className="text-red-500 text-center text-sm font-medium">
                        {t("home.contactForm.errorMessage")}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section - Enhanced Design */}
      <section className="py-24 bg-surface-primary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_50%,transparent_75%)] bg-[length:60px_60px]" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Badge variant="brand" size="lg" className="mb-6">
                <Users className="w-4 h-4 mr-2" />
                {t("common.aboutUs")}
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-8">{t("common.whoWeAre")}</h2>
              <p className="text-xl text-text-secondary leading-relaxed mb-8">{t("common.atJBrandWeAre")}</p>
              <div className="grid grid-cols-2 gap-6">
                <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                  <Card variant="interactive" className="p-6 shadow-modern">
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2">
                      200+
                    </h3>
                    <p className="text-text-primary font-semibold">{t("common.successfulProjects")}</p>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                  <Card variant="interactive" className="p-6 shadow-modern">
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-2">
                      1+
                    </h3>
                    <p className="text-text-primary font-semibold">{t("common.yearsExperience")}</p>
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
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/who-we-are.jpeg"
                  alt="Our Team"
                  width={600}
                  height={700}
                  className="object-cover w-full h-[600px] transition-transform duration-700 group-hover:scale-105"
                />
                {/* Enhanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/20" />
                {/* Floating badge */}
                <div className="absolute top-6 left-6 bg-surface-secondary/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-text-primary">Team Collaboration</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="gradient" size="lg" className="mb-4">
              <Award className="w-4 h-4 mr-2" />
              {t("common.whyChooseUs")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">{t("home.whyChooseUs.title")}</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">{t("common.deliverExceptionalResults")}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lightbulb className="h-8 w-8" />,
                title: t("home.whyChooseUs.features.innovative.title"),
                description: t("home.whyChooseUs.features.innovative.description"),
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: t("home.whyChooseUs.features.experienced.title"),
                description: t("home.whyChooseUs.features.experienced.description"),
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
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
      <section className="py-24 bg-surface-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="purple" size="lg" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              {t("common.ourServices")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">{t("home.ourServices.title")}</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">{t("common.comprehensiveSolutions")}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-8 w-8" />,
                title: t("home.ourServices.items.brandIdentity.title"),
                description: t("home.ourServices.items.brandIdentity.description"),
                gradient: "from-purple-500 to-pink-500",
                href: `/${locale}/services`,
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: t("home.ourServices.items.webDevelopment.title"),
                description: t("home.ourServices.items.webDevelopment.description"),
                gradient: "from-blue-500 to-cyan-500",
                href: `/${locale}/services`,
              },
              {
                icon: <Rocket className="h-8 w-8" />,
                title: t("home.ourServices.items.digitalMarketing.title"),
                description: t("home.ourServices.items.digitalMarketing.description"),
                gradient: "from-green-500 to-emerald-500",
                href: `/${locale}/services`,
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: t("home.ourServices.items.socialMedia.title"),
                description: t("home.ourServices.items.socialMedia.description"),
                gradient: "from-orange-500 to-red-500",
                href: `/${locale}/services`,
              },
              {
                icon: <PenTool className="h-8 w-8" />,
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
      <section className="py-24 bg-surface-secondary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_25%,rgba(59,130,246,0.02)_50%,transparent_75%)] bg-[length:80px_80px]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="teal" size="lg" className="mb-4">
              <Settings className="w-4 h-4 mr-2" />
              {t("common.ourProcess")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">{t("home.ourProcess.title")}</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">{t("common.provenMethodology")}</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              {[
                {
                  icon: <Search className="w-6 h-6" />,
                  title: t("home.ourProcess.steps.discovery.title"),
                  description: t("home.ourProcess.steps.discovery.description"),
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Lightbulb className="w-6 h-6" />,
                  title: t("home.ourProcess.steps.strategy.title"),
                  description: t("home.ourProcess.steps.strategy.description"),
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: <PenTool className="w-6 h-6" />,
                  title: t("home.ourProcess.steps.design.title"),
                  description: t("home.ourProcess.steps.design.description"),
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: <Settings className="w-6 h-6" />,
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
                  className="flex items-start space-x-4 group relative"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-modern`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">{step.title}</h3>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                  {/* Connection line */}
                  {index < 3 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-border to-transparent" />
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
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/our-process.jpeg"
                  alt="Process Visualization"
                  width={700}
                  height={800}
                  className="object-cover w-full h-[700px] transition-transform duration-700 group-hover:scale-105"
                />
                {/* Enhanced overlay with color coordination */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-pink-900/20" />
                {/* Floating process indicators */}
                <div className="absolute top-6 right-6 bg-surface-secondary/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-text-primary">Strategy Session</span>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-surface-secondary/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-text-primary">Creative Process</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-surface-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="info" size="lg" className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t("common.ourAchievements")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">{t("home.ambitiousGoals.title")}</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">{t("home.ambitiousGoals.description")}</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                value: t("home.ambitiousGoals.stats.brandsNumber"),
                label: t("home.ambitiousGoals.stats.brandsLabel"),
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Briefcase className="w-8 h-8" />,
                value: t("home.ambitiousGoals.stats.solutionsNumber"),
                label: t("home.ambitiousGoals.stats.solutionsLabel"),
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: <Award className="w-8 h-8" />,
                value: t("home.ambitiousGoals.stats.awardsNumber"),
                label: t("home.ambitiousGoals.stats.awardsLabel"),
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: <Globe className="w-8 h-8" />,
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
      <section className="py-24 bg-surface-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="success" size="lg" className="mb-4">
              <Star className="w-4 h-4 mr-2" />
              {t("common.testimonials")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">{t("common.whatOurClientsSay")}</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">{t("common.trustedByForwardThinking")}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Your message",
                author: "Your Name",
                role: "Your Role",
                rating: 5,
                avatar: "A",
              },
              {
                quote:
                  "Your message",
                author: "Your Name",
                role: "Your Role",
                rating: 5,
                avatar: "A",
              },
              {
                quote:
                  "Your message",
                author: "Your Name",
                role: "Your Role",
                rating: 5,
                avatar: "A",
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
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Badge variant="glass" size="lg" className="mb-8 text-white border-white/30">
              <Rocket className="w-4 h-4 mr-2" />
              Ready to Start?
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t("home.getStartedToday.title")}</h2>
            <p className="text-xl text-blue-100 mb-8">{t("home.getStartedToday.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="outline" className="border-white !text-white hover:bg-white/10 bg-transparent" asChild>
                <Link href={`/${locale}/contact`}>
                  {t("home.getStartedToday.contactUs")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white !text-white hover:bg-white/10 bg-transparent"
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
