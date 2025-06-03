interface ProjectCardProps {
    title: string;
    stack: string[];
    description: string;
    github: string;
    videoUrl?: string;
  }
  
  export default function ProjectCard({
    title,
    stack,
    description,
    github,
    videoUrl,
  }: ProjectCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {stack.map((tech, i) => (
            <span key={i} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        {videoUrl && (
          <div className="mb-4">
            <video className="w-full rounded" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <a
          href={github}
          className="inline-block text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </div>
    );
  }
  