"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  // Sparkles,
  ArrowRight,
  Heart,
  Star,
  Zap,
  // Globe,
} from "lucide-react"

// Floating animation component
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
        y: [-8, 8, -8],
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

// Particle component
const Particle = ({ delay = 0, x = "25%", y = "25%" }: { delay?: number; x?: string; y?: string }) => (
  <motion.div
    className="absolute w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-40"
    style={{ left: x, top: y }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 0.6, 0],
    }}
    transition={{
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  />
)

export default function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle")
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubscriptionStatus("success")
      setEmail("")
    } catch {
      setSubscriptionStatus("error")
    } finally {
      setIsSubscribing(false)
    }
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-500", bgColor: "bg-blue-500/10" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-cyan-500", bgColor: "bg-cyan-500/10" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-500", bgColor: "bg-pink-500/10" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-600", bgColor: "bg-blue-600/10" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-500", bgColor: "bg-red-500/10" },
  ]

  const companyLinks = [
    { label: t("services") || "Services", href: `/${locale}/services`, icon: Zap },
    { label: t("aboutUs") || "About Us", href: `/${locale}/about`, icon: Star },
    { label: t("contact") || "Contact", href: `/${locale}/contact`, icon: Mail },
    // { label: "Portfolio", href: `/${locale}/portfolio`, icon: Globe },
    // { label: "Blog", href: `/${locale}/blog`, icon: Sparkles },
  ]

  const services = [
    { name: t("softwareDevelopment") || "Software Development", icon: "💻" },
    { name: t("brandingDesign") || "Branding Design", icon: "🎨" },
    { name: t("websiteDevelopment") || "Website Development", icon: "🌐" },
    { name: t("digitalMarketing") || "Digital Marketing", icon: "📱" },
    { name: "Mobile App Development", icon: "📲" },
  ]

  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      {/* Floating Particles */}
      <Particle delay={0} x="10%" y="20%" />
      <Particle delay={1} x="90%" y="30%" />
      <Particle delay={2} x="20%" y="80%" />
      <Particle delay={3} x="80%" y="70%" />
      <Particle delay={4} x="50%" y="10%" />
      <Particle delay={5} x="70%" y="90%" />

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 150, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -120, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Enhanced Brand Section with SVG Logo */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="flex flex-col items-center md:items-start space-y-8">
                <FloatingElement delay={0} duration={10}>
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="relative group"
                      whileHover={{ rotate: 360, scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="w-12 h-12 relative">
                        <svg 
                          width="48" 
                          height="48" 
                          viewBox="0 0 48 48" 
                          className="w-full h-full transition-all duration-500 rounded-2xl"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Definitions for gradients and effects */}
                          <defs>
                            {/* Main gradient for the logo box */}
                            <linearGradient id="footerBoxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:1}} />
                              <stop offset="100%" style={{stopColor:'#9333EA', stopOpacity:1}} />
                            </linearGradient>
                            
                            {/* Drop shadow filter */}
                            <filter id="footerDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.25"/>
                            </filter>
                            
                            {/* Glow effect filter */}
                            <filter id="footerGlow" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                              <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          
                          {/* Background glow effect */}
                          <rect x="4" y="4" width="40" height="40" rx="10" ry="10" 
                                fill="url(#footerBoxGradient)" opacity="0.2" filter="url(#footerGlow)"/>
                          
                          {/* Main logo container */}
                          <rect x="4" y="4" width="40" height="40" rx="10" ry="10" 
                                fill="url(#footerBoxGradient)" filter="url(#footerDropShadow)"/>
                          
                          {/* Star icon */}
                          <g transform="translate(24, 24)">
                            <motion.path 
                              d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" 
                              fill="white" 
                              opacity="1"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                          </g>
                        </svg>
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        JBrand
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Creative Studio</span>
                    </div>
                  </div>
                </FloatingElement>

                <motion.p
                  className="text-gray-600 dark:text-gray-300 text-center md:text-left text-sm leading-relaxed max-w-xs"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t("companyDescription") ||
                    "Transforming businesses through innovative design and strategic digital solutions. We create experiences that inspire and drive results."}
                </motion.p>

                {/* Enhanced Social Media */}
                <div className="flex space-x-3 pt-3">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.2, y: -4 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={social.href}
                        className={`relative p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl ${social.color} transition-all duration-500 hover:shadow-lg group overflow-hidden border border-gray-200/50 dark:border-gray-700/50`}
                        aria-label={social.label}
                      >
                        {/* Background glow */}
                        <div
                          className={`absolute inset-0 ${social.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
                        />
                        <social.icon
                          size={18}
                          className="relative z-10 group-hover:scale-110 transition-transform duration-300 text-gray-700 dark:text-gray-300 group-hover:text-white"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-base font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-600" />
                {t("companyTitle") || "Company"}
              </h3>
              <nav aria-label="Company Navigation">
                <ul className="space-y-4">
                  {companyLinks.map((link, index) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 8 }}
                    >
                      <Link
                        href={link.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center group text-sm font-medium"
                      >
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <link.icon className="w-4 h-4 text-blue-600" />
                        </motion.div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.label}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Enhanced Services */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-base font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-purple-600" />
                {t("whatWeDoTitle") || "What We Do"}
              </h3>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-gray-600 dark:text-gray-300 flex items-center group cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-sm font-medium"
                    whileHover={{ x: 6 }}
                  >
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gradient-to-r group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                    >
                      <span className="text-base">{service.icon}</span>
                    </motion.div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Enhanced Contact & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-base font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-600" />
                {t("contactTitle") || "Contact"}
              </h3>

              {/* Enhanced Contact Info */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Mail,
                    text: t("email") || "hello@jbrand.studio",
                    color: "text-blue-600",
                    bg: "bg-blue-500/10",
                  },
                  {
                    icon: Phone,
                    text: t("phone") || "+1 (555) 123-4567",
                    color: "text-green-600",
                    bg: "bg-green-500/10",
                  },
                  {
                    icon: MapPin,
                    text: "Zhenjiang ZH / Bangui BG",
                    color: "text-purple-600",
                    bg: "bg-purple-500/10",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.text}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center text-gray-600 dark:text-gray-300 group hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    whileHover={{ x: 6 }}
                  >
                    <motion.div
                      className={`w-8 h-8 ${contact.bg} rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon size={16} className={contact.color} />
                    </motion.div>
                    <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {contact.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Newsletter */}
              <motion.div
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/50 to-blue-50/30 dark:from-gray-800/50 dark:to-gray-700/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-bold mb-6 text-gray-900 dark:text-white text-lg flex items-center">
                  {/* <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 mr-3 text-yellow-500" />
                  </motion.div> */}
                  Newsletter
                </h4>

                {subscriptionStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3"
                    >
                      <Heart className="w-6 h-6 text-white" />
                    </motion.div>
                    <p className="text-green-600 text-sm font-semibold">
                      {t("thanksForSubscribing") || "Thanks for subscribing!"} 🎉
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1.5 text-xs">You&rsquo;re now part of our amazing community!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder={t("enterYourEmail") || "Enter your email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/40 dark:bg-gray-800/40 border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-11 rounded-xl pl-10 transition-all duration-300 font-medium text-sm"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button
                        type="submit"
                        disabled={isSubscribing}
                        size="sm"
                        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transition-all duration-500 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none font-semibold text-sm relative overflow-hidden group"
                      >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        {isSubscribing ? (
                          <div className="flex items-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                            />
                            {t("subscribing") || "Subscribing..."}
                          </div>
                        ) : (
                          <div className="flex items-center relative z-10">
                            <Send size={16} className="mr-2" />
                            {t("subscribeNow") || "Subscribe Now"}
                            <ArrowRight className="ml-1.5 group-hover:translate-x-0.5 transition-transform duration-300" size={16} />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}

                {subscriptionStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 mt-4 text-center font-medium"
                  >
                    {t("somethingWentWrong") || "Something went wrong"} Please try again.
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-gray-200 dark:border-gray-800 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 text-gray-600 dark:text-gray-300">
                <motion.p className="text-sm font-medium" whileHover={{ scale: 1.02 }}>
                  © {currentYear} JBrand. All rights reserved.
                </motion.p>
              </div>
              <motion.div
                className="text-gray-600 dark:text-gray-300 flex items-center text-sm font-medium"
                whileHover={{ scale: 1.02 }}
              >
                Made by JBrand Team
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}