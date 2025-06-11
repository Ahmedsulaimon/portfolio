'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">
           <Link href="/">Ahmed Codes</Link>
        </h1>
      <nav className="space-x-6 text-gray-700 font-medium">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Blog</Link>
        <Link
          href="/cv/certificate_vitae.pdf"
          download
          className="hover:text-blue-500 transition"
        >
          Resume
        </Link>
      </nav>
    </header>
  );
}
