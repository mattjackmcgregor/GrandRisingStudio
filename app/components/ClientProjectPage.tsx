"use client";

import dynamic from "next/dynamic";

const DynamicCloudinaryImage = dynamic(() => import("./CloudinaryImage"), {
  loading: () => <p>loading...</p>,
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

interface ClientProjectPageProps {
  project: Project;
}

export default function ClientProjectPage({ project }: ClientProjectPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-xl text-gray-600 mb-6">{project.subtitle}</p>
      {project.images.map((imgUrl, i) => (
        <DynamicCloudinaryImage
          key={`${imgUrl} ${i}`}
          src={imgUrl}
          alt={`${project.title} - Image ${i + 1}`}
          width={800}
          height={400}
        />
      ))}
      <p className="text-gray-800 mb-8">{project.description}</p>
      {/* Add more content as needed */}
    </div>
  );
}
