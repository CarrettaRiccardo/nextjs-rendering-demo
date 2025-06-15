import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { setTimeout } from "timers/promises"

export async function GET() {
  try {
    await setTimeout(2000) // Simulate a delay

    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}
