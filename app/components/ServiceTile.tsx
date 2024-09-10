import React from "react";
import dynamic from "next/dynamic";
import CloudinaryImage from "./CloudinaryImage";

const DynamicCloudinaryVideoService = dynamic(
  () => import("./CloudinaryVideo"),
  { ssr: false }
);

interface ServiceTileProps {
  title: string;
  description: string;
  videoUrl: string;
}

const ServiceTile: React.FC<ServiceTileProps> = ({
  title,
  description,
  videoUrl,
}) => {
  return (
    <div className="relative group">
      <div className="relative bg-transparent h-full  overflow-hidden backdrop-filter backdrop-blur-lg border border-gray-600 transform hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <CloudinaryImage
                src="/compressedLogo_lq4ksg"
                alt="logo"
                height={200}
                width={200}
                extraClasses="object-cover"
              />
            </div>
            {/* Blur Overlay */}
            <div className="absolute inset-0 backdrop-filter backdrop-blur-sm"></div>
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
              <p className="text-gray-300">{description}</p>
            </div>
          </div>
          <div className="md:w-1/2 h-64 md:min-h-64 md:h-auto">
            {videoUrl ? (
              <DynamicCloudinaryVideoService
                publicId={videoUrl}
                className="w-full h-full object-cover"
              />
            ) : (
              <p>Video not available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTile;
