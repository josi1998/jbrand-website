import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-modern hover:bg-primary/90 hover:shadow-modern-lg transform hover:scale-102 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-modern hover:bg-destructive/90 hover:shadow-modern-lg transform hover:scale-102 hover:-translate-y-0.5",
        outline:
          "border border-input bg-background shadow-modern hover:bg-accent hover:text-accent-foreground hover:shadow-modern-lg transform hover:scale-102 hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-modern hover:bg-secondary/80 hover:shadow-modern-lg transform hover:scale-102 hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground transform hover:scale-102",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-primary text-white shadow-modern hover:shadow-glow transform hover:scale-102 hover:-translate-y-0.5 relative overflow-hidden",
        glass:
          "glass border-border text-text-primary hover:bg-surface-secondary/50 shadow-modern hover:shadow-modern-lg transform hover:scale-102 hover:-translate-y-0.5 backdrop-blur-sm bg-transparent",
        glow: "bg-gradient-primary text-white shadow-glow hover:shadow-glow-lg transform hover:scale-102 hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
      },
      size: {
        default: "h-8 px-3 py-1.5",
        sm: "h-7 rounded-md px-2.5 text-xs",
        lg: "h-9 rounded-md px-6",
        xl: "h-10 rounded-lg px-8 text-base font-semibold",
        icon: "h-8 w-8",
        "icon-sm": "h-7 w-7",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
