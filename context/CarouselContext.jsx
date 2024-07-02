"use client";

import React, { createContext, useState } from "react";

export const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChange = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  const value = {
    currentIndex,
    handleIndexChange,
  };

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};
