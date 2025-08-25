"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, animate } from "framer-motion"
import { useTheme } from "next-themes"

interface FramerSpotlightProps {
  variant?: "hero" | "section" | "minimal"
  intensity?: "low" | "medium" | "high"
  enableParticles?: boolean
  enableMouseTrail?: boolean
  targetElement?: string
  colors?: {
    primary: string
    secondary: string
    tertiary: string
  }
}

export default function FramerSpotlight({
  variant = "hero",
  intensity = "medium",
  enableParticles = false,
  enableMouseTrail = false,
  targetElement = "hero",
  colors,
}: FramerSpotlightProps = {}) {
  const [isMounted, setIsMounted] = useState(false)
  const [isMouseInHero, setIsMouseInHero] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const defaultPositionRef = useRef({ x: 0, y: 0 })
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Motion values for the spotlight position with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add spring physics for smoother movement
  const springX = useSpring(mouseX, { damping: 20, stiffness: 300 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 300 })

  // Enhanced spotlight configurations
  const spotlightVariants = {
    hero: {
      primary: { size: 1000, intensity: 0.25, blur: 120 },
      secondary: { size: 800, intensity: 0.15, blur: 100 },
      tertiary: { size: 600, intensity: 0.1, blur: 80 },
    },
    section: {
      primary: { size: 600, intensity: 0.15, blur: 80 },
      secondary: { size: 400, intensity: 0.1, blur: 60 },
      tertiary: { size: 300, intensity: 0.08, blur: 40 },
    },
    minimal: {
      primary: { size: 400, intensity: 0.1, blur: 60 },
      secondary: { size: 300, intensity: 0.06, blur: 40 },
      tertiary: { size: 200, intensity: 0.04, blur: 30 },
    },
  }

  // Add performance optimization
  const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleChange)

      return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    return prefersReducedMotion
  }

  const prefersReducedMotion = useReducedMotion()

  // Enhanced spotlight colors with custom color support
  const getSpotlightColors = () => {
    if (colors) {
      return [
        { color: colors.primary, darkColor: colors.primary },
        { color: colors.secondary, darkColor: colors.secondary },
        { color: colors.tertiary, darkColor: colors.tertiary },
      ]
    }

    const intensityMultiplier = intensity === "low" ? 0.6 : intensity === "high" ? 1.4 : 1

    return [
      {
        color: `rgba(59, 130, 246, ${0.15 * intensityMultiplier})`,
        darkColor: `rgba(59, 130, 246, ${0.2 * intensityMultiplier})`,
      },
      {
        color: `rgba(236, 72, 153, ${0.1 * intensityMultiplier})`,
        darkColor: `rgba(236, 72, 153, ${0.15 * intensityMultiplier})`,
      },
      {
        color: `rgba(16, 185, 129, ${0.1 * intensityMultiplier})`,
        darkColor: `rgba(16, 185, 129, ${0.15 * intensityMultiplier})`,
      },
    ]
  }

  const spotlightColors = getSpotlightColors()
  const currentVariant = spotlightVariants[variant]

  // Update default position without causing re-renders
  const updateDefaultPosition = () => {
    if (heroRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect()
      const centerX = heroRect.left + heroRect.width / 2
      const centerY = heroRect.top + heroRect.height / 3

      defaultPositionRef.current = { x: centerX, y: centerY }

      // Set initial position
      mouseX.set(centerX)
      mouseY.set(centerY)
    }
  }

  // Handle mouse enter/leave for hero section
  const handleMouseEnter = () => {
    setIsMouseInHero(true)
  }

  const handleMouseLeave = () => {
    setIsMouseInHero(false)

    // Animate back to default position
    animate(mouseX, defaultPositionRef.current.x, {
      duration: 1.2,
      ease: "easeInOut",
    })

    animate(mouseY, defaultPositionRef.current.y, {
      duration: 1.2,
      ease: "easeInOut",
    })
  }

  // Handle mouse movement only when inside hero
  const handleMouseMove = (e: MouseEvent) => {
    if (isMouseInHero) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
  }

  // Setup effect - runs once on mount and cleans up on unmount
  useEffect(() => {
    setIsMounted(true)

    // Find the target element (hero by default)
    heroRef.current = document.getElementById(targetElement)

    // Initial setup
    updateDefaultPosition()

    // Event listeners
    window.addEventListener("resize", updateDefaultPosition)
    window.addEventListener("mousemove", handleMouseMove)

    if (heroRef.current) {
      heroRef.current.addEventListener("mouseenter", handleMouseEnter)
      heroRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDefaultPosition)
      window.removeEventListener("mousemove", handleMouseMove)

      if (heroRef.current) {
        heroRef.current.removeEventListener("mouseenter", handleMouseEnter)
        heroRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isMouseInHero, targetElement])

  if (!isMounted) {
    return null
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary spotlight that follows mouse/animation */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${
            isDark ? spotlightColors[0]?.darkColor || "rgba(59, 130, 246, 0.2)" : spotlightColors[0]?.color || "rgba(59, 130, 246, 0.15)"
          } 0%, transparent 70%)`,
          width: `${currentVariant.primary.size}px`,
          height: `${currentVariant.primary.size}px`,
          borderRadius: "50%",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          filter: `blur(${currentVariant.primary.blur}px)`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: prefersReducedMotion ? currentVariant.primary.intensity * 0.5 : currentVariant.primary.intensity,
          scale: 1,
        }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 1 }}
      />

      {/* Secondary spotlights with independent animations */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={
          prefersReducedMotion
            ? {
                opacity: currentVariant.secondary.intensity * 0.5,
              }
            : {
                opacity: [
                  currentVariant.secondary.intensity * 0.5,
                  currentVariant.secondary.intensity,
                  currentVariant.secondary.intensity * 0.5,
                ],
                x: ["0%", "10%", "5%", "0%"],
                y: ["0%", "5%", "10%", "0%"],
              }
        }
        transition={{
          duration: prefersReducedMotion ? 0.3 : 12,
          repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? spotlightColors[1]?.darkColor || "rgba(236, 72, 153, 0.15)" : spotlightColors[1]?.color || "rgba(236, 72, 153, 0.1)"
          } 0%, transparent 70%)`,
          width: `${currentVariant.secondary.size}px`,
          height: `${currentVariant.secondary.size}px`,
          borderRadius: "50%",
          left: "20%",
          top: "30%",
          filter: `blur(${currentVariant.secondary.blur}px)`,
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={
          prefersReducedMotion
            ? {
                opacity: currentVariant.tertiary.intensity * 0.5,
              }
            : {
                opacity: [
                  currentVariant.tertiary.intensity * 0.3,
                  currentVariant.tertiary.intensity,
                  currentVariant.tertiary.intensity * 0.3,
                ],
                x: ["0%", "-10%", "-5%", "0%"],
                y: ["0%", "-5%", "-10%", "0%"],
              }
        }
        transition={{
          duration: prefersReducedMotion ? 0.3 : 15,
          repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? spotlightColors[2]?.darkColor || "rgba(16, 185, 129, 0.15)" : spotlightColors[2]?.color || "rgba(16, 185, 129, 0.1)"
          } 0%, transparent 70%)`,
          width: `${currentVariant.tertiary.size}px`,
          height: `${currentVariant.tertiary.size}px`,
          borderRadius: "50%",
          right: "20%",
          bottom: "30%",
          filter: `blur(${currentVariant.tertiary.blur}px)`,
        }}
      />
      {/* Mouse trail effect */}
      {enableMouseTrail && !prefersReducedMotion && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${
              isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.08)"
            } 0%, transparent 50%)`,
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isMouseInHero ? 0.6 : 0,
            scale: isMouseInHero ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Floating particles */}
      {enableParticles && !prefersReducedMotion && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${
                  isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
                } 0%, transparent 70%)`,
                width: `${20 + i * 10}px`,
                height: `${20 + i * 10}px`,
                borderRadius: "50%",
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, -5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
