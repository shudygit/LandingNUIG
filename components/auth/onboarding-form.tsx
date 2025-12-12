"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import { degrees } from "@/lib/data"
import type { Nationality } from "@/lib/types"
import { Globe, BookOpen, ArrowRight } from "lucide-react"

export function OnboardingForm() {
  const [nationality, setNationality] = useState<Nationality | "">("")
  const [degree, setDegree] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { completeOnboarding, user } = useAppStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!nationality) {
      setError("Please select your nationality type")
      return
    }

    if (!degree) {
      setError("Please select your degree programme")
      return
    }

    completeOnboarding(nationality as Nationality, degree)
    router.push("/dashboard")
  }

  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-foreground">Welcome, {user?.name?.split(" ")[0]}!</CardTitle>
        <CardDescription className="text-muted-foreground">Let&apos;s personalize your experience</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Nationality Type
            </Label>
            <Select value={nationality} onValueChange={(v) => setNationality(v as Nationality)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your nationality type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eu">EU / EEA Citizen</SelectItem>
                <SelectItem value="non-eu">Non-EU International</SelectItem>
                <SelectItem value="usa">USA Citizen</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">This helps us show you relevant tasks and requirements</p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Degree Programme
            </Label>
            <Select value={degree} onValueChange={setDegree}>
              <SelectTrigger>
                <SelectValue placeholder="Select your degree" />
              </SelectTrigger>
              <SelectContent>
                {degrees.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
