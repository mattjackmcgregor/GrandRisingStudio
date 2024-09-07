import React from "react";
import BookNowButton from "./BookNowButton";
import dynamic from "next/dynamic";

const DynamicCloudinaryVideoService = dynamic(
  () => import("./CloudinaryVideo"),
  { ssr: false }
);

interface ServiceProps {
  service: string;
  description: string;
  videoPublicId: string;
}

const Service: React.FC<ServiceProps> = ({
  service,
  description,
  videoPublicId,
}: ServiceProps) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <DynamicCloudinaryVideoService
          publicId={videoPublicId}
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="relative z-10 bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-6xl mb-6">{service}</h1>
          <p className="mb-8 text-sm px-4">{description}</p>
          <BookNowButton extraClasses="rounded-full bg-transparent hover:bg-gray-200 hover:text-black transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Service;
