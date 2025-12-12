import { SocialFeed } from "@/components/dashboard/social-feed"

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Student Experiences</h1>
        <p className="text-muted-foreground">Read and share experiences with fellow students</p>
      </div>
      <SocialFeed />
    </div>
  )
}
