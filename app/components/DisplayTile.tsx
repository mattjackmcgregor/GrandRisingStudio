import React from "react";
import dynamic from "next/dynamic";

const DynamicCloudinaryVideoService = dynamic(
  () => import("./CloudinaryVideo"),
  { ssr: false }
);

const DynamicCloudinaryImage = dynamic(() => import("./CloudinaryImage"), {
  ssr: false,
});

interface DisplayTileProps {
  title: string;
  description: string;
  videoUrl?: string;
  displayImage?: { url: string; alt: string };
}

const DisplayTile: React.FC<DisplayTileProps> = ({
  title,
  description,
  videoUrl,
  displayImage,
}) => {
  return (
    <div className="relative group w-full">
      <div className="relative bg-transparent overflow-hidden backdrop-filter backdrop-blur-lg border border-gray-600 transform hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 flex justify-center items-center relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <DynamicCloudinaryImage
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
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-white">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                {description}
              </p>
            </div>
          </div>
          <div className="md:w-1/2 h-48 md:h-auto md:max-h-[400px]">
            {videoUrl && (
              <DynamicCloudinaryVideoService
                publicId={videoUrl}
                className="w-full h-full object-cover"
              />
            )}
            {displayImage && (
              <DynamicCloudinaryImage
                src={displayImage.url}
                alt={displayImage.alt}
                height={400}
                width={400}
                extraClasses="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTile;
