export type Nationality = "eu" | "non-eu" | "usa"

export interface User {
  id: string
  email: string
  name: string
  nationality: Nationality
  degree: string
  avatar?: string
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  description: string
  category: "irp" | "registration" | "fees" | "accommodation" | "bank" | "pps" | "other"
  isMandatory: boolean
  isCompleted: boolean
  applicableNationalities: Nationality[]
  link?: string
  dueDate?: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  category: Task["category"]
  sentiment: "positive" | "neutral" | "negative"
  createdAt: Date
  likes: number
}

export interface Discussion {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  title: string
  content: string
  category: string
  createdAt: Date
  replies: DiscussionReply[]
}

export interface DiscussionReply {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: Date
}

export interface QuickLink {
  id: string
  title: string
  description: string
  url: string
  icon: string
}
