"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-sm font-medium leading-none peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function Card({ className, style, ...props }) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm",
        className
      )}
      style={{
        border: "2px solid oklch(24.571% 0.12604 288.685)",
        ...style,
      }}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn(
        "px-6 text-center flex flex-col items-center justify-center",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }) {
  return <h3 className={cn("font-semibold", className)} {...props} />
}

function CardDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

function CardContent({ className, ...props }) {
  return <div className={cn("px-6", className)} {...props} />
}

function CardFooter({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-4 px-6", className)} {...props} />
  )
}

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login, error: authError } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const success = await login(email, password)

      if (success) {
        router.push("/dashboard/products")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{
          backgroundImage: "url('/background_image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/40" />

        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full filter blur-3xl opacity-20 animate-pulse" />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/3 left-1/4 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl opacity-15 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        
        <div className="relative z-10 w-full max-w-md group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-1000 -z-10" />

          <Card
            className="shadow-2xl border border-primary/40 bg-background/85 backdrop-blur-xl hover:shadow-3xl transition-all duration-500 ease-out relative overflow-hidden"
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(99, 102, 241, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
              animation: "slideUp 0.6s ease-out",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

            <CardHeader>
              <div className="mx-auto mb-4">
                <Image
                  src="/technical_career_education_logo.jpg"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="rounded-lg"
                  priority
                />
              </div>
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: "oklch(24.571% 0.12604 288.685)" }}
              >
                Welcome Back
              </CardTitle>
              <CardDescription>
                Sign in to your inventory management account
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {(error || authError) && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error || authError}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <p className="text-sm text-muted-foreground text-center color-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        input:focus {
          animation: focusGlow 0.3s ease-out;
        }

        @keyframes focusGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.1);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }
      `}</style>
    </>
  )
}
