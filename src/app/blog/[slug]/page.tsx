// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog_data"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Await the params promise to get your slug
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return notFound()

  return (
    <main className=" text-gray-900 max-w-3xl mx-auto px-6 py-16">
      <article className="prose prose-lg prose-neutral max-w-none">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          By {post.author} • {post.date}
        </p>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  )
}
