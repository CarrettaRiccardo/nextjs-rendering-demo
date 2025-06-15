import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Database, Zap, Globe, RefreshCw, Layers } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Next.js Rendering Methods Demo</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Explore different data fetching and rendering patterns in Next.js with Prisma
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Zap className="w-8 h-8 mb-2 text-blue-500" />
              <span className="text-sm font-medium">Client-Side</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Globe className="w-8 h-8 mb-2 text-green-500" />
              <span className="text-sm font-medium">SSG</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Database className="w-8 h-8 mb-2 text-purple-500" />
              <span className="text-sm font-medium">SSR</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <RefreshCw className="w-8 h-8 mb-2 text-orange-500" />
              <span className="text-sm font-medium">ISR</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Layers className="w-8 h-8 mb-2 text-red-500" />
              <span className="text-sm font-medium">PPR</span>
            </CardContent>
          </Card>
        </div>
      </div>

      <Navigation />

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Setup Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Run the database seed script to populate sample data</li>
          <li>Navigate through different demo pages to see rendering methods</li>
          <li>Use revalidate buttons to see cache invalidation in action</li>
          <li>Check browser network tab and server logs to understand the differences</li>
        </ol>
      </div>
    </div>
  )
}
