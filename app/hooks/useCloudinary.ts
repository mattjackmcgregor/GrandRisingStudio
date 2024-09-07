// hooks/useCloudinary.ts
import { Cloudinary } from "@cloudinary/url-gen";
import { useMemo } from "react";

export const useCloudinary = () => {
  const cloudName = "deiv1hpqw";

  const cld = useMemo(
    () =>
      new Cloudinary({
        cloud: {
          cloudName,
        },
      }),
    [cloudName]
  );

  const getVideoUrl = (videoId: string, quality: string = "auto") => {
    return cld.video(videoId).quality(quality).toURL();
  };

  return { getVideoUrl, cloudName, cld };
};
