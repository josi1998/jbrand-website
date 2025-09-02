"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, TrendingUp, Globe, Heart, Star, CheckCircle, Rocket } from "lucide-react"

// Counter Animation Hook
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    // Future: const endTime = startTime + duration // For advanced timing

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)

      setCount(currentCount)
      countRef.current = currentCount

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [end, duration, isInView])

  return { count, ref }
}

// Individual Stat Card Component
interface StatCardProps {
  icon: React.ReactNode
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
  gradient: string
  delay?: number
  duration?: number
}

function StatCard({
  icon,
  value,
  suffix = "",
  prefix = "",
  label,
  description,
  gradient,
  delay = 0,
  duration = 2000,
}: StatCardProps) {
  const { count, ref } = useCounter(value, duration)
  const progressRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(progressRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      className="group"
    >
      <Card variant="interactive" className="h-full overflow-hidden relative">
        {/* Background Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <CardContent className="p-6 lg:p-8 relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 shadow-modern group-hover:shadow-glow transition-shadow duration-300`}
          >
            {icon}
          </motion.div>

          {/* Counter Value */}
          <div className="mb-4">
            <motion.div
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary mb-2"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delay * 0.1 + 0.3 }}
            >
              {prefix}
              {count.toLocaleString()}
              {suffix}
            </motion.div>

            {/* Progress Bar */}
            <div ref={progressRef} className="w-full h-1 bg-surface-secondary rounded-full overflow-hidden mb-4">
              <motion.div
                className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{
                  duration: 1.5,
                  delay: delay * 0.1 + 0.5,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>

          {/* Label */}
          <h3 className="text-lg lg:text-xl font-semibold text-text-primary mb-2">{label}</h3>

          {/* Description */}
          {description && <p className="text-sm lg:text-base text-text-secondary leading-relaxed">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main Stats Counter Component
interface AnimatedStatsCounterProps {
  title?: string
  subtitle?: string
  badge?: string
  stats?: StatCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}

export default function AnimatedStatsCounter({
  title = "Our Achievements",
  subtitle = "Numbers that speak for our success and dedication to excellence",
  badge = "Company Stats",
  stats,
  columns = 4,
  className = "",
}: AnimatedStatsCounterProps) {
  const defaultStats: StatCardProps[] = [
    {
      icon: <Users className="w-6 h-6 lg:w-7 lg:h-7" />,
      value: 200,
      suffix: "+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      icon: <Award className="w-6 h-6 lg:w-7 lg:h-7" />,
      value: 5,
      suffix: "+",
      label: "Years Experience",
      description: "In digital innovation",
      gradient: "from-purple-500 to-pink-500",
      delay: 1,
    },
    {
      icon: <TrendingUp className="w-6 h-6 lg:w-7 lg:h-7" />,
      value: 98,
      suffix: "%",
      label: "Success Rate",
      description: "Project completion rate",
      gradient: "from-green-500 to-emerald-500",
      delay: 2,
    },
    {
      icon: <Globe className="w-6 h-6 lg:w-7 lg:h-7" />,
      value: 15,
      suffix: "+",
      label: "Countries Served",
      description: "Global reach and impact",
      gradient: "from-orange-500 to-red-500",
      delay: 3,
    },
  ]

  const statsToShow = stats || defaultStats
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <section className={`py-16 lg:py-24 bg-surface-secondary ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <Badge variant="brand" size="lg" className="mb-6 tracking-wider">
            <Star className="w-4 h-4 mr-2" />
            {badge}
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary mb-6 leading-tight">
            {title}
          </h2>

          <p className="text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 lg:gap-8`}>
          {statsToShow.map((stat, index) => (
            <StatCard key={index} {...stat} delay={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Pre-built Company Stats Section
export function CompanyStatsSection() {
  const companyStats: StatCardProps[] = [
    {
      icon: <Users className="w-6 h-6 lg:w-7 lg:h-7" />,
      value: 250,
      suffix: "+",
      label: "Projects Completed",
      description: "Successful digital transformations",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      icon: <Heart className="w-6 h-6 lg:w-7 lg:h-7" />,
      value: 98,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Based on client feedback",
      gradient: "from-red-500 to-pink-500",
      delay: 1,
    },
    {
      icon: <Rocket className="w-6 h-6 lg:w-7 lg:h-7" />,
      value: 150,
      suffix: "%",
      label: "Growth Rate",
      description: "Average client business growth",
      gradient: "from-purple-500 to-indigo-500",
      delay: 2,
    },
    {
      icon: <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7" />,
      value: 24,
      suffix: "/7",
      label: "Support Available",
      description: "Round-the-clock assistance",
      gradient: "from-green-500 to-teal-500",
      delay: 3,
    },
  ]

  return (
    <AnimatedStatsCounter
      title="Why Choose JBrand?"
      subtitle="We deliver exceptional results that drive real business growth and success"
      badge="Our Impact"
      stats={companyStats}
      columns={4}
    />
  )
}
