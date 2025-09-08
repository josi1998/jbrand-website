"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  Lightbulb,
  PenTool,
  Settings,
  CheckCircle,
  Flag,
  Rocket,
  Users,
  TrendingUp,
  Award,
  Globe,
  Sparkles,
  ArrowRight,
  Play,
  Target,
  Zap,
  Heart,
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

export default function AboutPage() {
  const t = useTranslations()
  const locale = useLocale()
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <>
      <CursorSpotlight />

      {/* Enhanced Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-blue-900/90 to-gray-800 overflow-hidden">
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
                <Badge className="mb-4 md:mb-5 bg-gradient-to-r from-blue-600/90 to-blue-400/90 text-white border-blue-400/30 hover:from-blue-700/90 hover:to-blue-500/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 text-xs font-semibold tracking-wider shadow-lg whitespace-nowrap overflow-visible relative z-10">
                  <Users className="w-3 h-3 mr-1.5" />
                  ABOUT JBRAND AGENCY
                </Badge>
              </motion.div>
            </div>

            <motion.h1
              className="text-xl lg:text-2xl font-bold text-white leading-tight mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {t("about.hero.title") || (
                <>
                  Crafting Digital{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 animate-pulse">
                    Excellence
                  </span>{" "}
                  Since 2019
                </>
              )}
            </motion.h1>

            <motion.p
              className="text-sm text-blue-200/90 mb-6 leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t("about.hero.description") ||
                "We are a passionate team of designers, developers, and strategists dedicated to transforming businesses through innovative branding and digital solutions that drive real results."}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="default" variant="glass" className="bg-white/20 !text-white hover:bg-white/30 border-white/30" asChild>
                <Link href={`/${locale}/contact`}>
                  Start Your Project
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Company Story Section */}
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
                <Heart className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
              <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-5">
                {t("about.story.title") || "Building Dreams Into Digital Reality"}
              </h2>
              <p className="text-base text-text-secondary leading-relaxed mb-6">
                {t("about.story.paragraph1") ||
                  "Founded in 2019 with a vision to bridge the gap between creative imagination and digital innovation, JBrand has grown from a small startup to a trusted partner for businesses worldwide. Our journey began with a simple belief: every brand has a unique story worth telling."}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                  <Card variant="interactive" className="p-3 shadow-modern">
                    <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-1.5">
                      200+
                    </h3>
                    <p className="text-text-primary font-medium text-xs">Projects to complete (vision)</p>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                  <Card variant="interactive" className="p-3 shadow-modern">
                    <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-1.5">
                      1+
                    </h3>
                    <p className="text-text-primary font-medium text-xs">Years Experience</p>
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
                  src="/images/building-dreams-into-digital-reality.jpg"
                  alt="Our Team at Work"
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

      {/* Enhanced Services Overview Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <motion.div
          className="absolute top-32 right-32 w-72 h-72 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-white/30 px-6 py-3 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
              Our Expertise
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold mb-5 text-gray-900 dark:text-white leading-tight">
              {t("about.services.title") || "Comprehensive Digital Solutions"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From brand identity to digital experiences, we offer end-to-end solutions that transform your business and
              drive growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: t("about.services.items.brandIdentity.title") || "Brand Identity Design",
                description:
                  t("about.services.items.brandIdentity.description") ||
                  "Complete brand identity packages including logo design, color palettes, and brand guidelines.",
                image: "/images/services-brand-identity.jpg",
                gradient: "from-purple-500 to-pink-500",
                icon: <Award className="w-6 h-6" />,
              },
              {
                title: t("about.services.items.webDevelopment.title") || "Web Development",
                description:
                  t("about.services.items.webDevelopment.description") ||
                  "Custom websites and web applications built with modern technologies and best practices.",
                image: "/images/web-app-development.jpeg",
                gradient: "from-blue-500 to-cyan-500",
                icon: <Globe className="w-6 h-6" />,
              },
              {
                title: t("about.services.items.digitalMarketing.title") || "Digital Marketing",
                description:
                  t("about.services.items.digitalMarketing.description") ||
                  "Strategic digital marketing campaigns that drive traffic, engagement, and conversions.",
                image: "/images/digital-marketing.jpg",
                gradient: "from-green-500 to-emerald-500",
                icon: <TrendingUp className="w-6 h-6" />,
              },
              {
                title: t("about.services.items.socialMedia.title") || "Social Media Management",
                description:
                  t("about.services.items.socialMedia.description") ||
                  "Comprehensive social media strategies that build communities and drive engagement.",
                image: "/images/social-media.jpeg",
                gradient: "from-orange-500 to-red-500",
                icon: <Users className="w-6 h-6" />,
              },
              {
                title: t("about.services.items.VideoProduction.title") || "Video Production",
                description:
                  t("about.services.items.VideoProduction.description") ||
                  "Professional video content creation from concept to final production.",
                image: "/images/video-photo-editing.jpg",
                gradient: "from-indigo-500 to-purple-500",
                icon: <Play className="w-6 h-6" />,
              },
              {
                title: t("about.services.items.MusicPodcastMixing.title") || "Audio Production",
                description:
                  t("about.services.items.MusicPodcastMixing.description") ||
                  "Professional audio mixing and mastering for music, podcasts, and multimedia content.",
                image: "/images/music-podcast-mixing.jpg",
                gradient: "from-cyan-500 to-blue-500",
                icon: <Zap className="w-6 h-6" />,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
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
                      {service.icon}
                    </div>
                  </div>
                  <CardContent className="p-4 lg:p-5">
                    <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-xs">
                      {service.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold text-base group/btn bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20"
                      asChild
                    >
                      <Link href={`/${locale}/contact`}>
                        Learn More{" "}
                        <ArrowRight className="ml-2 h-3 w-3 lg:h-4 lg:w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Goals and Journey Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-white/30 px-6 py-3 text-sm font-semibold">
              <Target className="w-4 h-4 mr-2 text-blue-600" />
              Our Journey
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold mb-5 text-gray-900 dark:text-white leading-tight">
              {t("about.ourGoals.title") || "Milestones & Future Vision"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our roadmap to success and ambitious goals for the future of digital innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-6xl mx-auto">
            {/* Achievement Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full bg-white/20 backdrop-blur-sm dark:bg-gray-900/20 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-4 shadow-lg">
                      <Flag className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-base font-bold">
                      {t("about.ourGoals.achievementTimeline.title") || "Achievement Timeline"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      year: "2024",
                      achievement:
                        t("about.ourGoals.achievementTimeline.2024") ||
                        "Expanded to serve 200+ clients globally with 95% satisfaction rate",
                    },
                    {
                      year: "2025",
                      achievement:
                        t("about.ourGoals.achievementTimeline.2025") ||
                        "Launch AI-powered design tools and expand team to 50+ professionals",
                    },
                    {
                      year: "2026",
                      achievement:
                        t("about.ourGoals.achievementTimeline.2026") ||
                        "Open international offices and achieve $10M annual revenue",
                    },
                    {
                      year: "2027",
                      achievement:
                        t("about.ourGoals.achievementTimeline.2027") ||
                        "Become the leading digital agency in emerging markets",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/10 backdrop-blur-sm dark:hover:bg-gray-800/20 transition-colors duration-200 border border-white/10"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md text-sm">
                        {item.year.slice(-2)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{item.year}</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs">
                          {item.achievement}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Future Roadmap */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full bg-white/20 backdrop-blur-sm dark:bg-gray-900/20 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-4 shadow-lg">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {t("about.ourGoals.futureRoadmap.title") || "Future Roadmap"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      year: "2028",
                      goal:
                        t("about.ourGoals.futureRoadmap.2028") ||
                        "Pioneer sustainable design practices and carbon-neutral operations",
                    },
                    {
                      year: "2029",
                      goal:
                        t("about.ourGoals.futureRoadmap.2029") ||
                        "Launch JBrand Academy for next-generation designers and developers",
                    },
                    {
                      year: "2030",
                      goal:
                        t("about.ourGoals.futureRoadmap.2030") ||
                        "Establish innovation labs in 5 major cities worldwide",
                    },
                    {
                      year: "2031",
                      goal:
                        t("about.ourGoals.futureRoadmap.2031") ||
                        "Achieve industry leadership in AI-driven creative solutions",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/10 backdrop-blur-sm dark:hover:bg-gray-800/20 transition-colors duration-200 border border-white/10"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md text-sm">
                        {item.year.slice(-2)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{item.year}</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs">
                          {item.goal}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Enhanced Process Section */}
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
              Our Process
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-3">{t("about.process.title") || "How We Create Magic"}</h2>
            <p className="text-base text-text-secondary max-w-xl mx-auto">
              A proven methodology that delivers exceptional results through strategic planning and flawless execution.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              {[
                {
                  icon: <Search className="w-5 h-5" />,
                  title: t("about.process.steps.discovery.title") || "Discovery & Research",
                  description:
                    t("about.process.steps.discovery.description") ||
                    "We dive deep into your business, market, and audience to understand your unique challenges and opportunities.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Lightbulb className="w-5 h-5" />,
                  title: t("about.process.steps.strategy.title") || "Strategy & Planning",
                  description:
                    t("about.process.steps.strategy.description") ||
                    "We develop a comprehensive strategy that aligns with your goals and creates a roadmap for success.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: <PenTool className="w-5 h-5" />,
                  title: t("about.process.steps.design.title") || "Design & Development",
                  description:
                    t("about.process.steps.design.description") ||
                    "Our creative team brings your vision to life with stunning designs and robust development.",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: <Settings className="w-5 h-5" />,
                  title: t("about.process.steps.implementation.title") || "Implementation & Testing",
                  description:
                    t("about.process.steps.implementation.description") ||
                    "We implement solutions with rigorous testing to ensure everything works perfectly across all platforms.",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: <CheckCircle className="w-5 h-5" />,
                  title: t("about.process.steps.launch.title") || "Launch & Optimization",
                  description:
                    t("about.process.steps.launch.description") ||
                    "We launch your project and provide ongoing optimization to ensure continued success and growth.",
                  gradient: "from-indigo-500 to-purple-500",
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
                  {index < 4 && (
                    <div className="absolute left-5 top-12 w-0.5 h-12 bg-gradient-to-b from-border to-transparent" />
                  )}
                </motion.div>
              ))
            }
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
                  src="/images/our-process-about.jpeg"
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
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Let us create something amazing together</h2>
            <p className="text-sm text-blue-100 mb-6">Ready to transform your business with innovative design and strategic thinking? Let us discuss your project and bring your vision to life.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="default" variant="glass" className="bg-white/20 !text-white hover:bg-white/30 border-white/30" asChild>
                <Link href={`/${locale}/contact`}>
                  Start Your Project
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white !text-white hover:bg-white/10 bg-transparent hover:!text-white"
                asChild
              >
                <Link href={`/${locale}/services`}>View Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
