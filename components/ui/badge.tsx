import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-modern hover:bg-primary/80 hover:shadow-modern-lg",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-modern hover:shadow-modern-lg",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-modern hover:bg-destructive/80 hover:shadow-modern-lg",
        outline: "text-foreground border-border hover:bg-surface-secondary/50 shadow-modern hover:shadow-modern-lg",
        gradient: "border-transparent bg-gradient-primary text-white shadow-modern hover:shadow-glow",
        glass:
          "glass border-border text-text-primary hover:bg-surface-secondary/30 shadow-modern hover:shadow-modern-lg",
        success:
          "border-transparent bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-modern hover:shadow-glow",
        warning:
          "border-transparent bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-modern hover:shadow-glow",
        info: "border-transparent bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-modern hover:shadow-glow",
        brand:
          "border-transparent bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-modern hover:shadow-glow",
        purple:
          "border-transparent bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-modern hover:shadow-glow",
        teal: "border-transparent bg-gradient-to-r from-brand-teal to-brand-green text-white shadow-modern hover:shadow-glow",
        shimmer:
          "border-transparent bg-gradient-primary text-white shadow-glow relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-2 text-sm font-semibold",
        xl: "px-6 py-3 text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { Badge, badgeVariants }
