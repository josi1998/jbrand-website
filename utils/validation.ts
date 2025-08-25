import Joi from "joi"

// Enhanced validation schema with better error messages
export const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  phone: Joi.string()
    .pattern(/^[+]?[1-9][\d]{0,15}$/)
    .allow("")
    .optional()
    .messages({
      "string.pattern.base": "Please enter a valid phone number",
    }),

  company: Joi.string().max(200).allow("").optional().messages({
    "string.max": "Company name cannot exceed 200 characters",
  }),

  website: Joi.string().uri().allow("").optional().messages({
    "string.uri": "Please enter a valid website URL",
  }),

  budget: Joi.string().allow("").optional(),
  timeline: Joi.string().allow("").optional(),

  service: Joi.string()
    .valid(
      "brandIdentity",
      "webDevelopment",
      "digitalMarketing",
      "socialMedia",
      "videoProduction",
      "musicPodcastMixing",
      "other",
      "logoDesign",
      "webDesign",
      "webAppDev",
      "brandStrategy",
      "videoEditing",
      "audioProduction"
    )
    .allow("")
    .optional(),

  services: Joi.array()
    .items(
      Joi.string().valid(
        "brandIdentity",
        "webDevelopment",
        "digitalMarketing",
        "socialMedia",
        "videoProduction",
        "musicPodcastMixing",
        "other",
        "logoDesign",
        "webDesign",
        "webAppDev",
        "brandStrategy",
        "videoEditing",
        "audioProduction"
      )
    )
    .optional(),

  message: Joi.string().min(10).max(2000).required().messages({
    "string.empty": "Message is required",
    "string.min": "Message must be at least 10 characters long",
    "string.max": "Message cannot exceed 2000 characters",
  }),
})

// Newsletter subscription validation schema
export const subscribeSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  source: Joi.string()
    .valid("direct", "hero_form", "footer", "popup", "social", "referral", "api")
    .default("direct")
    .optional(),

  tags: Joi.array().items(Joi.string().max(50)).max(10).default([]).optional().messages({
    "array.max": "Too many tags provided",
    "string.max": "Tag cannot exceed 50 characters",
  }),

  preferences: Joi.object({
    frequency: Joi.string().valid("daily", "weekly", "monthly").default("weekly").optional(),
    categories: Joi.array()
      .items(Joi.string().valid("general", "updates", "promotions", "tips", "news"))
      .default(["general", "updates"])
      .optional(),
    format: Joi.string().valid("html", "text").default("html").optional(),
  })
    .default({})
    .optional(),
})

// Rate limiting schema for additional security
export const rateLimitSchema = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests, please try again later.",
}

// Unsubscribe validation schema
export const unsubscribeSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  reason: Joi.string().valid("too_frequent", "not_relevant", "never_subscribed", "spam", "other").optional(),

  feedback: Joi.string().max(500).allow("").optional().messages({
    "string.max": "Feedback cannot exceed 500 characters",
  }),
})
