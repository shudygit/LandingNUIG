"use client"

import type React from "react"

import { quickLinks } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  GraduationCap,
  ClipboardCheck,
  Globe,
  CreditCard,
  Briefcase,
  Users,
  BookOpen,
  Home,
  ExternalLink,
} from "lucide-react"

const emojiMap: Record<string, string> = {
  GraduationCap: "🎓",
  ClipboardCheck: "📋",
  Globe: "🌍",
  CreditCard: "💳",
  Briefcase: "💼",
  Users: "👥",
  BookOpen: "📖",
  Home: "🏠",
}

export function QuickLinks() {
  return (
    <Card className="rounded-3xl">
      <CardHeader className="rounded-t-3xl">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-xl">🔗</span>
          University Resources
        </CardTitle>
        <CardDescription>Quick access to important NUIG services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => {
            const emoji = emojiMap[link.icon] || "🔗"
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-2xl border p-4 transition-all duration-200 hover:bg-primary hover:border-primary"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary-foreground/20 transition-colors">
                  <span className="text-xl">{emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-foreground group-hover:text-primary-foreground transition-colors duration-200">
                      {link.title}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary-foreground transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70 transition-colors duration-200 line-clamp-2">
                    {link.description}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
