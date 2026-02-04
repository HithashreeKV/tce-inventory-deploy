import React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Inventory Management System",
  description:
    "Manage your inventory with ease - track products, borrow records, and analytics",
  icons: {
    icon: "/technical_career_education_logo.jpg",
    apple: "/technical_career_education_logo.jpg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

