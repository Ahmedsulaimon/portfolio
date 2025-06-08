import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/project_data";

interface ProjectCardProps {
  project: Project;
}



  
  export default function ProjectCard({
    project
  }: ProjectCardProps) {
    return (
      <Link href={`/projects/${project.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, i) => (
            <span key={i} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        {project.videoUrl && (
          <div className="mb-4">
            <video className="w-full rounded" controls>
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <a
          href={project.github}
          className="inline-block text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </div>
      </Link>
    );
  }
  