import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Minguri | Custom URL Shortener",
  description: "Fast and free URL shortener",
  openGraph: {
    title: "Minguri | Custom URL Shortener",
    description: "Fast and free URL shortener",
    siteName: "Minguri",
  },
  twitter: {
    card: "summary",
    title: "Minguri | Custom URL Shortener",
    description: "Fast and free URL shortener",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
