import { PrismaClient } from "@prisma/client"
import { nextJSBlogs } from "./blogs.ts"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.blogComment.deleteMany()
  await prisma.blog.deleteMany()

  // Create sample blogs
  const blogs = await prisma.blog.createMany({ data: nextJSBlogs })

  console.log("Database seeded successfully!")
  console.log(`Created ${blogs.length} blogs with comments`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
