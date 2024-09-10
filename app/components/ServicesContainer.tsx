"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Service from "./Service";
import { serviceData } from "@/data/serviceData";
import SwipeIndicator from "./SwipeIndicator";
import DotsIndicator from "./DotsIndicator";

import type { CarouselApi } from "@/components/ui/carousel";

const ServicesContainer: React.FC = () => {
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
    <div
      id="services"
      className="relative h-full w-full flex flex-col justify-center items-center"
    >
      <Carousel
        setApi={setApi}
        className="w-full h-[90vh] flex justify-center "
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-full w-full m-0">
          {serviceData.map((section, index) => (
            <CarouselItem key={index} className="w-full h-full  p-0">
              <Service
                service={section.service}
                description={section.description}
                videoPublicId={section.videoUrl}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="ml-20 lg:ml-16 lg:left-0.5 "
          aria-label="Previous slide"
        />
        <CarouselNext
          className="mr-20 lg:mr-16 lg:right-0.5 "
          aria-label="Next slide"
        />
      </Carousel>

      <div className="absolute bottom-1 left-1/2  transform -translate-x-1/2 opacity-50">
        <div className="md:hidden">
          <SwipeIndicator />
        </div>
        <DotsIndicator
          totalItems={count}
          activeIndex={current - 1}
          onDotClick={(index) => api?.scrollTo(index)}
        />
      </div>
    </div>
  );
};

export default ServicesContainer;
