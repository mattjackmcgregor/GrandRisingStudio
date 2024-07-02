"use client";

import React, { useContext } from "react";
import { CarouselContext } from "../../context/CarouselContext";

interface dotsIndicatorProps {
  activeIndex: number;
  totalItems: number;
}

const DotsIndicator: React.FC<dotsIndicatorProps> = ({
  activeIndex,
  totalItems,
}) => {
  const { handleIndexChange } = useContext(CarouselContext);
  return (
    <div className="flex justify-center p-4">
      {Array.from({ length: totalItems }).map((_, index) => (
        <div
          key={index}
          className={` z-40 w-2 h-2 rounded-full mx-1 ${
            index === activeIndex ? "bg-gray-300" : "bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
};

export default DotsIndicator;
