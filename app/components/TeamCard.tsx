"use client";

import React, { useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DotsIndicator from "./DotsIndicator";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import type { CarouselApi } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

const DynamicCloudinaryImage = dynamic(() => import("./CloudinaryImage"), {
  ssr: false,
});

interface Props {
  id: number;
  name: string;
  images: string[];
  services: string[];
  description: string;
  socialMediaHandles: { [key: string]: string | undefined };
  onPrevTeamMember: () => void;
  onNextTeamMember: () => void;
  prevTeamMember: string;
  nextTeamMember: string;
}

const TeamCard: React.FC<Props> = ({
  id,
  name,
  images,
  services,
  description,
  socialMediaHandles,
  onPrevTeamMember,
  onNextTeamMember,
  prevTeamMember,
  nextTeamMember,
}) => {
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

  const cloudinaryImages = useMemo(
    () =>
      images.map((image, i) => (
        <DynamicCloudinaryImage
          key={`${image}${i}`}
          src={image}
          alt={`${name}'s work`}
          width={600}
          height={400}
          extraClasses="w-full h-full object-cover"
        />
      )),
    [images, name]
  );

  const socialMediaLinks = useMemo(
    () =>
      Object.entries(socialMediaHandles).map(([key, value], index, array) => (
        <a key={key} href={value} className="text-sm">
          <div className="flex items-center">
            <p className="hover:underline">{key}</p>
            {index < array.length - 1 && <span className="mx-1">|</span>}
          </div>
        </a>
      )),
    [socialMediaHandles]
  );

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center space-y-10 px-4">
      <div className="w-full md:w-1/2 h-full ">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
          className="w-full h-full "
        >
          <CarouselContent className="-ml-0 h-full">
            {cloudinaryImages.map((image, index) => (
              <CarouselItem key={index} className="pl-0 h-[50vh] md:h-[80vh]">
                <div className="w-full h-[50vh] md:h-[80vh]">{image}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <DotsIndicator
              totalItems={count}
              activeIndex={current - 1}
              onDotClick={(index) => api?.scrollTo(index)}
            />
          </div>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
      <div className="w-full h-full md:w-1/2 flex flex-col justify-between md:justify-center px-4 md:px-8 ">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-10">
          <h1 className="text-center md:text-left text-3xl md:text-4xl">
            {name}
          </h1>
          <h2 className="text-center md:text-left mb-2 md:mb-4 pb-2 md:pb-4 pt-2 text-sm">
            {services.join(" | ")}
          </h2>
          <p className="text-center md:text-left text-sm md:text-base md:max-h-none overflow-y-auto">
            {description}
          </p>
          <div className="flex flex-col items-center md:items-start mt-2 md:mt-5">
            <p className="text-sm md:text-base ">Contact {name}</p>
            <div className="flex flex-row flex-wrap justify-center md:justify-start ">
              {socialMediaLinks}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2 lg:mt-0">
          <Button
            onClick={onPrevTeamMember}
            size="sm"
            className="text-xs lg:text-sm  bg-transparent  hover:bg-transparent  transition-all "
          >
            <div className="flex items-center relative group">
              <p className="mr-1 transition-all group-hover:translate-x-[-4px] group-hover:duration-200">
                {"<"}
              </p>
              <p className="hover:underline">{prevTeamMember}</p>
            </div>
          </Button>
          <Button
            onClick={onNextTeamMember}
            size="sm"
            className="text-xs lg:text-sm bg-transparent hover:bg-transparent transition-all"
          >
            <div className="flex items-center relative group">
              <p className="hover:underline">{nextTeamMember}</p>
              <p className="ml-1 transition-all group-hover:translate-x-[4px] group-hover:duration-200">
                {">"}
              </p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TeamCard);
