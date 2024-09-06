// app/projects/all/page.tsx

import React from "react";
import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";
import projectData from "../../../data/projectsData.json";

const AllProjectsPage: React.FC = () => {
  return (
    <div className="container bg-black text-white mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProjectsPage;
