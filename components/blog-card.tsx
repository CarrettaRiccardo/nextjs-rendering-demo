import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Blog } from "@prisma/client"
import { Calendar, User } from "lucide-react"

interface BlogCardProps {
  blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="mb-4 bg-secondary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{blog.title}</CardTitle>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {blog.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{blog.content}</p>
      </CardContent>
    </Card>
  )
}
