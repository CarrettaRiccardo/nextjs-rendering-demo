import { BlogCard } from "@/components/blog-card"
import { RevalidateButton } from "@/components/revalidate-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { revalidatePPR } from "@/lib/actions"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Suspense } from "react"

// Enable experimental PPR
export const experimental_ppr = true

export default function PPRPage() {
  return (
    <>
      <StaticShell />
      <div className="container mx-auto px-4">
        <Suspense fallback={<BlogsSkeleton />}>
          <DynamicBlogs />
        </Suspense>
      </div>
    </>
  )
}


// Static shell component
function StaticShell() {
  const renderTime = formatDate(new Date())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Partial Prerendering (PPR)</h1>
            <p className="text-muted-foreground">Static shell with dynamic content</p>
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
              <li>Static shell is prerendered at build time</li>
              <li>Dynamic parts are streamed in at request time</li>
              <li>Combines benefits of static and dynamic rendering</li>
              <li>Instant page load with progressive enhancement</li>
              <li>Experimental feature in Next.js 14+</li>
            </ul>
            <p className="mt-4 text-2xl text-muted-foreground">Shell rendered at: {renderTime}</p>
          </CardContent>
        </Card>

        <div className="flex gap-2 mb-6">
          <RevalidateButton action={revalidatePPR} label="Revalidate Page" />
        </div>
      </div>
    </div>
  )
}

// Dynamic content component
async function DynamicBlogs() {
  // Simulate some processing time
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const fetchTime = formatDate(new Date())

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Blogs ({blogs.length})</h2>
        <p className="text-2xl text-muted-foreground">Data fetched at: {fetchTime}</p>
      </div>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

// Loading skeleton
function BlogsSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="mb-4">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}