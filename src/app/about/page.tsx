import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Ahmed Sulaimon",
  description: "Junior Software Engineer at Scrapays. 1st Class Honours graduate from Sheffield Hallam University. Seeking full-time backend and full-stack roles.",
};

const experience = [
  {
    role: "Junior Software Engineer",
    company: "Scrapays — Recycling Tech Startup",
    dates: "Feb 2026 – Present",
    bullets: [
      "Built a material acceptance system using NestJS, GraphQL, and React (TypeScript), allowing processors to approve or reject materials and automatically recalculate supply weights.",
      "Worked closely with a senior engineer to translate product requirements into production code, discussing design trade-offs and implementation details.",
      "Contributed to features used in live operational workflows, focusing on clean, maintainable code and reliable APIs.",
    ],
  },
  {
    role: "Junior Software Instructor & Student Mentor",
    company: "Sheffield Hallam University",
    dates: "Jan 2025 – May 2025",
    bullets: [
      "Mentored 40+ students on API development, Git workflows, and collaborative engineering practices.",
      "Reviewed student code, providing clear, constructive feedback to improve correctness and readability.",
      "Communicated technical concepts clearly to both technical and non-technical audiences.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Scrapays — Recycling Tech Startup",
    dates: "Jun 2024 – Aug 2024",
    bullets: [
      "Delivered 7+ full-stack features using TypeScript, React, and Node.js that supported live operational workflows.",
      "Built and maintained Docker-based development and CI/CD pipelines, improving release reliability.",
      "Collaborated closely with product, design, and engineering to translate business requirements into technical solutions.",
    ],
  },
];

const skillGroups = [
  {
    label: "Frontend",
    color: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
  },
  {
    label: "Backend",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    skills: ["FastAPI", "NestJS", "Express", "GraphQL", "REST APIs", "Python", "Node.js"],
  },
  {
    label: "Data & Databases",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    skills: ["PostgreSQL", "SQL", "JSONB", "Zod", "Data Pipelines"],
  },
  {
    label: "DevOps & Tooling",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
    skills: ["Docker", "GitHub Actions", "CI/CD", "Unit & Integration Testing", "Logging"],
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-8 py-20 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">About Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Software Engineer · Backend & Full-Stack · London, UK
        </p>
      </section>

      {/* Profile Summary */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10 mb-20">
        <div className="md:w-2/3">
          <p className="text-lg mb-5">
            I&apos;m <strong>Ahmed Sulaimon</strong>, a Junior Software Engineer at{" "}
            <strong>Scrapays</strong> and a 1st Class Honours graduate in Software Engineering from Sheffield Hallam University.
          </p>
          <p className="text-lg mb-5">
            I build production-ready APIs, full-stack applications, and developer tooling — from real-time freight trackers to AI-powered PR review systems. I care deeply about clean code, reliable systems, and software that solves real problems.
          </p>
          <p className="text-lg">
            I&apos;m currently seeking a <strong>full-time backend or full-stack engineering role</strong>. If you&apos;re hiring or want to collaborate, I&apos;d love to hear from you.
          </p>
        </div>

        <div className="md:w-1/3 w-full flex justify-center">
          <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800 shadow-lg">
            <Image
              src="/images/selfie.png"
              alt="Ahmed Sulaimon"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 dark:text-white">Experience</h2>
        <div className="relative border-l-2 border-blue-200 dark:border-blue-800 pl-8 space-y-10">
          {experience.map((job) => (
            <div key={job.role + job.dates} className="relative">
              {/* dot */}
              <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 border-2 border-white dark:border-slate-900" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">{job.role}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{job.company}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">{job.dates}</span>
              </div>
              <ul className="list-disc list-outside ml-4 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Education */}
          <div className="relative">
            <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-slate-900" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">BEng Software Engineering — 1st Class Honours</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">Sheffield Hallam University</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">Sep 2022 – May 2025</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Relevant modules: Machine Learning, Software Architecture, Data Science, Web Technologies, Databases
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Skills & Tools</h2>
        <div className="space-y-5">
          {skillGroups.map(({ label, color, skills }) => (
            <div key={label}>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className={`px-3 py-1.5 rounded-full text-sm font-medium ${color}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What drives me */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">What Drives Me</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          I thrive in environments where innovation meets purpose. Whether it&apos;s leading a team using agile methods, presenting to stakeholders, or optimising system performance — I bring ownership and curiosity to everything I work on.
        </p>
      </section>

      {/* CTAs */}
      <section className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Get in Touch
        </Link>
        <a
          href="/cv/certificate_vitae.pdf"
          download
          className="inline-block bg-gray-900 dark:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-slate-600 transition"
        >
          Download Resume
        </a>
      </section>
    </main>
  );
}
