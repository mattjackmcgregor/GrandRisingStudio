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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <DynamicCloudinaryImage
        key={project.id}
        src={project.images[0]}
        alt={project.title}
        width={300}
        height={200}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-black">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{project.subtitle}</p>
        <div className="relative h-16 overflow-hidden">
          <p className="text-gray-800">{project.description}</p>

          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
        </div>
        <p className="text-black">See more</p>
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);
