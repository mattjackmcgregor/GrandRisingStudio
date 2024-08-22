import Link from "next/link";
import ProjectCard from "./ProjectCard";
import projectData from "../../data/projectsData.json";

const ProjectsSection: React.FC = () => {
  return (
    <section id="projectsSection" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <ProjectCard key={project.id} project={project} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
