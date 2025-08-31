# JBrand Website

A modern, multilingual business website built with Next.js 15, featuring contact forms, newsletter subscription, and internationalization support.

## Features

- 🌍 Multilingual support (English & French)
- 📧 Contact form with email notifications
- 📬 Newsletter subscription system
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js App Router
- 🔒 Form validation with Zod
- 📊 Analytics integration
- 🌙 Dark/Light theme support

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Database:** MongoDB
- **Email Service:** Resend API
- **Internationalization:** next-intl
- **Animation:** Framer Motion
- **Deployment:** Vercel

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `RESEND_API_KEY`: Your Resend API key for email functionality
   - `NEXT_PUBLIC_SITE_URL`: Your site URL (for production)
   - `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Quick Deployment Steps:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Required Environment Variables for Vercel:
```
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_ID=your_ga_id (optional)
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

```
jbrand-website/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── api/               # API endpoints
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── sections/         # Page sections
├── lib/                  # Utility libraries
├── messages/             # Internationalization files
├── models/               # Database models
├── public/               # Static assets
└── utils/                # Helper functions
```
