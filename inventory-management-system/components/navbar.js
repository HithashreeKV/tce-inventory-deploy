"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useInventory } from "@/lib/inventory-context"
import { BarChart3, LogOut, Search, Menu, X, Package } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { searchQuery, setSearchQuery } = useInventory()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navLinks = [
    { href: "/dashboard/products", label: "Products", icon: Package },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/dashboard/products" className="flex items-center gap-2">
          <Image
            src="/technical_career_education_logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
            priority
          />
          <span className="font-semibold hidden sm:inline-block">
            Technical Career Education
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="search"
              placeholder="Search products..."
              className="w-64 pl-9 h-9 rounded-md border bg-transparent px-3 py-1 text-sm border-input focus-visible:ring-2 focus-visible:ring-ring"
              style={{ border: "2px solid oklch(24.571% 0.12604 288.685)" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {user.username}
              </span>
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 h-8 px-3 hover:bg-accent hover:text-accent-foreground" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 h-9 w-9 shrink-0 md:hidden hover:bg-accent hover:text-accent-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full pl-9 h-9 rounded-md border bg-transparent px-3 py-1 text-sm border-input focus-visible:ring-2 focus-visible:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {user && (
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  Signed in as {user.username}
                </span>
                <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 h-8 px-3 hover:bg-accent hover:text-accent-foreground" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
