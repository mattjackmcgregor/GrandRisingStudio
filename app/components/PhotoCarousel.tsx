import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselApi } from "@/components/ui/carousel";
import { CarouselContext } from "../../context/CarouselContext";

interface ImageProps {
  images: string[];
}

const PhotoCarousel = ({ images }: ImageProps) => {
  const { handleIndexChange, currentIndex } = useContext(CarouselContext);
  const [api, setApi] = React.useState<CarouselApi>();

  // Handle swipe gestures locally
  const handlers = useSwipeable({
    onSwipedLeft: (event) => handleSwipeLeft(event),
    onSwipedRight: (event) => handleSwipeRight(event),
    trackMouse: true,
  });

  // Handle swipe left
  const handleSwipeLeft = (event: any) => {
    if (currentIndex < images.length - 1) {
      handleIndexChange(currentIndex + 1);
    }
  };

  // Handle swipe right
  const handleSwipeRight = (event: any) => {
    if (currentIndex > 0) {
      handleIndexChange(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesInView", () => {
      const index = api.slidesInView();
      if (index !== currentIndex) {
        handleIndexChange(index[0]);
      }
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      {...handlers}
      className=" md:h-full h-[50vh] pb-2"
    >
      <CarouselContent className=" md:h-full h-[50vh]">
        {images.map((image, imageIndex) => (
          <CarouselItem
            key={imageIndex}
            className="h-full flex items-center justify-center"
          >
            <Image
              src={image}
              alt={`${imageIndex + 1}`}
              className="object-contain max-h-[90vh]"
              width={1920} // Set the desired width
              height={1080} // Set the desired height
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PhotoCarousel;
