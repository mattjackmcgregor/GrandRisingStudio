// app/components/ServicesContainer.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Service from "./Service";
import { serviceData } from "@/data/serviceData";

// app/components/ServicesContainer.tsx

const ServicesContainer: React.FC = () => {
  return (
    <div className="h-full w-full relative">
      {serviceData.map((section, index) => (
        <div
          key={index}
          className={`service-section absolute inset-0 w-full h-full opacity-0
          `}
        >
          <Service
            service={section.service}
            description={section.description}
            videoPublicId={section.videoUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default ServicesContainer;
