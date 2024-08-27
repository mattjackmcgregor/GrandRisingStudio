"use client";

import { CldImage } from "next-cloudinary";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  extraClasses?: string;
}

const CloudinaryImage = ({
  src,
  alt,
  width,
  height,
  extraClasses,
}: CloudinaryImageProps) => (
  <CldImage
    width={width}
    height={height}
    src={src}
    sizes="(max-width: 768px) 100vw, 50vw"
    alt={alt}
    loading="lazy"
    className={`${extraClasses}`}
  />
);

export default CloudinaryImage;
