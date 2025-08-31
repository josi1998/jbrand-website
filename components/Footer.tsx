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
  Sparkles,
  ArrowRight,
  Heart,
  Star,
  Zap,
  Globe,
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
    } catch (error) {
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
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
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
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="relative group"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="w-16 h-16 relative">
                        <svg 
                          width="64" 
                          height="64" 
                          viewBox="0 0 60 60" 
                          className="w-full h-full transition-all duration-500 rounded-3xl"
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
                          <rect x="6" y="6" width="48" height="48" rx="12" ry="12" 
                                fill="url(#footerBoxGradient)" opacity="0.2" filter="url(#footerGlow)"/>
                          
                          {/* Main logo container */}
                          <rect x="6" y="6" width="48" height="48" rx="12" ry="12" 
                                fill="url(#footerBoxGradient)" filter="url(#footerDropShadow)"/>
                          
                          {/* Star icon */}
                          <g transform="translate(30, 30)">
                            <motion.path 
                              d="M0,-12 L3.5,-3.5 L12,0 L3.5,3.5 L0,12 L-3.5,3.5 L-12,0 L-3.5,-3.5 Z" 
                              fill="white" 
                              opacity="1"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                          </g>
                        </svg>
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        JBrand
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Creative Studio</span>
                    </div>
                  </div>
                </FloatingElement>

                <motion.p
                  className="text-gray-600 dark:text-gray-300 text-center md:text-left text-lg leading-relaxed max-w-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t("companyDescription") ||
                    "Transforming businesses through innovative design and strategic digital solutions. We create experiences that inspire and drive results."}
                </motion.p>

                {/* Enhanced Social Media */}
                <div className="flex space-x-4 pt-4">
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
                        className={`relative p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl ${social.color} transition-all duration-500 hover:shadow-xl group overflow-hidden border border-gray-200 dark:border-gray-700`}
                        aria-label={social.label}
                      >
                        {/* Background glow */}
                        <div
                          className={`absolute inset-0 ${social.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                        />
                        <social.icon
                          size={22}
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
              <h3 className="text-2xl font-bold mb-10 text-gray-900 dark:text-white flex items-center">
                <Star className="w-6 h-6 mr-3 text-blue-600" />
                {t("companyTitle") || "Company"}
              </h3>
              <nav aria-label="Company Navigation">
                <ul className="space-y-5">
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
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center group text-lg font-medium"
                      >
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <link.icon className="w-5 h-5 text-blue-600" />
                        </motion.div>
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          {link.label}
                        </span>
                        <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
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
              <h3 className="text-2xl font-bold mb-10 text-gray-900 dark:text-white flex items-center">
                <Zap className="w-6 h-6 mr-3 text-purple-600" />
                {t("whatWeDoTitle") || "What We Do"}
              </h3>
              <ul className="space-y-5">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-gray-600 dark:text-gray-300 flex items-center group cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-lg font-medium"
                    whileHover={{ x: 8 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-gradient-to-r group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="text-lg">{service.icon}</span>
                    </motion.div>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{service.name}</span>
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
              <h3 className="text-2xl font-bold mb-10 text-gray-900 dark:text-white flex items-center">
                <Mail className="w-6 h-6 mr-3 text-green-600" />
                {t("contactTitle") || "Contact"}
              </h3>

              {/* Enhanced Contact Info */}
              <div className="space-y-6 mb-10">
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
                    whileHover={{ x: 8 }}
                  >
                    <motion.div
                      className={`w-10 h-10 ${contact.bg} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon size={20} className={contact.color} />
                    </motion.div>
                    <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300">
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
                <h4 className="font-bold mb-6 text-gray-900 dark:text-white text-xl flex items-center">
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
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Heart className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-green-600 text-lg font-semibold">
                      {t("thanksForSubscribing") || "Thanks for subscribing!"} 🎉
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">You're now part of our amazing community!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-5">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder={t("enterYourEmail") || "Enter your email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-14 rounded-2xl pl-12 transition-all duration-300 font-medium"
                        required
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubscribing}
                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transition-all duration-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none font-semibold text-lg relative overflow-hidden group"
                      >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        {isSubscribing ? (
                          <div className="flex items-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full mr-3"
                            />
                            {t("subscribing") || "Subscribing..."}
                          </div>
                        ) : (
                          <div className="flex items-center relative z-10">
                            <Send size={20} className="mr-3" />
                            {t("subscribeNow") || "Subscribe Now"}
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
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
            className="border-t border-gray-200 dark:border-gray-800 pt-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col md:flex-row items-center gap-8 text-gray-600 dark:text-gray-300">
                <motion.p className="text-lg font-medium" whileHover={{ scale: 1.05 }}>
                  © {currentYear} JBrand. All rights reserved.
                </motion.p>
                {/* <div className="flex gap-8">
                  {[
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Terms of Service", href: "/terms" },
                    { label: "Cookie Policy", href: "/cookies" },
                  ].map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <Link
                        href={link.href}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative group font-medium"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                      </Link>
                    </motion.div>
                  ))}
                </div> */}
              </div>
              <motion.div
                className="text-gray-600 dark:text-gray-300 flex items-center text-lg font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Made{" "}
                {/* <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="mx-3"
                >
                  <Heart className="w-6 h-6 text-red-500 fill-current" />
                </motion.span> */}
                by JBrand Team
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}