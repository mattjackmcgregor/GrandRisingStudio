"use client";

import React, { useContext, useMemo } from "react";
import PhotoCarousel from "./PhotoCarousel";
import DotsIndicator from "./DotsIndicator";
import { CarouselContext } from "../../context/CarouselContext";
import { Button } from "@/components/ui/button";
// import { CldImage } from "next-cloudinary";
import dynamic from "next/dynamic";

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

const TeamCard = ({
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
}: Props) => {
  const { currentIndex } = useContext(CarouselContext);

  const cloudinaryImages = useMemo(
    () =>
      images.map((image, i) => (
        <DynamicCloudinaryImage
          key={`${image}${i}`}
          src={image}
          alt={`${name}'s work`}
          width={600}
          height={400}
        />
      )),
    [images, name]
  );

  const socialMediaLinks = useMemo(
    () =>
      Object.entries(socialMediaHandles).map(([key, value], index, array) => (
        <a key={key} href={value}>
          <p>
            {key}
            {index < array.length - 1 && <span className="mx-1">|</span>}
          </p>
        </a>
      )),
    [socialMediaHandles]
  );

  return (
    <div className="w-full flex flex-col md:flex-row mx-auto">
      <div className="md:w-1/2 flex-shrink-0 h-1/2 md:h-full py-4">
        <PhotoCarousel images={cloudinaryImages} />
        <DotsIndicator activeIndex={currentIndex} totalItems={images.length} />
      </div>
      <div className="md:w-1/2 p-4 flex flex-col justify-center px-8">
        <div className="flex flex-col items-center md:items-start mb-10">
          <h1 className="text-center md:text-left text-4xl">{name}</h1>
          <h2 className="text-center md:text-left mb-4 pb-4 pt-2 text-sm">
            {services.join(" | ")}
          </h2>
          <p className="text-center md:text-left">{description}</p>
          <div className="flex flex-col items-center md:items-start mt-5">
            <p>Contact {name}</p>
            <div className="flex flex-row">{socialMediaLinks}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={onPrevTeamMember}>
            {"<"} {prevTeamMember}
          </Button>
          <Button onClick={onNextTeamMember}>
            {nextTeamMember} {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TeamCard);
