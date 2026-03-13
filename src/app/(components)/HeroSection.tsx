'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const roles = [
  'Full Stack Developer',
  'Backend Engineer',
  'Problem Solver',
  'API Architect',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Available for full-time opportunities
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
            Hi, I&apos;m Ahmed Sulaimon
          </h1>
          <div className="h-10 mb-4">
            <span
              className={`text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 transition-opacity duration-300 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {roles[roleIndex]}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0 mb-8">
            I build scalable APIs, full-stack products, and developer tooling. Currently a Junior Software Engineer at{' '}
            <span className="font-semibold text-gray-800 dark:text-gray-200">Scrapays</span>, seeking a full-time role in backend or full-stack engineering.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
            <Link
              href="/projects"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition shadow-md"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            >
              Get in Touch
            </Link>
          </div>

          {/* Social links */}
          <div className="flex gap-5 justify-center md:justify-start text-gray-500 dark:text-gray-400">
            <a
              href="https://github.com/Ahmedsulaimon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FaGithub size={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-sulaimon-8260112b0/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FaLinkedin size={26} />
            </a>
            <a
              href="mailto:Sulaimonahmed08@gmail.com"
              aria-label="Email"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <MdEmail size={28} />
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800 shadow-xl">
            <Image
              src="/images/selfie.png"
              alt="Ahmed Sulaimon"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
