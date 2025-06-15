import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const routes = [
  { href: "/client-side", label: "Client-Side Fetching", description: "useEffect + fetch" },
  { href: "/ssg", label: "Static Site Generation", description: "Build-time generation" },
  { href: "/ssr", label: "Server-Side Rendering", description: "Request-time rendering" },
  { href: "/isr", label: "Incremental Static Regeneration", description: "Revalidate on interval" },
  { href: "/ppr", label: "Partial Prerendering", description: "Experimental feature" },
]

export function Navigation() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {routes.map((route) => (
        <Card key={route.href} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{route.label}</CardTitle>
            <p className="text-sm text-muted-foreground">{route.description}</p>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={route.href}>View Demo</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
