"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicCloudinaryImage = dynamic(() => import("./CloudinaryImage"), {
  ssr: false,
});

interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  videos: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="relative w-full h-full  shadow-lg overflow-hidden group">
      {/* Background Image */}
      <DynamicCloudinaryImage
        key={project.id}
        src={project.images[0]}
        alt={project.title}
        width={400}
        height={300}
        extraClasses="absolute inset-0 w-full h-full object-cover transition-transform duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-110"
      />

      {/* Glassmorphic Panel */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="bgtransparent flex flex-col justify-center items-center  backdrop-filter backdrop-blur-lg rounded-md p-6 w-5/6 max-w-sm transition-al transition-transform duration-300 group-hover:bg-black group-hover:bg-opacity-30">
          <h3 className="text-xl text-center font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-xs text-gray-200  mb-3">{project.subtitle}</p>
          <p className="text-sm text-white text-center mb-4 line-clamp-3 ">
            {project.description}
          </p>
          <span className="text-white text-sm font-semibold hover:underline cursor-pointer transition-all duration-300">
            See more
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);
