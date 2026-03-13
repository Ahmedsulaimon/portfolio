import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Ahmed Codes</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            © {new Date().getFullYear()} Ahmed Sulaimon. All rights reserved.
          </p>
        </div>

        {/* Quick nav */}
        <nav className="flex gap-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link>
          <Link href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Projects</Link>
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Blog</Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</Link>
        </nav>

        {/* Social icons */}
        <div className="flex gap-4 text-gray-600 dark:text-gray-400">
          <a
            href="https://github.com/Ahmedsulaimon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-sulaimon-8260112b0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href="mailto:Sulaimonahmed08@gmail.com"
            aria-label="Email"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <MdEmail size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}
