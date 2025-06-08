import { notFound } from "next/navigation";
import { allProjects, Project } from "@/lib/project_data";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface ProjectDetailProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProjectDetailProps) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} – Ahmed Sulaimon`,
    description: project.shortDescription,
  };
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    
    <main className="max-w-4xl mx-auto px-6 sm:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
        <p className="text-sm text-gray-500">{project.date}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      
      {/* Description */}
      <div className="prose prose-neutral prose-lg max-w-none mb-12 whitespace-pre-wrap">
      <ReactMarkdown >
         {project.fullDescription}
      </ReactMarkdown>
      </div>
      

      {/* Demo Video */}
      {project.videoUrl && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Project Demo</h2>
          <video
            className="w-full rounded-lg border border-gray-200 shadow"
            controls
          >
            <source src={project.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Personal Goal */}
      {project.personalGoal && (
        <div className="mb-12 bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Personal Goal</h2>
          <p className="text-gray-700">{project.personalGoal}</p>
        </div>
      )}

      {/* GitHub Link */}
      {project.github && (
        <Link
          href={project.github}
          target="_blank"
          className="inline-block mt-4 text-white bg-gray-900 hover:bg-gray-700 px-6 py-2 rounded-lg font-medium transition"
        >
          View Source on GitHub →
        </Link>
      )}
    </main>
  );
}
