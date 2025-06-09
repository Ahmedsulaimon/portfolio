import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-8 py-20 text-gray-800">
      {/* Header */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg text-gray-600">
          Passionate Software Engineer | Creative Problem Solver | Lifelong Learner
        </p>
      </section>

      {/* Profile Summary */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10 mb-16">
        <div className="md:w-2/3">
          <p className="text-lg mb-6">
            I'm <strong>Ahmed Sulaimon</strong>, a final-year Software Engineering student at Sheffield Hallam University with a deep passion for building efficient, scalable, and impactful digital products.
          </p>
          <p className="text-lg mb-6">
            My projects focus on real-world problem-solving — from freight train tracking systems to cross-platform grocery price comparison apps. I’ve worked with technologies like React, Flutter, Python, Flask, FastAPI, and more.
          </p>
          <p className="text-lg">
            I'm especially passionate about writing clean code, working in collaborative teams, and constantly challenging myself to learn new tools and techniques.
          </p>
        </div>

        <div className="md:w-1/3 w-full flex justify-center">
          <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
            <Image
              src="/images/selfie.png" // Replace with your actual profile image path
              alt="Ahmed Sulaimon"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Skills & Tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {[
            "React.js",
            "Next.js",
            "Flutter",
            "TypeScript",
            "Tailwind CSS",
            "Python",
            "Flask",
            "FastAPI",
            "Docker",
            "PostgreSQL",
            "Git & GitHub",
            "CI/CD",
          ].map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Personal Statement / Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">What Drives Me</h2>
        <p className="text-lg">
          I thrive in environments where innovation meets purpose. Whether it's leading a team using agile methods, presenting to clients, or optimizing code performance, I bring a strong sense of ownership and curiosity to everything I do.
        </p>
      </section>

     

      <section className="text-center mt-10">
        <Link
          href="/cv/certificate_vitae.pdf"
          download
         className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition"
        >
          Download Resume
        </Link>
      </section>

    </main>
  );
}
