"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageCircle, AlertTriangle, ThumbsUp, ThumbsDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Task, Comment } from "@/lib/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const categoryLabels: Record<Task["category"], string> = {
  irp: "IRP Registration",
  registration: "University Registration",
  fees: "Fees & Payment",
  accommodation: "Accommodation",
  bank: "Banking",
  pps: "PPS Number",
  other: "General",
}

const sentimentIcons = {
  positive: { icon: ThumbsUp, color: "text-success" },
  neutral: { icon: Minus, color: "text-muted-foreground" },
  negative: { icon: ThumbsDown, color: "text-destructive" },
}

// Simple sentiment analysis (mock)
function analyzeSentiment(text: string): Comment["sentiment"] {
  const positiveWords = [
    "great",
    "easy",
    "helpful",
    "smooth",
    "quick",
    "excellent",
    "good",
    "amazing",
    "wonderful",
    "fantastic",
  ]
  const negativeWords = [
    "difficult",
    "hard",
    "frustrating",
    "slow",
    "confusing",
    "terrible",
    "bad",
    "awful",
    "horrible",
    "worst",
  ]

  const lowerText = text.toLowerCase()
  const positiveCount = positiveWords.filter((w) => lowerText.includes(w)).length
  const negativeCount = negativeWords.filter((w) => lowerText.includes(w)).length

  if (positiveCount > negativeCount) return "positive"
  if (negativeCount > positiveCount) return "negative"
  return "neutral"
}

export function SocialFeed() {
  const { comments, addComment, likeComment } = useAppStore()
  const [newComment, setNewComment] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Task["category"]>("other")
  const [filterCategory, setFilterCategory] = useState<Task["category"] | "all">("all")
  const [showWarning, setShowWarning] = useState(false)
  const [pendingComment, setPendingComment] = useState<{ content: string; sentiment: Comment["sentiment"] } | null>(
    null,
  )

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const sentiment = analyzeSentiment(newComment)

    if (sentiment === "negative") {
      setPendingComment({ content: newComment, sentiment })
      setShowWarning(true)
      return
    }

    submitComment(newComment, sentiment)
  }

  const submitComment = (content: string, sentiment: Comment["sentiment"]) => {
    addComment({
      content,
      category: selectedCategory,
      sentiment,
    })
    setNewComment("")
    setPendingComment(null)
    setShowWarning(false)
  }

  const filteredComments = filterCategory === "all" ? comments : comments.filter((c) => c.category === filterCategory)

  return (
    <div className="space-y-6">
      {/* Warning Modal */}
      {showWarning && pendingComment && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Sentiment Warning</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>
              Your comment appears to have a negative tone. This feedback will still be shared to help other students.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowWarning(false)
                  setPendingComment(null)
                }}
              >
                Edit Comment
              </Button>
              <Button size="sm" onClick={() => submitComment(pendingComment.content, pendingComment.sentiment)}>
                Post Anyway
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* New Comment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Share Your Experience</CardTitle>
          <CardDescription>Help other students with tips and insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Share a tip or experience about settling in at NUIG..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-24"
          />
          <div className="flex items-center justify-between gap-4">
            <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as Task["category"])}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter by:</span>
        <Select value={filterCategory} onValueChange={(v) => setFilterCategory(v as Task["category"] | "all")}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => {
          const SentimentIcon = sentimentIcons[comment.sentiment].icon
          return (
            <Card key={comment.id}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {comment.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{comment.userName}</span>
                      <Badge variant="outline" className="text-xs">
                        {categoryLabels[comment.category]}
                      </Badge>
                      <SentimentIcon className={cn("h-4 w-4", sentimentIcons[comment.sentiment].color)} />
                    </div>
                    <p className="mt-1 text-foreground">{comment.content}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => likeComment(comment.id)}>
                        <Heart className="mr-1 h-4 w-4" />
                        {comment.likes}
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {filteredComments.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <MessageCircle className="mx-auto h-12 w-12 mb-2 opacity-50" />
              <p>No experiences shared yet. Be the first!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
