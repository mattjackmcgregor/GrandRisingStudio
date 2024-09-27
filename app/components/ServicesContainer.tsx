import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Service from "./Service";
import { serviceData } from "@/data/serviceData";

const ServicesContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { pointerEvents: "none" });

      const sections =
        containerRef.current.querySelectorAll(".service-section");
      sections.forEach((section, index) => {
        gsap.to(section, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${index * 100}% top`,
            end: `${(index + 1) * 100}% top`,
            onEnter: () => gsap.set(section, { pointerEvents: "auto" }),
            onLeave: () => gsap.set(section, { pointerEvents: "none" }),
            onEnterBack: () => gsap.set(section, { pointerEvents: "auto" }),
            onLeaveBack: () => gsap.set(section, { pointerEvents: "none" }),
          },
        });
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full relative">
      {serviceData.map((section, index) => (
        <div
          key={index}
          className={`service-section absolute inset-0 w-full h-full opacity-0`}
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
