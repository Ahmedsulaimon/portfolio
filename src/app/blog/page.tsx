// src/app/blog/page.tsx
import Link from "next/link";
import { blogPosts } from "@/lib/blog_data";

export default function BlogListPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-16 text-center">Blog</h1>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <div key={post.slug} className="border-b pb-4">
            <h2 className="text-2xl font-medium  text-gray-800">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500">
              By {post.author} • {post.date}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
