"use client"

import type React from "react"
import { useState } from "react"

import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { QuickLinks } from "./quick-links"
import { CircularProgress } from "@/components/ui/circular-progress"
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  Globe,
  GraduationCap,
  MessageSquare,
  FileText,
  Landmark,
  CreditCard,
  Home,
  Building,
  Award as IdCard,
  Plus,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Task } from "@/lib/types"

const nationalityLabels = {
  eu: "EU / EEA",
  "non-eu": "Non-EU International",
  usa: "USA",
}

const categoryEmojis: Record<Task["category"], string> = {
  irp: "💼",
  registration: "📝",
  fees: "💳",
  accommodation: "🏠",
  bank: "🏦",
  pps: "🆔",
  other: "📋",
}

const categoryIcons: Record<Task["category"], React.ReactNode> = {
  irp: <span className="text-lg">💼</span>,
  registration: <span className="text-lg">📝</span>,
  fees: <span className="text-lg">💳</span>,
  accommodation: <span className="text-lg">🏠</span>,
  bank: <span className="text-lg">🏦</span>,
  pps: <span className="text-lg">🆔</span>,
  other: <span className="text-lg">📋</span>,
}

const categoryLabels: Record<Task["category"], string> = {
  irp: "IRP",
  registration: "Registration",
  fees: "Fees",
  accommodation: "Accommodation",
  bank: "Bank",
  pps: "PPS",
  other: "Other",
}

const categoryColors: Record<Task["category"], string> = {
  irp: "bg-primary/90 hover:bg-primary text-primary-foreground",
  registration: "bg-accent/80 hover:bg-accent text-accent-foreground",
  fees: "bg-primary/80 hover:bg-primary text-primary-foreground",
  accommodation: "bg-secondary/90 hover:bg-secondary text-secondary-foreground",
  bank: "bg-muted hover:bg-accent text-foreground",
  pps: "bg-primary/70 hover:bg-primary text-primary-foreground",
  other: "bg-secondary/80 hover:bg-secondary text-secondary-foreground",
}

export function DashboardOverview() {
  const { user, tasks, customTasks, discussions, toggleTask, addCustomTask } = useAppStore()
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const allTasks = [...tasks, ...customTasks]
  const completedTasks = allTasks.filter((t) => t.isCompleted)
  const progressPercentage = allTasks.length > 0 ? (completedTasks.length / allTasks.length) * 100 : 0

  const pendingCategories = [...new Set(allTasks.filter((t) => !t.isCompleted).map((t) => t.category))]

  // Check if task is IRP or PPS and show 90 days indicator
  const isTimeSensitiveTask = (task: Task) => {
    return (task.category === "irp" || task.category === "pps") && !task.isCompleted
  }

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addCustomTask({
        title: newTaskTitle.trim(),
        description: "",
        category: "other",
        isCompleted: false,
      })
      setNewTaskTitle("")
      setIsAddingTask(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask()
    } else if (e.key === "Escape") {
      setIsAddingTask(false)
      setNewTaskTitle("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📚</span>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h1>
        </div>
        <p className="mt-1 opacity-90">Here&apos;s your progress at University of Galway</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0 rounded-full">
            <span className="mr-1">🌍</span>
            {nationalityLabels[user?.nationality || "eu"]}
          </Badge>
          <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0 rounded-full">
            <span className="mr-1">🎓</span>
            {user?.degree}
          </Badge>
        </div>
      </div>

      {/* Total Tasks Card - Full Width */}
      <Card className="rounded-3xl">
        <CardHeader className="pb-4 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <CardTitle className="text-2xl">Total Tasks</CardTitle>
                <CardDescription className="text-base">{allTasks.length} tasks in your list</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Small Circular Progress */}
              <CircularProgress value={progressPercentage} size={60} strokeWidth={6} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-3 rounded-2xl p-4 text-base transition-all duration-200 border group",
                  task.isCompleted
                    ? "bg-muted/50 border-muted"
                    : "bg-card hover:bg-primary border-border",
                )}
              >
                <Checkbox
                  checked={task.isCompleted}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="h-5 w-5"
                />
                <span className="text-xl">{categoryEmojis[task.category]}</span>
                <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "font-medium transition-colors duration-200",
                      task.isCompleted
                        ? "line-through text-muted-foreground"
                        : "text-foreground group-hover:text-primary-foreground",
                    )}
                  >
                    {task.title}
                  </span>
                  {isTimeSensitiveTask(task) && (
                    <Badge variant="outline" className="text-xs border-warning/50 text-warning shrink-0 rounded-full">
                      <Clock className="h-3 w-3 mr-1" />
                      90 days after arrival
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            {isAddingTask && (
              <div className="flex items-center gap-3 rounded-2xl p-4 border border-primary bg-card">
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter task title..."
                  className="flex-1 rounded-xl"
                  autoFocus
                />
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingTask(false)
                    setNewTaskTitle("")
                  }}
                  className="px-4 py-2 rounded-xl border hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
            {allTasks.length === 0 && !isAddingTask && (
              <p className="text-center text-muted-foreground py-8 text-lg">No tasks yet. Add one to get started!</p>
            )}
            {/* Add Task Button at Bottom */}
            {!isAddingTask && (
              <button
                onClick={() => setIsAddingTask(true)}
                className="flex items-center justify-center gap-2 w-full rounded-2xl p-4 border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-primary font-medium"
              >
                <Plus className="h-5 w-5" />
                Add New Task
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl">
        <CardHeader className="rounded-t-3xl">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-xl">💬</span>
            Discussions
          </CardTitle>
          <CardDescription>Quick access to topic discussions for your tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Bubble Icons for Task Categories */}
          <div className="flex flex-wrap gap-3 mb-4">
            {pendingCategories.map((category) => (
              <Link
                key={category}
                href={`/dashboard/discussions?category=${category}`}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105",
                  categoryColors[category],
                )}
              >
                {categoryIcons[category]}
                <span>{categoryLabels[category]}</span>
              </Link>
            ))}
            <Link
              href="/dashboard/discussions"
              className="flex items-center gap-2 rounded-full border border-dashed px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>All Discussions</span>
            </Link>
          </div>

          {/* Recent Discussions Preview */}
          <div className="space-y-2">
            {discussions.slice(0, 3).map((discussion) => (
              <Link
                key={discussion.id}
                href={`/dashboard/discussions?id=${discussion.id}`}
                className="flex items-center justify-between rounded-2xl border p-3 hover:bg-primary transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary-foreground/20 transition-colors">
                    <span className="text-base">{categoryEmojis[discussion.category as Task["category"]] || "💬"}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate text-foreground group-hover:text-primary-foreground transition-colors duration-200">
                      {discussion.title}
                    </p>
                    <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/70 transition-colors duration-200">
                      {discussion.replies.length} replies
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0 text-xs rounded-full group-hover:border-primary-foreground/50 group-hover:text-primary-foreground transition-colors">
                  {discussion.category}
                </Badge>
              </Link>
            ))}
            {discussions.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No discussions yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <QuickLinks />
    </div>
  )
}
