import React, { useContext, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselApi } from "@/components/ui/carousel";
import { CarouselContext } from "../../context/CarouselContext";

interface ImageProps {
  images: React.JSX.Element[];
}

const PhotoCarousel = ({ images }: ImageProps) => {
  const { handleIndexChange, currentIndex } = useContext(CarouselContext);
  const [api, setApi] = React.useState<CarouselApi>();

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(),
    onSwipedRight: () => handleSwipeRight(),
    trackMouse: true,
  });

  const handleSwipeLeft = () => {
    if (currentIndex < images.length - 1) {
      handleIndexChange(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
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
  }, [api, currentIndex, handleIndexChange]);

  return (
    <Carousel setApi={setApi} {...handlers} className="md:h-full h-[50vh] pb-2">
      <CarouselContent className="md:h-full h-[50vh]">
        {images.map((image, imageIndex) => (
          <CarouselItem
            key={imageIndex}
            className="h-full flex items-center justify-center"
          >
            {image}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PhotoCarousel;
