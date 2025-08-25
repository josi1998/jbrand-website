"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/ui/card"
import { ArrowRight, Play, Sparkles, Users, Award, TrendingUp, ChevronDown } from "lucide-react"
import Link from "next/link"

// Enhanced Particle component
const Particle = ({ delay = 0, index = 0 }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const particleTypes = [
    { size: "w-1 h-1", color: "bg-brand-blue/30", blur: "blur-sm" },
    { size: "w-0.5 h-0.5", color: "bg-brand-cyan/40", blur: "blur-none" },
    { size: "w-1.5 h-1.5", color: "bg-brand-purple/20", blur: "blur-sm" },
    { size: "w-2 h-2", color: "bg-brand-teal/25", blur: "blur-md" },
  ]

  const particle = particleTypes[index % particleTypes.length]

  return (
    <motion.div
      className={`absolute ${particle.size} ${particle.color} ${particle.blur} rounded-full`}
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
        duration: Math.random() * 20 + 15,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "linear",
      }}
    />
  )
}

// Cursor Spotlight Effect
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
      return () => window.removeEventListener("mousemove", moveCursor)
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 hidden lg:block"
      style={{
        background: `radial-gradient(600px circle at ${cursorXSpring}px ${cursorYSpring}px, rgba(var(--brand-blue-rgb), 0.08), transparent 70%)`,
      }}
    />
  )
}

// Floating Geometric Shape
const FloatingShape = ({
  children,
  delay = 0,
  duration = 8,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-20, 20, -20],
        rotate: [-5, 5, -5],
        scale: [1, 1.05, 1],
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

// Floating Achievement Badge using StatsCard
const FloatingBadge = ({
  icon,
  value,
  label,
  delay = 0,
  position = "top-20 right-20",
}: {
  icon: React.ReactNode
  value: string
  label: string
  delay?: number
  position?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute ${position} hidden xl:block z-20`}
    >
      <FloatingShape delay={delay} duration={6}>
        <StatsCard value={value} label={label} icon={icon} className="w-40" gradient="from-brand-blue to-brand-cyan" />
      </FloatingShape>
    </motion.div>
  )
}

interface HeroWithParticlesProps {
  badge?: string
  title?: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  particleCount?: number
  showFloatingBadges?: boolean
  showScrollIndicator?: boolean
}

export default function HeroWithParticles({
  badge = "Welcome to JBrand",
  title = "Transform Your Business",
  subtitle = "Digital Excellence Since 2019",
  description = "We create stunning digital experiences that drive real business results through innovative design and strategic thinking.",
  primaryButtonText = "Start Your Project",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Watch Our Story",
  secondaryButtonHref = "/about",
  particleCount = 50,
  showFloatingBadges = true,
  showScrollIndicator = true,
}: HeroWithParticlesProps) {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <>
      <CursorSpotlight />

      <section className="relative min-h-[calc(100vh-80px)] pt-24 pb-16 bg-gradient-hero overflow-hidden flex items-center">
        {/* Background Grid */}
        <motion.div className="absolute inset-0 grid-background opacity-30" style={{ y: backgroundY }} />

        {/* Animated Particles */}
        <div className="absolute inset-0 hidden lg:block">
          {[...Array(particleCount)].map((_, i) => (
            <Particle key={i} delay={i * 0.02} index={i} />
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <FloatingShape
          delay={0}
          duration={12}
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-radial from-brand-blue/20 to-transparent rounded-full blur-3xl hidden lg:block"
        />

        <FloatingShape
          delay={2}
          duration={15}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-radial from-brand-purple/15 to-transparent rounded-full blur-3xl hidden lg:block"
        />

        <FloatingShape
          delay={4}
          duration={10}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-brand-cyan/25 to-transparent rounded-full blur-2xl hidden lg:block"
        />

        {/* Floating Achievement Badges */}
        {showFloatingBadges && (
          <>
            <FloatingBadge
              icon={<Users className="w-5 h-5" />}
              value="200+"
              label="Happy Clients"
              delay={1.5}
              position="top-20 right-20"
            />
            <FloatingBadge
              icon={<Award className="w-5 h-5" />}
              value="5+"
              label="Years Experience"
              delay={2}
              position="top-1/2 right-10"
            />
            <FloatingBadge
              icon={<TrendingUp className="w-5 h-5" />}
              value="98%"
              label="Success Rate"
              delay={2.5}
              position="bottom-32 right-32"
            />
          </>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge variant="shimmer" size="lg" className="mb-8 tracking-wider">
                <Sparkles className="w-4 h-4 mr-2" />
                {badge}
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-bold leading-[1.1] mb-6 px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="text-text-primary">{title}</span>
              <br />
              <span className="text-gradient-hero">{subtitle}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed max-w-4xl px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 mb-16 w-full max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button asChild variant="glow" size="xl" className="group hover:text-white retain-text-color">
                <Link href={primaryButtonHref} className="hover:text-inherit">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="glass" size="xl" className="group hover:text-inherit retain-text-color">
                <Link href={secondaryButtonHref} className="hover:text-inherit">
                  <Play className="mr-2 h-5 w-5" />
                  {secondaryButtonText}
                </Link>
              </Button>
            </motion.div>

            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col items-center text-text-secondary"
              >
                <span className="text-sm mb-2">Scroll to explore</span>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}
