import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SwipeIndicator = () => {
  const containerRef = useRef(null);
  const leftArrowsRef = useRef(null);
  const rightArrowsRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(leftArrowsRef.current, {
        x: -5,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(rightArrowsRef.current, {
        x: 5,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center text-l font-sans text-white"
    >
      <span ref={leftArrowsRef} className="mr-1">
        &#60;&#60;&#60;
      </span>
      <span className="mx-1">swipe</span>
      <span ref={rightArrowsRef} className="ml-1">
        &#62;&#62;&#62;
      </span>
    </div>
  );
};

export default SwipeIndicator;
