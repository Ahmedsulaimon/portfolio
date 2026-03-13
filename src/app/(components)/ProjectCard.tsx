import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/project_data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 transition hover:shadow-lg hover:-translate-y-1 duration-300">
      {/* Thumbnail */}
      {project.thumbnailUrl && (
        <div className="relative w-full h-48">
          <Image
            src={project.thumbnailUrl}
            alt={`${project.title} thumbnail`}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      )}

      <div className="p-6">
        {/* Title + Date */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{project.date}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Short Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
          {project.shortDescription}
        </p>

        {/* View Project Button */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-block text-sm font-medium text-white bg-gray-900 dark:bg-slate-600 hover:bg-gray-700 dark:hover:bg-slate-500 px-4 py-2 rounded transition"
        >
          View Full Project →
        </Link>
      </div>
    </div>
  );
}
