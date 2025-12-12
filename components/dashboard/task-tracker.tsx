"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, ExternalLink, Trash2, Lock, CheckCircle2, Circle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Task } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const categoryColors: Record<Task["category"], string> = {
  irp: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  registration: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  fees: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  accommodation: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  bank: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  pps: "bg-primary/10 text-primary border-primary/20",
  other: "bg-muted text-muted-foreground border-border",
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

export function TaskTracker() {
  const { tasks, customTasks, toggleTask, addCustomTask, deleteCustomTask } = useAppStore()
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "other" as Task["category"],
    link: "",
  })

  const allTasks = [...tasks, ...customTasks]
  const completedCount = allTasks.filter((t) => t.isCompleted).length
  const totalCount = allTasks.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addCustomTask({
        ...newTask,
        isCompleted: false,
      })
      setNewTask({ title: "", description: "", category: "other", link: "" })
      setIsAddingTask(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Progress</CardTitle>
          <CardDescription>
            {completedCount} of {totalCount} tasks completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3" />
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">{completedCount} Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{totalCount - completedCount} Remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Tasks</CardTitle>
            <CardDescription>Your personalized checklist</CardDescription>
          </div>
          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custom Task</DialogTitle>
                <DialogDescription>Create a personal task to track</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newTask.category}
                    onValueChange={(v) => setNewTask({ ...newTask, category: v as Task["category"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Link (optional)</Label>
                  <Input
                    placeholder="https://..."
                    value={newTask.link}
                    onChange={(e) => setNewTask({ ...newTask, link: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddTask} className="w-full">
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 transition-colors",
                  task.isCompleted ? "bg-muted/50" : "bg-card",
                )}
              >
                <Checkbox checked={task.isCompleted} onCheckedChange={() => toggleTask(task.id)} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("font-medium", task.isCompleted && "line-through text-muted-foreground")}>
                      {task.title}
                    </span>
                    <Badge variant="outline" className={cn("text-xs", categoryColors[task.category])}>
                      {categoryLabels[task.category]}
                    </Badge>
                    {task.isMandatory && (
                      <Badge variant="secondary" className="text-xs">
                        <Lock className="mr-1 h-3 w-3" />
                        Required
                      </Badge>
                    )}
                  </div>
                  {task.description && (
                    <p className={cn("mt-1 text-sm text-muted-foreground", task.isCompleted && "line-through")}>
                      {task.description}
                    </p>
                  )}
                  {task.dueDate && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-warning">
                      <AlertCircle className="h-3 w-3" />
                      {task.dueDate}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {task.link && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={task.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open link</span>
                      </a>
                    </Button>
                  )}
                  {!task.isMandatory && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteCustomTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete task</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {allTasks.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                <CheckCircle2 className="mx-auto h-12 w-12 mb-2 opacity-50" />
                <p>No tasks yet. Add your first task!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
