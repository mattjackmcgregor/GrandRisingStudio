"use client";

import React, { useRef, useState } from "react";
import Service from "./Service";
import DotsIndicator from "./DotsIndicator";
import { useSwipeable } from "react-swipeable";
import SwipeIndicator from "./SwipeIndicator";
// import SwipeIndicator from "./SwipeIndicator";
import { sectionData } from "@/data/serviceData";
// import { useCloudinary } from "@/hooks/useCloudinary";

const ServicesContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionIdx, setSectionIdx] = useState(0);
  // const { getVideoUrl } = useCloudinary();

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(),
    onSwipedRight: () => handleSwipeRight(),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipeLeft = () => {
    if (sectionIdx < sectionData.length - 1) {
      setSectionIdx(sectionIdx + 1);
    }
  };

  const handleSwipeRight = () => {
    if (sectionIdx > 0) {
      setSectionIdx(sectionIdx - 1);
    }
  };
  return (
    <div
      {...handlers}
      id="services"
      className="relative w-screen h-[90vh] flex justify-center items-center scroll-mt-[58px] "
    >
      <div>
        <div ref={containerRef} className="flex items-center">
          <Service
            service={sectionData[sectionIdx].service}
            description={sectionData[sectionIdx].description}
            videoUrl={sectionData[sectionIdx].videoUrl}
          />
        </div>
        <DotsIndicator activeIndex={sectionIdx} totalItems={3} />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-50 ">
          <SwipeIndicator />
        </div>
      </div>
    </div>
  );
};

export default ServicesContainer;
