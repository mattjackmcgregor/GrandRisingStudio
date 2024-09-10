"use client";

import React from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { useCloudinary } from "../hooks/useCloudinary";
import { quality } from "@cloudinary/url-gen/actions/delivery";

interface CloudinaryVideoServiceProps {
  publicId: string;
  className?: string;
}

const CloudinaryVideoService: React.FC<CloudinaryVideoServiceProps> = ({
  publicId,
  className,
}) => {
  const { cld } = useCloudinary();

  if (!cld) {
    console.error("Cloudinary instance not initialized");
    return null;
  }

  try {
    const videoSource = cld
      .video(publicId)
      .delivery(quality("auto"))
      .format("auto");

    return (
      <AdvancedVideo
        cldVid={videoSource}
        className={className}
        muted
        loop
        playsInline
        autoPlay
        controls={false}
      />
    );
  } catch (error) {
    console.error("Error creating Cloudinary video:", error);
    return null;
  }
};

export default CloudinaryVideoService;
