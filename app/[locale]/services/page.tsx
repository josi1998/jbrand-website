"use client"

import Image from "next/image"
import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Lightbulb,
  PenTool,
  Settings,
  CheckCircle,
  Trophy,
  Users,
  Handshake,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Target,
  Award,
  Clock,
  Shield,
  Rocket,
  Star,
  Play,
  ChevronRight,
  Heart,
  MessageSquare,
  Palette,
  Code,
  Headphones,
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
      className={`absolute ${particle.size} ${particle.color} rounded-full hidden lg:block pointer-events-none`}
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
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 hidden lg:block"
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

export default function ServicesPage() {
  const t = useTranslations("services")
  const locale = useLocale()
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  }

  const services = [
    {
      id: "brandIdentity",
      title: t("coreServices.items.brandIdentity.title") || "Brand Identity Design",
      description:
        t("coreServices.items.brandIdentity.description") ||
        "Complete brand identity packages including logo design, color palettes, and brand guidelines that make your business unforgettable.",
      image: "/images/services-brand-identity.jpg",
      icon: Palette,
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      href: `/${locale}/contact`,
      linkText: "Learn More",
    },
    {
      id: "webDevelopment",
      title: t("coreServices.items.webDevelopment.title") || "Web Development",
      description:
        t("coreServices.items.webDevelopment.description") ||
        "Custom websites and web applications built with modern technologies, optimized for performance and user experience.",
      image: "/images/web-app-development.jpeg",
      icon: Code,
      features: ["Responsive Design", "E-commerce Solutions", "Performance Optimization", "SEO Ready"],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      href: `/${locale}/contact`,
      linkText: "Learn More",
    },
    {
      id: "digitalMarketing",
      title: t("coreServices.items.digitalMarketing.title") || "Digital Marketing",
      description:
        t("coreServices.items.digitalMarketing.description") ||
        "Strategic digital marketing campaigns that drive traffic, engagement, and conversions across all digital channels.",
      image: "/images/digital-marketing.jpg",
      icon: TrendingUp,
      features: ["SEO Optimization", "Content Marketing", "Social Media", "Analytics & Reporting"],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      href: `/${locale}/contact`,
      linkText: "Learn More",
    },
    {
      id: "socialMedia",
      title: t("coreServices.items.socialMedia.title") || "Social Media Management",
      description:
        t("coreServices.items.socialMedia.description") ||
        "Comprehensive social media strategies that build communities, increase engagement, and drive meaningful connections.",
      image: "/images/social-media.jpeg",
      icon: Users,
      features: ["Content Creation", "Community Management", "Social Analytics", "Influencer Outreach"],
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
      href: `/${locale}/contact`,
      linkText: "Learn More",
    },
    {
      id: "videoProduction",
      title: t("coreServices.items.VideoProduction.title") || "Video Production",
      description:
        t("coreServices.items.VideoProduction.description") ||
        "Professional video content creation from concept to final production, including corporate videos, commercials, and animations.",
      image: "/images/video-photo-editing.jpg",
      icon: Play,
      features: ["Corporate Videos", "Product Demos", "Animation", "Post-Production"],
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-500/20 to-purple-500/20",
      href: `/${locale}/contact`,
      linkText: "Learn More",
    },
    {
      id: "musicPodcastMixing",
      title: t("coreServices.items.MusicPodcastMixing.title") || "Audio Production",
      description:
        t("coreServices.items.MusicPodcastMixing.description") ||
        "Professional audio mixing and mastering for music, podcasts, and multimedia content with studio-quality results.",
      image: "/images/music-podcast-mixing.jpg",
      icon: Headphones,
      features: ["Audio Mixing", "Mastering", "Podcast Editing", "Sound Design"],
      gradient: "from-teal-500 to-blue-500",
      bgGradient: "from-teal-500/20 to-blue-500/20",
      href: `/${locale}/contact`,
      linkText: "Learn More",
    },
  ]

  const processSteps = [
    {
      icon: Search,
      title: t("process.steps.discovery.title") || "Discovery & Research",
      description:
        t("process.steps.discovery.description") ||
        "We dive deep into your business, market, and audience to understand your unique challenges and opportunities.",
      color: "from-purple-500 to-pink-500",
      number: "01",
    },
    {
      icon: Lightbulb,
      title: t("process.steps.strategy.title") || "Strategy & Planning",
      description:
        t("process.steps.strategy.description") ||
        "We develop a comprehensive strategy that aligns with your goals and creates a roadmap for success.",
      color: "from-blue-500 to-cyan-500",
      number: "02",
    },
    {
      icon: PenTool,
      title: t("process.steps.design.title") || "Design & Development",
      description:
        t("process.steps.design.description") ||
        "Our creative team brings your vision to life with stunning designs and robust development.",
      color: "from-green-500 to-emerald-500",
      number: "03",
    },
    {
      icon: Settings,
      title: t("process.steps.implementation.title") || "Implementation & Testing",
      description:
        t("process.steps.implementation.description") ||
        "We implement solutions with rigorous testing to ensure everything works perfectly across all platforms.",
      color: "from-orange-500 to-red-500",
      number: "04",
    },
    {
      icon: CheckCircle,
      title: t("process.steps.launch.title") || "Launch & Optimization",
      description:
        t("process.steps.launch.description") ||
        "We launch your project and provide ongoing optimization to ensure continued success and growth.",
      color: "from-indigo-500 to-purple-500",
      number: "05",
    },
  ]

  const whyChooseUsItems = [
    {
      icon: Trophy,
      title: t("whyChooseUs.items.awardWinningTeam.title") || "Award-Winning Team",
      description:
        t("whyChooseUs.items.awardWinningTeam.description") ||
        "Our team has won numerous industry awards for excellence in design and innovation.",
      stats: "50+",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Users,
      title: t("whyChooseUs.items.clientCentricApproach.title") || "Client-Centric Approach",
      description:
        t("whyChooseUs.items.clientCentricApproach.description") ||
        "We put our clients first, ensuring every project exceeds expectations and delivers real value.",
      stats: "98% Satisfaction",
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      icon: Handshake,
      title: t("whyChooseUs.items.provenTrackRecord.title") || "Proven Track Record",
      description:
        t("whyChooseUs.items.provenTrackRecord.description") ||
        "With hundreds of successful projects, we have the experience to handle any challenge.",
      stats: "500+ Projects",
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-500/20 to-teal-500/20",
    },
    {
      icon: TrendingUp,
      title: t("whyChooseUs.items.measurableResults.title") || "Measurable Results",
      description:
        t("whyChooseUs.items.measurableResults.description") ||
        "We focus on delivering tangible results that drive growth and improve your bottom line.",
      stats: "300% ROI Avg",
      gradient: "from-pink-500 to-red-500",
      bgGradient: "from-pink-500/20 to-red-500/20",
    },
  ]

  return (
    <>
      <CursorSpotlight />

      {/* Enhanced Hero Section - Similar to Contact Page */}
      <section className="relative min-h-[35vh] md:min-h-[45vh] lg:min-h-[50vh] bg-gradient-to-br from-gray-900 via-blue-900/90 to-gray-800 py-12 md:py-20 overflow-hidden">
        {/* Enhanced Background Particles */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <Particle key={i} delay={i * 0.05} index={i} />
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

        <div className="container mx-auto px-4 max-w-7xl">
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
                <Badge className="mb-6 md:mb-8 bg-gradient-to-r from-blue-600/90 to-blue-400/90 text-white border-blue-400/30 hover:from-blue-700/90 hover:to-blue-500/90 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold tracking-wider shadow-lg whitespace-nowrap overflow-visible relative z-10">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  OUR SERVICES
                </Badge>
              </motion.div>
            </div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 md:mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {t("hero.title") || (
                <>
                  Comprehensive{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 animate-pulse">
                    Digital Solutions
                  </span>{" "}
                  for Modern Businesses
                </>
              )}
            </motion.h1>

            <motion.p
              className="text-base md:text-xl lg:text-2xl text-blue-200/90 mb-8 md:mb-12 leading-relaxed max-w-4xl px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t("hero.description") ||
                "From brand identity to digital marketing, we offer end-to-end solutions that transform your business and drive measurable growth through innovative strategies and cutting-edge technology."}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md sm:max-w-none justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                className="group h-12 md:h-14 px-6 md:px-10 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-sm md:text-base"
                onClick={() => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="outline"
                className="group h-12 md:h-14 px-6 md:px-10 border-2 border-white/30 !text-white hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm md:text-base bg-transparent hover:!text-white"
                asChild
              >
                <Link href={`/${locale}/contact`}>
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-white/20 w-full max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold text-purple-400">500+</div>
                <div className="text-xs md:text-sm text-white/80">Projects to complete</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold text-blue-400">98%</div>
                <div className="text-xs md:text-sm text-white/80">Client Satisfaction expected</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-bold text-green-400">500+</div>
                <div className="text-xs md:text-sm text-white/80">Positive Reviews expected</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Services Section */}
      <section
        id="services-section"
        className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 relative overflow-hidden"
      >
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-white/30 px-6 py-3 text-sm font-semibold">
              <Target className="w-4 h-4 mr-2 text-blue-600" />
              Core Services
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              {t("coreServices.title") || "What We Do Best"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive solutions to elevate your brand and drive business growth through innovative strategies and
              cutting-edge technology.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="h-full bg-white/20 backdrop-blur-sm dark:bg-gray-800/20 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden group">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/30">
                      <service.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <CardContent className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base lg:text-lg">
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold text-base lg:text-lg group/btn bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20"
                      asChild
                    >
                      <Link href={service.href}>
                        {service.linkText}
                        <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <motion.div
          className="absolute top-32 left-32 w-72 h-72 bg-gradient-to-br from-green-400/15 to-emerald-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-white/30 px-6 py-3 text-sm font-semibold">
              <Rocket className="w-4 h-4 mr-2 text-orange-500" />
              Our Process
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              {t("process.title") || "How We Work"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A proven methodology that delivers exceptional results every time through strategic planning and flawless
              execution.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Process Steps */}
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mr-6 group-hover:shadow-2xl transition-shadow duration-300 shadow-xl`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 backdrop-blur-sm dark:bg-gray-900/20 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white shadow-lg border border-white/30">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <FloatingElement delay={2} duration={12}>
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-200/60 to-pink-200/60 dark:from-purple-800/30 dark:to-pink-800/30 rounded-3xl -z-10"></div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-200/60 to-cyan-200/60 dark:from-blue-800/30 dark:to-cyan-800/30 rounded-3xl -z-10"></div>
                <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/our-process-about.jpeg"
                    alt={t("process.imageAlt") || "Our Process"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Floating Stats */}
                  <motion.div
                    className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">99%</div>
                      <div className="text-xs opacity-80">Success Rate</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-8 left-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
                  >
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-xs opacity-80">Support</div>
                    </div>
                  </motion.div>
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <motion.div
          className="absolute bottom-32 right-32 w-88 h-88 bg-gradient-to-br from-orange-400/15 to-red-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 24,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-white/30 px-6 py-3 text-sm font-semibold">
              <Award className="w-4 h-4 mr-2 text-yellow-500" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              {t("whyChooseUs.title") || "What Sets Us Apart"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              What sets us apart from the competition and makes us your ideal creative partner for long-term success.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {whyChooseUsItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group relative overflow-hidden h-full text-center bg-white/20 backdrop-blur-sm dark:bg-gray-800/20 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <CardHeader className="relative z-10 pb-4">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {item.description}
                    </CardDescription>

                    {/* Stats Badge */}
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold border-0">
                      <Star className="w-3 h-3 mr-1" />
                      {item.stats}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300">
              <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Quick turnaround times without compromising quality
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                100% satisfaction guarantee on all our services
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300">
              <Rocket className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold mb-2">Innovation First</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Cutting-edge solutions using latest technologies
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Enhanced floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-8 bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-3 text-sm font-semibold">
              <Heart className="w-4 h-4 mr-2 text-red-400" />
              Ready to Begin?
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              Let us discuss your project and create something amazing together. Our team is ready to bring your vision
              to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="h-16 px-12 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 text-lg font-semibold"
                asChild
              >
                <Link href={`/${locale}/contact`}>
                  Start Your Project
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-16 px-12 border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-lg font-semibold bg-transparent"
                asChild
              >
                <Link href={`/${locale}/contact`}>
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
