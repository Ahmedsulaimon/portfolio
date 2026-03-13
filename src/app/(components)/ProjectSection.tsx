import ProjectCard from './ProjectCard';
import FadeIn from './FadeIn';
import { allProjects } from "@/lib/project_data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-slate-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Featured Projects
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {allProjects.map((project, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
