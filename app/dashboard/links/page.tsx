import { QuickLinks } from "@/components/dashboard/quick-links"

export default function LinksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">University Resources</h1>
        <p className="text-muted-foreground">Quick access to all NUIG services and portals</p>
      </div>
      <QuickLinks />
    </div>
  )
}
