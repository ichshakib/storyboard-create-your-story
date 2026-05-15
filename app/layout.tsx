import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import NextTopLoader from "nextjs-toploader"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

/**
 * Metadata configuration for the entire application.
 * Defines titles, descriptions, and comprehensive favicon/icon sets for various platforms.
 */
export const metadata: Metadata = {
  title: "Storyboard — AI Narrative Architect",
  description:
    "Design high-fidelity storyboards and presentations with precision AI. Orchestrate your vision into stunning narratives at scale with our high-end visual engine.",
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      { url: "/favicon_io/favicon.ico", sizes: "any", type: "image/x-icon" },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
}

/**
 * RootLayout is the top-level layout wrapper for the entire application.
 * It provides essential providers and global components:
 * 1. ThemeProvider: Manages light/dark mode.
 * 2. TooltipProvider: Enables Shadcn/UI tooltips globally.
 * 3. NextTopLoader: Displays a progress bar during navigation.
 * 4. Toaster: Handles application-wide notifications.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head />
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {/* Global navigation progress bar */}
            <NextTopLoader
              showSpinner={false}
              height={3}
              crawl={true}
              speed={200}
              initialPosition={0.08}
            />
            {/* Main content of the application */}
            {children}
            {/* Global toast notification system */}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
