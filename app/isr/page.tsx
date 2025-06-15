import { BlogCard } from "@/components/blog-card"
import { RevalidateButton } from "@/components/revalidate-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { revalidateISR } from "@/lib/actions"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

// Revalidate every 60 seconds
export const revalidate = 60

export default async function ISRPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const generateTime = formatDate(new Date())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Incremental Static Regeneration (ISR)</h1>
            <p className="text-muted-foreground">Static page with periodic revalidation</p>
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
              <li>Page is statically generated like SSG</li>
              <li>Automatically revalidates every 60 seconds</li>
              <li>First request after revalidation triggers regeneration</li>
              <li>Stale content served while regenerating in background</li>
              <li>Best of both worlds: fast serving + fresh content</li>
            </ul>
            <p className="mt-4 text-2xl text-muted-foreground">Generated at: {generateTime}</p>
          </CardContent>
        </Card>

        <div className="flex gap-2 mb-6">
          <RevalidateButton action={revalidateISR} label="Force Revalidate" />
        </div>
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
