"use client"

import React, { useState } from "react"
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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]",
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

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm",
        className
      )}
      style={{ border: "2px solid oklch(24.571% 0.12604 288.685)" }}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }) => (
  <div className={cn("px-6 text-center", className)} {...props} />
)

const CardTitle = ({ className, ...props }) => (
  <h2 className={cn("text-2xl font-bold", className)} {...props} />
)

const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

const CardContent = ({ className, ...props }) => (
  <div className={cn("px-6 space-y-4", className)} {...props} />
)

const CardFooter = ({ className, ...props }) => (
  <div className={cn("px-6 flex flex-col gap-4", className)} {...props} />
)

export function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { register, error: authError } = useAuth()
  const router = useRouter()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const success = await register(
        formData.username,
        formData.email,
        formData.password
      )

      if (success) {
        router.push("/login")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
         style={{
           backgroundImage: "url('/background_image.jpg')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           backgroundAttachment: 'fixed'
         }}>
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/40"></div>
      
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      
      <div className="relative z-10 w-full max-w-md group">
        
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-1000 -z-10"></div>
        
        <Card className="shadow-2xl border border-primary/40 bg-background/85 backdrop-blur-xl hover:shadow-3xl transition-all duration-500 ease-out relative overflow-hidden"
              style={{
                boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
                animation: 'slideUp 0.6s ease-out'
              }}>
          
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
          
        <CardHeader>
          <Image
            src="/technical_career_education_logo.jpg"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto rounded-lg"
          />
          <CardTitle style={{ color: "oklch(24.571% 0.12604 288.685)" }}>
            Create Account
          </CardTitle>
          <CardDescription>
            Register for inventory management access
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            {(error || authError) && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error || authError}
              </div>
            )}

            <Label>Username</Label>
            <Input name="username" onChange={handleChange} />

            <Label>Email</Label>
            <Input type="email" name="email" onChange={handleChange} />

            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-0 top-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>

            <Label>Confirm Password</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-0 top-0"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
      </div>
    </div>
  )
}
