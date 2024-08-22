"use cilent";

import { CldImage } from "next-cloudinary";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const CloudinaryImage = ({ src, alt, width, height }: CloudinaryImageProps) => (
  <CldImage
    width={width}
    height={height}
    src={src}
    sizes="(max-width: 768px) 100vw, 50vw"
    alt={alt}
    loading="lazy"
  />
);

export default CloudinaryImage;
