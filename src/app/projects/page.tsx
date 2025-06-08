// src/app/projects/page.tsx

import { allProjects } from "@/lib/project_data";
import ProjectCard from "../(components)/ProjectCard";

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
        Projects
      </h1>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
        {allProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </main>
  );
}
