import { notFound } from "next/navigation";

import projectsData from "../../../data/projectsData.json";
import ClientProjectPage from "./ClientProjectPage";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ClientProjectPage project={project} />;
}
