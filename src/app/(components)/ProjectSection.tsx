import ProjectCard from './ProjectCard';

const Projects = [
  {
    title: 'Automated Price Comparison App',
    description:
      'A mobile app that scrapes and forecasts grocery prices across UK supermarkets using machine learning.',
    stack: ['Flutter', 'Python', 'Selenium', 'Docker', 'Next.js', 'PostgresDB'],
    github: 'https://github.com/Ahmedsulaimon/price-comparison-app/tree/dev',
    videoUrl: '/videos/demo.mp4', // placeholder
  },
  {
    title: 'Freight Train Tracker',
    description:
      'A web app that provides real time update on freight train, this includes current location, expect arrival time at different location e.t.c',
    stack: ['vite', 'React.js', 'Socket.io', 'Leafletjs',],
    github: 'https://github.com/Ahmedsulaimon/train-tracker-app',
    videoUrl: '/videos/project demo.mp4', 
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
