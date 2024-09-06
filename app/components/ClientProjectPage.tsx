"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import CloudinaryImage from "./CloudinaryImage";
import CloudinaryVideo from "./CloudinaryVideo";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  fullDescription: string;
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
  const projectTagRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const projectTag = projectTagRef.current;
    const content = contentRef.current;

    if (projectTag && content) {
      gsap.fromTo(
        projectTag,
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
    <div className="min-h-screen bg-black text-white ">
      <div
        ref={projectTagRef}
        className="fixed top-4 left-4 z-10 backdrop-blur-lg"
      >
        <Link
          href="/"
          className="flex items-center text-white text-sm hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Projects
        </Link>
        <div className="bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4 max-w-xs">
          <h2 className="text-lg font-semibold text-white mb-2">
            {project.title}
          </h2>
          <div className="text-gray-300 text-sm">
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
        </div>
      </div>

      <main ref={contentRef} className=" px-4 py-12">
        {project.images && project.images.length > 0 && (
          <div className=" -top-12 w-full h-[33vh] md:w-[66vw] md:pl-2 md:pb-1 float-right">
            <CloudinaryImage
              src={project.images[0]}
              alt="Featured project image"
              width={1200}
              height={400}
              extraClasses="w-full h-full object-cover"
            />
          </div>
        )}

        <section className="mb-12 mt-36 md:pl-1 md:pr-3">
          {/* <ExpandableDescription description={project.fullDescription} /> */}
          <p className="text-lg text-gray-300">{project.fullDescription}</p>
        </section>

        {project.videos && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Project Video
            </h2>
            {project.videos.map((video, i) => (
              <div key={`${i}${video}`} className="aspect-w-16 aspect-h-9 mb-4">
                <CloudinaryVideo
                  publicId={video}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </section>
        )}

        {project.images && project.images.length > 1 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {project.images.slice(1).map((image, index) => (
              <div
                key={index}
                id={`image-${index}`}
                className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
              >
                <CloudinaryImage
                  src={image}
                  alt={`Project image ${index + 2}`}
                  width={800}
                  height={600}
                  extraClasses="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </section>
        )}

        {project.testimonial && (
          <section className="bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Client Testimonial
            </h2>
            <blockquote className="italic text-gray-300">
              {project.testimonial}
            </blockquote>
          </section>
        )}
      </main>
    </div>
  );
};

export default ClientProjectPage;

// interface ExpandableDescriptionProps {
//   description: string;
// }

// export const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
//   description,
// }) => {
//   const [isExpanded, setIsExpanded] = useState<boolean>(false);
//   const [showButton, setShowButton] = useState<boolean>(false);
//   const contentRef = useRef<HTMLParagraphElement>(null);

//   useEffect(() => {
//     if (contentRef.current) {
//       const lineHeight = parseInt(
//         window.getComputedStyle(contentRef.current).lineHeight
//       );
//       const maxHeight = lineHeight * 8; // 8 lines
//       setShowButton(contentRef.current.scrollHeight > maxHeight);
//     }
//   }, [description]);

//   return (
//     <div className="relative">
//       <p
//         ref={contentRef}
//         className={`text-lg text-gray-300 transition-all duration-300 ease-in-out ${
//           isExpanded ? "" : "max-h-[13.5em] overflow-hidden"
//         }`}
//       >
//         {description}
//       </p>
//       {!isExpanded && showButton && (
//         <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent " />
//       )}
//       {showButton && (
//         <button
//           className="absolute bottom-0  bg-transparent text-gray-300 hover:text-white transition-colors duration-200  py-2 px-4"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           {isExpanded ? "Show less" : "Read full description"}
//         </button>
//       )}
//     </div>
//   );
// };
