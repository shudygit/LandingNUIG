import { LoginForm } from "@/components/auth/login-form"
import { GraduationCap, MapPin, Users, CheckSquare } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Panel - Branding */}
        <div className="relative flex flex-1 flex-col justify-between bg-primary p-8 lg:p-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-foreground">NUIG Student Portal</h1>
                <p className="text-sm text-primary-foreground/80">University of Galway</p>
              </div>
            </div>
          </div>

          <div className="my-12 lg:my-0">
            <h2 className="text-3xl font-bold text-primary-foreground lg:text-4xl text-balance">
              Your Complete Guide to Student Life in Galway
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Track tasks, connect with students, and access all university resources in one place.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-primary-foreground/10 p-4">
                <CheckSquare className="h-8 w-8 text-primary-foreground" />
                <h3 className="mt-2 font-semibold text-primary-foreground">Task Tracker</h3>
                <p className="text-sm text-primary-foreground/70">Personalized checklist based on your nationality</p>
              </div>
              <div className="rounded-xl bg-primary-foreground/10 p-4">
                <Users className="h-8 w-8 text-primary-foreground" />
                <h3 className="mt-2 font-semibold text-primary-foreground">Student Community</h3>
                <p className="text-sm text-primary-foreground/70">Connect and share experiences with fellow students</p>
              </div>
              <div className="rounded-xl bg-primary-foreground/10 p-4">
                <MapPin className="h-8 w-8 text-primary-foreground" />
                <h3 className="mt-2 font-semibold text-primary-foreground">Campus Map</h3>
                <p className="text-sm text-primary-foreground/70">Navigate the campus with integrated maps</p>
              </div>
              <div className="rounded-xl bg-primary-foreground/10 p-4">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
                <h3 className="mt-2 font-semibold text-primary-foreground">Quick Links</h3>
                <p className="text-sm text-primary-foreground/70">All university resources at your fingertips</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} University of Galway Student Portal
          </p>
        </div>

        {/* Right Panel - Login */}
        <div className="flex flex-1 items-center justify-center p-8 lg:p-12">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
