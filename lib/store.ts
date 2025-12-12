"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Task, Comment, Discussion, Nationality } from "./types"
import { getTasksForNationality } from "./data"

interface AppState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  isOnboarded: boolean

  // Tasks
  tasks: Task[]
  customTasks: Task[]

  // Social
  comments: Comment[]
  discussions: Discussion[]

  // Actions
  setUser: (user: User | null) => void
  login: (email: string, name: string) => void
  completeOnboarding: (nationality: Nationality, degree: string) => void
  logout: () => void

  toggleTask: (taskId: string) => void
  addCustomTask: (task: Omit<Task, "id" | "isMandatory" | "applicableNationalities">) => void
  deleteCustomTask: (taskId: string) => void

  addComment: (comment: Omit<Comment, "id" | "createdAt" | "likes" | "userId" | "userName" | "userAvatar">) => void
  likeComment: (commentId: string) => void

  addDiscussion: (
    discussion: Omit<Discussion, "id" | "createdAt" | "replies" | "userId" | "userName" | "userAvatar">,
  ) => void
  addReply: (discussionId: string, content: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isOnboarded: false,
      tasks: [],
      customTasks: [],
      comments: [
        {
          id: "1",
          userId: "demo1",
          userName: "Maria Santos",
          content: "The IRP registration process was smoother than expected! Book early morning slots.",
          category: "irp",
          sentiment: "positive",
          createdAt: new Date("2024-01-15"),
          likes: 12,
        },
        {
          id: "2",
          userId: "demo2",
          userName: "James Chen",
          content: "Make sure to bring all original documents for registration. They won't accept copies!",
          category: "registration",
          sentiment: "neutral",
          createdAt: new Date("2024-01-10"),
          likes: 8,
        },
        {
          id: "3",
          userId: "demo3",
          userName: "Emma Wilson",
          content: "Setting up my bank account took only 30 minutes at AIB. Very helpful staff!",
          category: "bank",
          sentiment: "positive",
          createdAt: new Date("2024-01-08"),
          likes: 15,
        },
      ],
      discussions: [
        {
          id: "1",
          userId: "demo1",
          userName: "Maria Santos",
          title: "Best accommodation areas near campus?",
          content:
            "Hi everyone! I'm looking for accommodation recommendations near the university. What areas would you suggest for international students?",
          category: "accommodation",
          createdAt: new Date("2024-01-12"),
          replies: [
            {
              id: "1-1",
              userId: "demo2",
              userName: "James Chen",
              content: "I'd recommend the area around Newcastle or Salthill. Both have good bus connections to campus.",
              createdAt: new Date("2024-01-12"),
            },
          ],
        },
      ],

      setUser: (user) => set({ user }),

      login: (email, name) => {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          nationality: "eu",
          degree: "",
          createdAt: new Date(),
        }
        set({ user, isAuthenticated: true })
      },

      completeOnboarding: (nationality, degree) => {
        const { user } = get()
        if (user) {
          const updatedUser = { ...user, nationality, degree }
          const tasks = getTasksForNationality(nationality)
          set({
            user: updatedUser,
            isOnboarded: true,
            tasks,
          })
        }
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isOnboarded: false,
          tasks: [],
          customTasks: [],
        }),

      toggleTask: (taskId) => {
        const { tasks, customTasks } = get()
        const updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t))
        const updatedCustomTasks = customTasks.map((t) => (t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t))
        set({ tasks: updatedTasks, customTasks: updatedCustomTasks })
      },

      addCustomTask: (task) => {
        const newTask: Task = {
          ...task,
          id: `custom-${Math.random().toString(36).substr(2, 9)}`,
          isMandatory: false,
          applicableNationalities: ["eu", "non-eu", "usa"],
        }
        set((state) => ({ customTasks: [...state.customTasks, newTask] }))
      },

      deleteCustomTask: (taskId) => {
        set((state) => ({
          customTasks: state.customTasks.filter((t) => t.id !== taskId),
        }))
      },

      addComment: (comment) => {
        const { user } = get()
        if (!user) return

        const newComment: Comment = {
          ...comment,
          id: Math.random().toString(36).substr(2, 9),
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          createdAt: new Date(),
          likes: 0,
        }
        set((state) => ({ comments: [newComment, ...state.comments] }))
      },

      likeComment: (commentId) => {
        set((state) => ({
          comments: state.comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c)),
        }))
      },

      addDiscussion: (discussion) => {
        const { user } = get()
        if (!user) return

        const newDiscussion: Discussion = {
          ...discussion,
          id: Math.random().toString(36).substr(2, 9),
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          createdAt: new Date(),
          replies: [],
        }
        set((state) => ({ discussions: [newDiscussion, ...state.discussions] }))
      },

      addReply: (discussionId, content) => {
        const { user } = get()
        if (!user) return

        const reply = {
          id: Math.random().toString(36).substr(2, 9),
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          content,
          createdAt: new Date(),
        }
        set((state) => ({
          discussions: state.discussions.map((d) =>
            d.id === discussionId ? { ...d, replies: [...d.replies, reply] } : d,
          ),
        }))
      },
    }),
    {
      name: "nuig-student-portal",
    },
  ),
)
