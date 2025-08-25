import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const cardVariants = cva("rounded-2xl border bg-card text-card-foreground shadow-modern transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-surface-primary border-border hover:shadow-modern-lg",
      glass: "glass-card border-border/50 hover:shadow-glow backdrop-blur-md",
      gradient: "bg-gradient-secondary border-0 text-white hover:shadow-glow",
      outline: "bg-transparent border-2 border-border hover:bg-surface-secondary/50 hover:shadow-modern-lg",
      elevated: "bg-surface-primary border-0 shadow-modern-xl hover:shadow-modern-2xl transform hover:-translate-y-1",
      interactive:
        "bg-surface-primary border-border hover:shadow-modern-xl transform hover:scale-[1.02] hover:-translate-y-2 cursor-pointer",
      feature:
        "bg-gradient-to-br from-surface-primary to-surface-secondary border-border/50 hover:shadow-glow hover:border-brand-blue/30",
    },
    size: {
      default: "",
      sm: "p-4",
      lg: "p-8",
      xl: "p-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant, size, ...props }, ref) => (
  <div ref={ref} className={cn(cardVariants({ variant, size }), className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-xl font-bold leading-tight tracking-tight text-text-primary", className)}
      {...props}
    />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-text-secondary leading-relaxed", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

// Enhanced Card Components for specific use cases
const FeatureCard = React.forwardRef<
  HTMLDivElement,
  CardProps & {
    icon?: React.ReactNode
    title: string
    description: string
    gradient?: string
    href?: string
    linkText?: string
  }
>(
  (
    {
      className,
      icon,
      title,
      description,
      gradient = "from-brand-blue to-brand-cyan",
      href,
      linkText = "Learn More",
      ...props
    },
    ref,
  ) => (
    <Card ref={ref} variant="feature" className={cn("group overflow-hidden relative h-full", className)} {...props}>
      {/* Background Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      <CardContent className="p-6 relative z-10 h-full flex flex-col">
        {icon && (
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 shadow-modern group-hover:shadow-glow transition-shadow duration-300`}
          >
            {icon}
          </div>
        )}
        <CardTitle className="mb-3">{title}</CardTitle>
        <CardDescription className="flex-1 mb-4">{description}</CardDescription>
        {href && (
          <div className="mt-auto">
            <Link
              href={href}
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              {linkText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  ),
)
FeatureCard.displayName = "FeatureCard"

const StatsCard = React.forwardRef<
  HTMLDivElement,
  CardProps & {
    value: string
    label: string
    icon?: React.ReactNode
    trend?: "up" | "down" | "neutral"
    gradient?: string
  }
>(({ className, value, label, icon, trend = "neutral", gradient = "from-brand-blue to-brand-cyan", ...props }, ref) => {
  const trendColors = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-text-secondary",
  }

  return (
    <Card ref={ref} variant="glass" className={cn("group text-center", className)} {...props}>
      <CardContent className="p-6">
        {icon && (
          <div
            className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 shadow-modern group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}
          >
            {icon}
          </div>
        )}
        <div className="text-3xl font-bold text-text-primary mb-2">{value}</div>
        <div className={cn("text-sm font-medium", trendColors[trend])}>{label}</div>
      </CardContent>
    </Card>
  )
})
StatsCard.displayName = "StatsCard"

const TestimonialCard = React.forwardRef<
  HTMLDivElement,
  CardProps & {
    quote: string
    author: string
    role: string
    avatar?: string
    rating?: number
  }
>(({ className, quote, author, role, avatar, rating = 5, ...props }, ref) => (
  <Card ref={ref} variant="glass" className={cn("group h-full", className)} {...props}>
    <CardContent className="p-6 flex flex-col h-full">
      {/* Rating Stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn("w-4 h-4", i < rating ? "text-yellow-400 fill-current" : "text-gray-300")}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-text-primary mb-6 leading-relaxed flex-1">"{quote}"</blockquote>

      {/* Author */}
      <div className="flex items-center mt-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm mr-3">
          {avatar ||
            author
              .split(" ")
              .map((n) => n[0])
              .join("")}
        </div>
        <div>
          <div className="font-semibold text-text-primary">{author}</div>
          <div className="text-sm text-text-secondary">{role}</div>
        </div>
      </div>
    </CardContent>
  </Card>
))
TestimonialCard.displayName = "TestimonialCard"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  FeatureCard,
  StatsCard,
  TestimonialCard,
  cardVariants,
}
