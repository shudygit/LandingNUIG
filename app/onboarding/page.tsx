"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { OnboardingForm } from "@/components/auth/onboarding-form"
import { useAppStore } from "@/lib/store"
import { GraduationCap } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const { isAuthenticated, isOnboarded } = useAppStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (isOnboarded) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isOnboarded, router])

  if (!isAuthenticated) return null

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <OnboardingForm />
      </div>
    </main>
  )
}
