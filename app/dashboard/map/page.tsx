import { CampusMap } from "@/components/dashboard/campus-map"

export default function MapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Campus Map</h1>
        <p className="text-muted-foreground">Find your way around University of Galway</p>
      </div>
      <CampusMap />
    </div>
  )
}
