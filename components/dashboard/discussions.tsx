"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import {
  MessageSquare,
  Send,
  Plus,
  ChevronDown,
  ChevronUp,
  FileText,
  Landmark,
  CreditCard,
  Home,
  Building,
  Award as IdCard,
  Circle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import type { Task } from "@/lib/types"

const categoryIcons: Record<Task["category"], React.ReactNode> = {
  irp: <IdCard className="h-4 w-4" />,
  registration: <FileText className="h-4 w-4" />,
  fees: <CreditCard className="h-4 w-4" />,
  accommodation: <Home className="h-4 w-4" />,
  bank: <Landmark className="h-4 w-4" />,
  pps: <Building className="h-4 w-4" />,
  other: <Circle className="h-4 w-4" />,
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
  irp: "bg-chart-1",
  registration: "bg-chart-2",
  fees: "bg-chart-3",
  accommodation: "bg-chart-4",
  bank: "bg-chart-5",
  pps: "bg-primary",
  other: "bg-muted-foreground",
}

const allCategories: Task["category"][] = ["irp", "registration", "fees", "accommodation", "bank", "pps", "other"]

export function Discussions() {
  const searchParams = useSearchParams()
  const { discussions, addDiscussion, addReply } = useAppStore()
  const [isCreating, setIsCreating] = useState(false)
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "", category: "" })
  const [replyContent, setReplyContent] = useState<Record<string, string>>({})
  const [openDiscussions, setOpenDiscussions] = useState<Record<string, boolean>>({})
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  const handleCreateDiscussion = () => {
    if (newDiscussion.title.trim() && newDiscussion.content.trim()) {
      addDiscussion({
        title: newDiscussion.title,
        content: newDiscussion.content,
        category: newDiscussion.category || "General",
      })
      setNewDiscussion({ title: "", content: "", category: "" })
      setIsCreating(false)
    }
  }

  const handleReply = (discussionId: string) => {
    const content = replyContent[discussionId]
    if (content?.trim()) {
      addReply(discussionId, content)
      setReplyContent({ ...replyContent, [discussionId]: "" })
    }
  }

  const toggleDiscussion = (id: string) => {
    setOpenDiscussions((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredDiscussions = selectedCategory
    ? discussions.filter((d) => d.category.toLowerCase() === selectedCategory.toLowerCase())
    : discussions

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Discussion Forum</h2>
          <p className="text-sm text-muted-foreground">Ask questions and help fellow students</p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start a Discussion</DialogTitle>
              <DialogDescription>Ask a question or share information with other students</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="What's your question?"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  placeholder="e.g., Accommodation, Visa, Academics"
                  value={newDiscussion.category}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Details</Label>
                <Textarea
                  placeholder="Provide more context..."
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                  className="min-h-32"
                />
              </div>
              <Button onClick={handleCreateDiscussion} className="w-full">
                Post Discussion
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          <MessageSquare className="h-4 w-4" />
          All
        </button>
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
              selectedCategory === category
                ? cn(categoryColors[category], "text-white")
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            {categoryIcons[category]}
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <Card key={discussion.id}>
            <Collapsible open={openDiscussions[discussion.id]} onOpenChange={() => toggleDiscussion(discussion.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {discussion.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CollapsibleTrigger className="flex items-start justify-between w-full text-left">
                      <div>
                        <h3 className="font-semibold hover:text-primary transition-colors">{discussion.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{discussion.userName}</span>
                          <span className="text-muted-foreground">·</span>
                          <Badge variant="outline" className="text-xs">
                            {discussion.category}
                          </Badge>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(discussion.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          {discussion.replies.length}
                        </Badge>
                        {openDiscussions[discussion.id] ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </CardHeader>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-foreground mb-4 pl-13">{discussion.content}</p>

                  {/* Replies */}
                  {discussion.replies.length > 0 && (
                    <div className="border-t pt-4 space-y-4">
                      {discussion.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3 pl-4 border-l-2 border-muted">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                              {reply.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{reply.userName}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-foreground mt-1">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Input
                      placeholder="Write a reply..."
                      value={replyContent[discussion.id] || ""}
                      onChange={(e) =>
                        setReplyContent({
                          ...replyContent,
                          [discussion.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleReply(discussion.id)
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      onClick={() => handleReply(discussion.id)}
                      disabled={!replyContent[discussion.id]?.trim()}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send reply</span>
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}

        {filteredDiscussions.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <MessageSquare className="mx-auto h-12 w-12 mb-2 opacity-50" />
              <p>
                {selectedCategory
                  ? `No discussions in ${categoryLabels[selectedCategory as Task["category"]] || selectedCategory} yet.`
                  : "No discussions yet. Start the conversation!"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
