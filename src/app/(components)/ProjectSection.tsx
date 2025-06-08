import ProjectCard from './ProjectCard';
import { allProjects } from "@/lib/project_data";


export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          { allProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
