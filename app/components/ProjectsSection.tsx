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
        <div className=" w-full md:w-[90vw] flex flex-col justify-center">
          <Carousel setApi={setApi} className="md:mx-8">
            <CarouselContent className="">
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
              <CarouselItem className="pl-4   h-[70vh] sm:w-64 md:w-72 lg:w-80 xl:w-96 max-w-sm flex justify-center items-center bg-gradient-to-b from-black to-gray-800 ">
                <Link href="/projects/all">
                  <div className=" rounded-lg p-4 h-full ">
                    <h3 className="text-lg font-bold text-white text-center hover:underline">
                      See All Projects
                    </h3>
                  </div>
                </Link>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
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
