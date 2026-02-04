"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { InventoryProvider } from "@/lib/inventory-context"
import { Navbar } from "@/components/navbar"

export default function DashboardLayout({ children }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <Image
            src="/technical_career_education_logo.jpg"
            alt="Technical Career Education Logo"
            width={80}
            height={80}
            className="rounded-lg animate-pulse shadow-lg"
            priority
          />
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-muted rounded w-24 mx-auto"></div>
            <p className="text-sm text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <InventoryProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </InventoryProvider>
  )
}
