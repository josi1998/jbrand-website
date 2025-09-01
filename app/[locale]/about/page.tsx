"use client"

import Image from "next/image"
import { useState, useEffect, type ReactNode } from "react"
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
  CheckCircle2,
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
  Star,
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

export default function AboutPage() {
  const t = useTranslations()
  const locale = useLocale()
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

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
                  <Users className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  ABOUT JBRAND AGENCY
                </Badge>
              </motion.div>
            </div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 md:mb-8"
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
              className="text-base md:text-xl lg:text-2xl text-blue-200/90 mb-8 md:mb-12 leading-relaxed max-w-4xl px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t("about.hero.description") ||
                "We are a passionate team of designers, developers, and strategists dedicated to transforming businesses through innovative branding and digital solutions that drive real results."}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md sm:max-w-none justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                asChild
                className="group h-12 md:h-14 px-6 md:px-10 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 !text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-sm md:text-base hover:!text-white"
              >
                <Link href={`/${locale}/contact`}>
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              {/* <Button
                variant="outline"
                className="group h-12 md:h-14 px-6 md:px-10 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm md:text-base bg-transparent"
              >
                <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Watch Our Story
              </Button> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Company Story Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 relative overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-cyan-400/15 to-indigo-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-white/30 px-4 py-2 text-sm font-semibold">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Our Story
              </Badge>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
                {t("about.story.title") || "Building Dreams Into Digital Reality"}
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  {t("about.story.paragraph1") ||
                    "Founded in 2019 with a vision to bridge the gap between creative imagination and digital innovation, JBrand has grown from a small startup to a trusted partner for businesses worldwide. Our journey began with a simple belief: every brand has a unique story worth telling."}
                </p>
                <p>
                  {t("about.story.paragraph2") ||
                    "Today, we've helped over 200+ businesses transform their digital presence, from startups finding their voice to established companies reinventing themselves for the digital age. Our multidisciplinary team combines strategic thinking with creative execution to deliver solutions that not only look beautiful but drive measurable business results."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 lg:gap-8 mt-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur-sm dark:bg-blue-900/20 p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
                >
                  <h3 className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">200+</h3>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Projects to complete (vision)</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur-sm dark:bg-green-900/20 p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
                >
                  <h3 className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-3">1+</h3>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Years Experience</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <FloatingElement delay={1} duration={10}>
                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-200/60 to-indigo-200/60 dark:from-blue-800/30 dark:to-indigo-800/30 rounded-3xl -z-10"></div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-200/60 to-pink-200/60 dark:from-purple-800/30 dark:to-pink-800/30 rounded-3xl -z-10"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/building-dreams-into-digital-reality.jpg"
                    alt="Our Team at Work"
                    width={700}
                    height={600}
                    className="object-cover w-full h-[400px] sm:h-[500px] lg:h-[600px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Overview Section */}
      <section className="py-24 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
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

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-white/30 px-6 py-3 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
              Our Expertise
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              {t("about.services.title") || "Comprehensive Digital Solutions"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From brand identity to digital experiences, we offer end-to-end solutions that transform your business and
              drive growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                  <CardContent className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base lg:text-lg">
                      {service.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold text-base lg:text-lg group/btn bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20"
                    >
                      Learn More{" "}
                      <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Goals and Journey Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
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

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-white/30 px-6 py-3 text-sm font-semibold">
              <Target className="w-4 h-4 mr-2 text-blue-600" />
              Our Journey
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              {t("about.ourGoals.title") || "Milestones & Future Vision"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our roadmap to success and ambitious goals for the future of digital innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Achievement Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full bg-white/20 backdrop-blur-sm dark:bg-gray-900/20 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-4 lg:mr-6 shadow-lg">
                      <Flag className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl lg:text-2xl font-bold">
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
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md text-sm lg:text-base">
                        {item.year.slice(-2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.year}</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
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
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-4 lg:mr-6 shadow-lg">
                      <Rocket className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl lg:text-2xl font-bold">
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
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md text-sm lg:text-base">
                        {item.year.slice(-2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.year}</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
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
      <section className="py-24 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <motion.div
          className="absolute bottom-32 left-32 w-96 h-96 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, 70, 0],
            y: [0, -60, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <Badge className="mb-8 bg-white/20 backdrop-blur-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-white/30 px-6 py-3 text-sm font-semibold">
              <Settings className="w-4 h-4 mr-2 text-gray-600" />
              Our Process
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              {t("about.process.title") || "How We Create Magic"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A proven methodology that delivers exceptional results through strategic planning and flawless execution.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 lg:space-y-10">
              {[
                {
                  icon: <Search className="w-6 h-6 lg:w-7 lg:h-7" />,
                  title: t("about.process.steps.discovery.title") || "Discovery & Research",
                  description:
                    t("about.process.steps.discovery.description") ||
                    "We dive deep into your business, market, and audience to understand your unique challenges and opportunities.",
                  color: "from-blue-500 to-cyan-500",
                  number: "01",
                },
                {
                  icon: <Lightbulb className="w-6 h-6 lg:w-7 lg:h-7" />,
                  title: t("about.process.steps.strategy.title") || "Strategy & Planning",
                  description:
                    t("about.process.steps.strategy.description") ||
                    "We develop a comprehensive strategy that aligns with your goals and creates a roadmap for success.",
                  color: "from-purple-500 to-pink-500",
                  number: "02",
                },
                {
                  icon: <PenTool className="w-6 h-6 lg:w-7 lg:h-7" />,
                  title: t("about.process.steps.design.title") || "Design & Development",
                  description:
                    t("about.process.steps.design.description") ||
                    "Our creative team brings your vision to life with stunning designs and robust development.",
                  color: "from-green-500 to-emerald-500",
                  number: "03",
                },
                {
                  icon: <Settings className="w-6 h-6 lg:w-7 lg:h-7" />,
                  title: t("about.process.steps.implementation.title") || "Implementation & Testing",
                  description:
                    t("about.process.steps.implementation.description") ||
                    "We implement solutions with rigorous testing to ensure everything works perfectly across all platforms.",
                  color: "from-orange-500 to-red-500",
                  number: "04",
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6 lg:w-7 lg:h-7" />,
                  title: t("about.process.steps.launch.title") || "Launch & Optimization",
                  description:
                    t("about.process.steps.launch.description") ||
                    "We launch your project and provide ongoing optimization to ensure continued success and growth.",
                  color: "from-indigo-500 to-purple-500",
                  number: "05",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 lg:space-x-6 group"
                >
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-xl flex-shrink-0 group-hover:shadow-2xl transition-shadow duration-300`}
                    >
                      {step.icon}
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 lg:w-8 lg:h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold text-gray-900 dark:text-white shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base lg:text-lg">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <FloatingElement delay={2} duration={12}>
                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-200/60 to-indigo-200/60 dark:from-blue-800/30 dark:to-indigo-800/30 rounded-3xl -z-10"></div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-200/60 to-pink-200/60 dark:from-purple-800/30 dark:to-pink-800/30 rounded-3xl -z-10"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/our-process-about.jpeg"
                    alt="Process Visualization"
                    width={600}
                    height={700}
                    className="object-cover w-full h-[500px] lg:h-[700px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {/* Process overlay indicators */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-center text-white">
                      <div className="text-3xl lg:text-4xl font-bold mb-2">5</div>
                      <div className="text-base lg:text-lg font-semibold">Step Process</div>
                      <div className="text-sm opacity-90">Proven & Effective</div>
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Enhanced floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-48 h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full blur-3xl hidden lg:block"
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
          className="absolute bottom-20 right-20 w-48 h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full blur-3xl hidden lg:block"
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <Badge className="mb-8 bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-3 text-sm font-semibold">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Ready to Start?
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Let us create something amazing together
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
              Ready to transform your business with innovative design and strategic thinking? Let us discuss your project
              and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="h-14 lg:h-16 px-10 lg:px-12 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 text-base lg:text-lg font-semibold"
              >
                <Link href={`/${locale}/contact`}>
                  Start Your Project
                  <ArrowRight className="ml-2 lg:ml-3 h-5 w-5 lg:h-6 lg:w-6" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 lg:h-16 px-10 lg:px-12 border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-base lg:text-lg font-semibold bg-transparent"
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
