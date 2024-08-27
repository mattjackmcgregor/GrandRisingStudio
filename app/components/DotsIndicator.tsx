"use client";

import React from "react";

interface DotsIndicatorProps {
  totalItems: number;
  activeIndex: number;
  onDotClick?: (index: number) => void;
}

const DotsIndicator: React.FC<DotsIndicatorProps> = ({
  totalItems,
  activeIndex,
  onDotClick,
}) => {
  return (
    <div className="flex justify-center p-4">
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full mx-1 transition-all ${
            index === activeIndex ? "bg-gray-300 w-3" : "bg-gray-500"
          }`}
          onClick={() => onDotClick && onDotClick(index)}
        />
      ))}
    </div>
  );
};

export default DotsIndicator;
