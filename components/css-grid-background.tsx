"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CssGridBackgroundProps {
  variant?: "default" | "hero" | "section" | "minimal" | "animated"
  intensity?: "subtle" | "medium" | "strong"
  showGradient?: boolean
  showParticles?: boolean
  animated?: boolean
  className?: string
}

export default function CssGridBackground({
  variant = "default",
  intensity = "medium",
  showGradient = true,
  showParticles = false,
  animated = false,
  className,
}: CssGridBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (!animated) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [animated])

  // Grid configurations based on variant
  const gridConfigs = {
    default: {
      size: "24px 24px",
      opacity: intensity === "subtle" ? "0.03" : intensity === "medium" ? "0.06" : "0.1",
      color: "#808080",
    },
    hero: {
      size: "60px 60px",
      opacity: intensity === "subtle" ? "0.05" : intensity === "medium" ? "0.1" : "0.15",
      color: "#3b82f6",
    },
    section: {
      size: "40px 40px",
      opacity: intensity === "subtle" ? "0.04" : intensity === "medium" ? "0.08" : "0.12",
      color: "#6366f1",
    },
    minimal: {
      size: "80px 80px",
      opacity: intensity === "subtle" ? "0.02" : intensity === "medium" ? "0.04" : "0.06",
      color: "#94a3b8",
    },
    animated: {
      size: "32px 32px",
      opacity: intensity === "subtle" ? "0.06" : intensity === "medium" ? "0.12" : "0.18",
      color: "#8b5cf6",
    },
  }

  const config = gridConfigs[variant]

  // Dynamic gradient based on mouse position
  const dynamicGradient =
    animated && isClient
      ? {
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1), transparent 40%)`,
        }
      : {}

  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full overflow-hidden",
        "bg-background transition-colors duration-500",
        className,
      )}
      aria-hidden="true"
    >
      {/* Base background with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      {/* Main grid pattern */}
      <div
        className={cn("absolute inset-0 transition-opacity duration-700", animated && "animate-pulse")}
        style={{
          backgroundImage: `linear-gradient(to right, ${config.color}${Math.round(
            Number.parseFloat(config.opacity) * 255,
          )
            .toString(16)
            .padStart(2, "0")} 1px, transparent 1px), linear-gradient(to bottom, ${config.color}${Math.round(
            Number.parseFloat(config.opacity) * 255,
          )
            .toString(16)
            .padStart(2, "0")} 1px, transparent 1px)`,
          backgroundSize: config.size,
          maskImage:
            variant === "hero"
              ? "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 20%, black 70%, transparent 100%)"
              : variant === "minimal"
                ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, black 80%)"
                : "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 10%, black 60%, transparent 95%)",
          WebkitMaskImage:
            variant === "hero"
              ? "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 20%, black 70%, transparent 100%)"
              : variant === "minimal"
                ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, black 80%)"
                : "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 10%, black 60%, transparent 95%)",
        }}
      />

      {/* Secondary grid for depth */}
      {variant === "hero" && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(to right, ${config.color}20 1px, transparent 1px), linear-gradient(to bottom, ${config.color}20 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
            maskImage: "radial-gradient(ellipse 60% 40% at 50% 60%, transparent 30%, black 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 40% at 50% 60%, transparent 30%, black 80%)",
          }}
        />
      )}

      {/* Animated gradient overlay */}
      {showGradient && (
        <>
          {/* Primary gradient blob */}
          <div
            className={cn(
              "absolute -z-10 rounded-full blur-3xl transition-all duration-1000",
              variant === "hero" ? "h-[400px] w-[400px]" : "h-[300px] w-[300px]",
              animated ? "animate-pulse" : "",
            )}
            style={{
              left: animated && isClient ? `${mousePosition.x * 0.3}%` : "50%",
              top: animated && isClient ? `${mousePosition.y * 0.3}%` : "20%",
              transform: "translate(-50%, -50%)",
              background:
                variant === "hero"
                  ? "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)"
                  : "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 100%)",
              ...dynamicGradient,
            }}
          />

          {/* Secondary gradient blob */}
          <div
            className={cn(
              "absolute -z-10 rounded-full blur-3xl transition-all duration-1500",
              "h-[250px] w-[250px]",
              animated ? "animate-pulse" : "",
            )}
            style={{
              right: animated && isClient ? `${(100 - mousePosition.x) * 0.2}%` : "20%",
              bottom: animated && isClient ? `${(100 - mousePosition.y) * 0.2}%` : "30%",
              transform: "translate(50%, 50%)",
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%)",
              animationDelay: "0.5s",
            }}
          />

          {/* Tertiary accent gradient */}
          {variant === "hero" && (
            <div
              className="absolute -z-10 h-[200px] w-[200px] rounded-full blur-2xl opacity-60 animate-pulse"
              style={{
                left: "80%",
                top: "70%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
                animationDelay: "1s",
                animationDuration: "4s",
              }}
            />
          )}
        </>
      )}

      {/* Floating particles effect */}
      {showParticles && isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: variant === "hero" ? 12 : 8 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute rounded-full opacity-20 animate-float",
                i % 3 === 0 ? "bg-blue-400" : i % 3 === 1 ? "bg-purple-400" : "bg-indigo-400",
              )}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive mouse trail effect */}
      {animated && isClient && (
        <div
          className="absolute pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(20px)",
          }}
        />
      )}

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* CSS custom properties for theme integration */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}

// Export variants for easy usage
export const GridBackgroundVariants = {
  Hero: (props: Omit<CssGridBackgroundProps, "variant">) => (
    <CssGridBackground variant="hero" showGradient showParticles animated {...props} />
  ),
  Section: (props: Omit<CssGridBackgroundProps, "variant">) => (
    <CssGridBackground variant="section" showGradient {...props} />
  ),
  Minimal: (props: Omit<CssGridBackgroundProps, "variant">) => (
    <CssGridBackground variant="minimal" intensity="subtle" {...props} />
  ),
  Animated: (props: Omit<CssGridBackgroundProps, "variant">) => (
    <CssGridBackground variant="animated" showGradient showParticles animated {...props} />
  ),
}
