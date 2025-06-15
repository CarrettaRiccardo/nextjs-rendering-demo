import { BlogCard } from "@/components/blog-card"
import { RevalidateButton } from "@/components/revalidate-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { revalidateSSG } from "@/lib/actions"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

// Enable static site generation
export const dynamic = "force-static"

// This page will be statically generated at build time
export default async function SSGPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const buildTime = formatDate(new Date())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Static Site Generation (SSG)</h1>
            <p className="text-muted-foreground">Page generated at build time</p>
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
              <li>Page is pre-rendered at build time</li>
              <li>Data is fetched during the build process</li>
              <li>HTML is generated and cached</li>
              <li>Subsequent requests serve the cached HTML</li>
              <li>Perfect for content that doesn't change often</li>
            </ul>
            <p className="mt-4 text-2xl text-muted-foreground">Generated at: {buildTime}</p>
          </CardContent>
        </Card>

        <div className="flex gap-2 mb-6">
          <RevalidateButton action={revalidateSSG} label="Revalidate Page" />
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
