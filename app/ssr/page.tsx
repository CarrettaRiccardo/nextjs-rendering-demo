import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

// Force dynamic rendering
export const dynamic = "force-dynamic"

export default async function SSRPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const renderTime = formatDate(new Date())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Server-Side Rendering (SSR)</h1>
            <p className="text-muted-foreground">Page rendered on each request</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">How it works:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Page is rendered on the server for each request</li>
              <li>Data is fetched fresh on every request</li>
              <li>HTML is generated and sent to the client</li>
              <li>Always shows the latest data</li>
              <li>Good for frequently changing content</li>
            </ul>
            <p className="mt-4 text-2xl text-muted-foreground">Rendered at: {renderTime}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Blogs ({blogs.length})</h2>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}
