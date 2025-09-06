"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { Menu, X, Home, User, Briefcase, Mail, ArrowRight, Zap, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

// Enhanced Particle component for navigation
const NavParticle = ({ delay = 0, index = 0 }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const particleTypes = [
    { size: "w-1 h-1", color: "bg-blue-400/30" },
    { size: "w-0.5 h-0.5", color: "bg-cyan-300/40" },
    { size: "w-1.5 h-1.5", color: "bg-indigo-400/25" },
  ]

  const particle = particleTypes[index % particleTypes.length]
  
  if (!particle) return null

  return (
    <motion.div
      className={`absolute ${particle.size} ${particle.color} rounded-full pointer-events-none`}
      initial={{
        x: Math.random() * 1200,
        y: Math.random() * 80,
        opacity: 0,
      }}
      animate={{
        x: Math.random() * 1200,
        y: Math.random() * 80,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 15 + 10,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "linear",
      }}
    />
  )
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const t = useTranslations("navigation")
  const locale = useLocale()
  const [theme, setTheme] = useState('light')
  
  // Set theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Apply theme when it changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Toggle language function (now using LanguageSwitcher component)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      href: `/${locale}`,
      label: t("home") || "Home",
      icon: Home,
    },
    {
      href: `/${locale}/about`,
      label: t("about") || "About",
      icon: User,
    },
    {
      href: `/${locale}/services`,
      label: t("services") || "Services",
      icon: Briefcase,
    },
    {
      href: `/${locale}/contact`,
      label: t("contact") || "Contact",
      icon: Mail,
    },
  ]

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
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50"
          : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <NavParticle key={i} delay={i * 0.2} index={i} />
        ))}
      </div>

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Enhanced SVG Logo */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center"
          >
            <Link href={`/${locale}`} className="group flex items-center">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <svg 
                  width="180" 
                  height="56" 
                  viewBox="0 0 180 56" 
                  className="h-11 md:h-12 w-auto transition-all duration-300 group-hover:drop-shadow-lg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Definitions for gradients and effects */}
                  <defs>
                    {/* Main gradient for the logo box */}
                    <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#9333EA', stopOpacity:1}} />
                    </linearGradient>
                    
                    {/* Text gradient */}
                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:'#2563EB', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#9333EA', stopOpacity:1}} />
                    </linearGradient>
                    
                    {/* Drop shadow filter */}
                    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.25"/>
                    </filter>
                    
                    {/* Glow effect filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Background glow effect */}
                  <rect x="5" y="5" width="40" height="40" rx="10" ry="10" 
                        fill="url(#boxGradient)" opacity="0.2" filter="url(#glow)"/>
                  
                  {/* Main logo container */}
                  <rect x="5" y="5" width="40" height="40" rx="10" ry="10" 
                        fill="url(#boxGradient)" filter="url(#dropShadow)"/>
                  
                  {/* Star icon */}
                  <g transform="translate(25, 25)">
                    <motion.path 
                      d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" 
                      fill="white" 
                      opacity="1"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </g>
                  
                  {/* Main text "JBrand" */}
                  <text x="55" y="32" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="bold" 
                        fill="url(#textGradient)">JBrand</text>
                  
                  {/* Subtitle "Creative Studio" */}
                  <text x="55" y="44" fontFamily="Arial, sans-serif" fontSize="11" 
                        fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'}>Creative Studio</text>
                </svg>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:flex items-center space-x-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400",
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                        <item.icon className={`w-3.5 h-3.5 ${
                          isActive 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-700 dark:text-gray-400'
                        }`} />
                      </div>
                      <span className={`text-sm font-medium ${
                        isActive 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Enhanced hover effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-100 transition-opacity duration-300"
                        layoutId="activeTab"
                      />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        layoutId="activeIndicator"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Underline effect */}
                    <motion.div
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Enhanced CTA and Controls */}
          <motion.div
            className="flex items-center space-x-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Theme Toggle */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50 dark:border-gray-700/50">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-3 h-3 text-yellow-400" />
                ) : (
                  <Moon className="w-3 h-3 text-gray-700" />
                )}
              </Button>
            </div>

            {/* Language Switcher - Now visible on mobile too */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50 dark:border-gray-700/50">
              <LanguageSwitcher />
            </div>

            {/* Enhanced CTA Button */}
            <Button
              className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 !text-white shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-300 relative overflow-hidden group px-5 py-2"
              asChild
            >
              <Link href={`/${locale}/contact`}>
                <span className="relative z-10 flex items-center !text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 !text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                />
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50"
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? (
                  <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                )}
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div 
                className="absolute top-16 right-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-gray-200/50 dark:border-gray-800/50"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-3">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex items-center space-x-2.5 p-2.5 rounded-lg transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200",
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300",
                              isActive
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white",
                            )}
                          >
                            <item.icon className="w-4 h-4" />
                          </motion.div>
                          <span className="font-medium">{item.label}</span>
                          {isActive && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                              <Badge
                                variant="secondary"
                                size="sm"
                                className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              >
                                Active
                              </Badge>
                            </motion.div>
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}

                  {/* Mobile Language Switcher */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="pt-3 border-t border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex items-center justify-center mb-3">
                      <LanguageSwitcher />
                    </div>
                  </motion.div>

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 !text-white shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-300 h-10"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={`/${locale}/contact`}>
                        <Zap className="mr-1.5 h-4 w-4 !text-white" />
                        <span className="!text-white">Get Started Now</span>
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}