"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import CloudinaryImage from "./CloudinaryImage";
import CloudinaryVideo from "./CloudinaryVideo";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  images?: Array<string>;
  videos?: Array<string>;
  client: string;
  location: string;
  date: string;
  testimonial?: string;
}

interface ClientProjectPageProps {
  project: Project;
}

const ClientProjectPage: React.FC<ClientProjectPageProps> = ({ project }) => {
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const content = contentRef.current;

    if (header && content) {
      gsap.fromTo(
        header,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        content.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );

      project.images?.forEach((_, index) => {
        gsap.fromTo(
          `#image-${index}`,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: `#image-${index}`,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [project]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header ref={headerRef} className="bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-white">{project.title}</h1>
        </div>
      </header>

      <main ref={contentRef} className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <p className="text-xl text-gray-300 mb-6">{project.description}</p>
        </section>

        {project.videos && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Project Video
            </h2>
            {project.videos.map((video, i) => (
              <div key={`${i}${video}`} className="aspect-w-16 aspect-h-9">
                <CloudinaryVideo
                  publicId={video}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </section>
        )}

        {project.images && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {project.images.map((image, index) => {
              console.log(image);
              return (
                <div
                  key={index}
                  id={`image-${index}`}
                  className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
                >
                  <CloudinaryImage
                    src={image}
                    alt={image}
                    width={800}
                    height={600}
                    extraClasses="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              );
            })}
          </section>
        )}

        <section className="bg-gray-900 rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Project Details
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong>Client:</strong> {project.client}
            </p>
            <p>
              <strong>Location:</strong> {project.location}
            </p>
            <p>
              <strong>Date:</strong> {project.date}
            </p>
          </div>
        </section>

        {project.testimonial && (
          <section className="bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Client Testimonial
            </h2>
            <blockquote className="italic text-gray-300">
              &quot;{project.testimonial}&quot;
            </blockquote>
          </section>
        )}
      </main>
    </div>
  );
};

export default ClientProjectPage;
