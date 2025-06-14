import Link from "next/link";

export default function HeroSection() {
    return (
      <section className="text-center py-20 bg-gray-50">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Hi,  I&apos;m Ahmed — Full Stack Developer
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          I build scalable web applications with modern technologies. Passionate about clean code, performance, and solving real-world problems with tech.
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          View Projects
        </Link>
      </section>
    );
  }
  