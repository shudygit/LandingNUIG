import { TaskTracker } from "@/components/dashboard/task-tracker"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <p className="text-muted-foreground">Track your progress on essential tasks</p>
      </div>
      <TaskTracker />
    </div>
  )
}
