"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink, Navigation } from "lucide-react"

const locations = [
  { name: "Main Campus", coords: "53.2786,-9.0591", type: "Campus" },
  { name: "James Hardiman Library", coords: "53.2782,-9.0612", type: "Library" },
  { name: "Student Services", coords: "53.2779,-9.0588", type: "Services" },
  { name: "Áras na Mac Léinn (Student Union)", coords: "53.2773,-9.0595", type: "Student Life" },
  { name: "Sports Centre", coords: "53.2795,-9.0555", type: "Sports" },
  { name: "Engineering Building", coords: "53.2799,-9.0577", type: "Academic" },
  { name: "Arts/Science Building", coords: "53.2775,-9.0605", type: "Academic" },
  { name: "Bailey Allen Hall", coords: "53.2770,-9.0590", type: "Events" },
]

export function CampusMap() {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2385.8!2d-9.0612!3d53.2786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b96f5d7c51c07%3A0x8e3a3b3b3b3b3b3b!2sUniversity%20of%20Galway!5e0!3m2!1sen!2sie!4v1704067200000!5m2!1sen!2sie`

  return (
    <div className="space-y-6">
      {/* Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            University of Galway Campus
          </CardTitle>
          <CardDescription>Interactive map of the campus and key locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full rounded-lg overflow-hidden border">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="University of Galway Campus Map"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button asChild>
              <a
                href="https://www.google.com/maps/place/University+of+Galway"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in Google Maps
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=University+of+Galway"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Locations</CardTitle>
          <CardDescription>Important places on campus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {locations.map((location) => (
              <a
                key={location.name}
                href={`https://www.google.com/maps/search/?api=1&query=${location.coords}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{location.name}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {location.type}
                  </Badge>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
