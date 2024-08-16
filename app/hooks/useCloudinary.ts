// hooks/useCloudinary.ts
import { Cloudinary } from "@cloudinary/url-gen";
import { useMemo } from "react";

export const useCloudinary = () => {
  const cld = useMemo(
    () =>
      new Cloudinary({
        cloud: {
          cloudName: "deiv1hpqw",
        },
      }),
    []
  );

  const getVideoUrl = (videoId: string) => cld.video(videoId).toURL();

  return { getVideoUrl };
};
