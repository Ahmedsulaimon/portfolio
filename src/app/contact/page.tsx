import type { Metadata } from "next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = {
  title: "Contact — Ahmed Sulaimon",
  description: "Get in touch with Ahmed Sulaimon — Junior Software Engineer based in London, UK.",
};

const links = [
  {
    label: "Email",
    value: "Sulaimonahmed08@gmail.com",
    href: "mailto:Sulaimonahmed08@gmail.com",
    icon: MdEmail,
    description: "Best way to reach me — I typically reply within 24 hours.",
  },
  {
    label: "LinkedIn",
    value: "ahmed-sulaimon-8260112b0",
    href: "https://www.linkedin.com/in/ahmed-sulaimon-8260112b0/",
    icon: FaLinkedin,
    description: "Connect with me professionally.",
  },
  {
    label: "GitHub",
    value: "Ahmedsulaimon",
    href: "https://github.com/Ahmedsulaimon",
    icon: FaGithub,
    description: "See what I'm building.",
  },
];

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-gray-800 dark:text-gray-200">
      {/* Heading */}
      <section className="mb-14 text-center">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Let&apos;s Work Together</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          I&apos;m currently seeking a full-time backend or full-stack engineering role. Whether you&apos;re a recruiter, a fellow engineer, or just want to say hi — I&apos;d love to hear from you.
        </p>
      </section>

      {/* Contact cards */}
      <div className="space-y-4 mb-16">
        {links.map(({ label, value, href, icon: Icon, description }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="flex items-start gap-5 p-5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition group"
          >
            <div className="mt-0.5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Icon size={28} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-1">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Availability note */}
      <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 text-center">
        <p className="text-blue-800 dark:text-blue-300 font-medium text-lg">
          Open to full-time opportunities
        </p>
        <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">
          Based in London, UK — open to remote, hybrid, or on-site roles.
        </p>
      </div>
    </main>
  );
}
