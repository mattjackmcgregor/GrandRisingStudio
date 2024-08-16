import { useCloudinary } from "../hooks/useCloudinary";
import { useEffect, useRef } from "react";

interface CloudinaryVideoServiceProps {
  publicId: string;
  className?: string;
}

const CloudinaryVideoService = ({
  publicId,
  className,
}: CloudinaryVideoServiceProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { getVideoUrl } = useCloudinary();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = getVideoUrl(publicId);
      videoRef.current.load();
    }
  }, [publicId, getVideoUrl]);

  return (
    <video ref={videoRef} className={className} autoPlay muted loop playsInline>
      <source src={getVideoUrl(publicId)} type="video/mp4" />
    </video>
  );
};

export default CloudinaryVideoService;
