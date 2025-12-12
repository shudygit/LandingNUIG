"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppStore } from "@/lib/store"
import { Mail, GraduationCap } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { login, isOnboarded } = useAppStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate University of Galway email
    if (!email.endsWith("@universityofgalway.ie") && !email.endsWith("@nuigalway.ie")) {
      setError("Please use your University of Galway email address")
      return
    }

    if (!name.trim()) {
      setError("Please enter your name")
      return
    }

    login(email, name)

    if (isOnboarded) {
      router.push("/dashboard")
    } else {
      router.push("/onboarding")
    }
  }

  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">Welcome to NUIG Portal</CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in with your University of Galway email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
              />
              <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">University Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="student@universityofgalway.ie"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardContent>
    </Card>
  )
}
