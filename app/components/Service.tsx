import { useEffect, useRef } from "react";
import BookNowButton from "./BookNowButton";

interface ServiceProps {
  service: string;
  description: string;
  videoUrl: string;
}

const Service: React.FC<ServiceProps> = ({
  service,
  description,
  videoUrl,
}: ServiceProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.load();
    }
  }, [videoUrl]);

  return (
    <div className="min-w-full scroll-snap-align-start flex justify-center items-center">
      <div id="bg-video" className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
      <div className="bg-black flex flex-col justify-center mx-10 items-center max-w-lg">
        <h1 className="text-6xl mb-1">{service}</h1>
        <p className="text-center mb-4 p-4 text-sm">{description}</p>
        <BookNowButton extraClasses=" rounded-full hover:bg-gray-200 hover:text-black transition-colors duration-300 mb-10 z-10 " />
      </div>
    </div>
  );
};

export default Service;
