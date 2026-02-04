"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard/products")
    } else {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/technical_career_education_logo.jpg"
          alt="Logo"
          width={80}
          height={80}
          className="rounded-lg animate-pulse"
          priority
        />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </main>
  )
}
