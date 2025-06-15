"use client"

import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Blog } from "@prisma/client"
import { Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ClientSidePage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/blogs")
      if (!response.ok) {
        throw new Error("Failed to fetch blogs")
      }
      const data = await response.json()
      setBlogs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Client-Side Fetching</h1>
            <p className="text-muted-foreground">Data fetched using useEffect and fetch API</p>
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
              <li>Component renders immediately with loading state</li>
              <li>useEffect triggers API call after component mounts</li>
              <li>Data is fetched from /api/blogs endpoint</li>
              <li>Component re-renders with fetched data</li>
              <li>Good for dynamic content that doesn't need SEO</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex gap-2 mb-6">
          <Button onClick={fetchBlogs} disabled={loading} size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mr-2" />
          <span>Loading blogs...</span>
        </div>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Blogs ({blogs.length})</h2>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}
