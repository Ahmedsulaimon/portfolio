// src/app/blog/page.tsx
import Link from "next/link";
import { blogPosts } from "@/lib/blog_data";

export default function BlogListPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-16 text-center dark:text-white">Blog</h1>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <div key={post.slug} className="border-b border-gray-200 dark:border-slate-700 pb-6">
            <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 mb-1">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By {post.author} • {post.date}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
