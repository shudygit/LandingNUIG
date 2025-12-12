"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import {
  LayoutDashboard,
  CheckSquare,
  MessageCircle,
  HelpCircle,
  Map,
  LinkIcon,
  LogOut,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navigation = [
  { name: "Dashboard", href: "/dashboard", emoji: "📊" },
  { name: "My Tasks", href: "/dashboard/tasks", emoji: "✅" },
  { name: "Social", href: "/dashboard/social", emoji: "👥" },
  { name: "Discussions", href: "/dashboard/discussions", emoji: "💬" },
  { name: "Campus Map", href: "/dashboard/map", emoji: "🗺️" },
  { name: "Quick Links", href: "/dashboard/links", emoji: "🔗" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAppStore()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar rounded-r-lg lg:rounded-r-xl shadow-lg">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <span className="text-xl">📚</span>
        </div>
        <div>
          <h1 className="text-sm font-bold text-sidebar-foreground">NUIG Portal</h1>
          <p className="text-xs text-muted-foreground">University of Galway</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex flex-col space-y-1 p-4 shrink-0">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <span className="text-lg">{item.emoji}</span>
                {item.name}
              </Link>
            )
          })}
        </div>
        {/* Accordion will be placed here and will fill remaining space */}
        <div className="flex-1 min-h-0 overflow-hidden px-4 pb-4 flex flex-col">
          {/* Place your Accordion component here with className="flex-1" */}
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.degree}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent rounded-xl" onClick={handleLogout}>
          <span className="mr-2">🚪</span>
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
