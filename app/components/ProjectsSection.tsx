"use client";

import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import projectData from "../../data/projectsData.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DotsIndicator from "./DotsIndicator";
import type { CarouselApi } from "@/components/ui/carousel";

const ProjectsSection: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section
      id="projectsSection"
      className="py-12 bg-black w-full overflow-hidden"
    >
      <div className=" w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Featured Projects
        </h2>
        <div className="w-[90vw] flex flex-col">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {projectData.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 h-[70vh]"
                >
                  <Link href={`/projects/${project.slug}`}>
                    <ProjectCard project={project} />
                  </Link>
                </CarouselItem>
              ))}
              <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3 h-[70vh]">
                <Link href="/projects/all">
                  <div className="bg-white h-full rounded-lg shadow-md overflow-hidden flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-black">
                      See All Projects
                    </h3>
                  </div>
                </Link>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="top-1/3 " />
            <CarouselNext className="top-1/3  " />
          </Carousel>
          <div className="mt-4">
            <DotsIndicator
              totalItems={count}
              activeIndex={current - 1}
              onDotClick={(index) => api?.scrollTo(index)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
