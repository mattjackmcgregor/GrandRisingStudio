import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ArrowComponent = () => {
  const arrowRef = useRef(null);
  const arrowAnimation = useRef(null);

  useGSAP(() => {
    // @ts-ignore
    arrowAnimation.current = gsap.fromTo(
      ".arrow",
      { y: 0 },
      {
        y: -30,
        duration: 0.5,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
        yoyoEase: "power2.in",
      }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 0) {
        gsap.to(arrowRef.current, {
          opacity: 0,
          duration: 0.5,
        });
      } else {
        gsap.to(arrowRef.current, {
          opacity: 1,
          duration: 0.5,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleArrowClick = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <button ref={arrowRef} className="arrow" onClick={handleArrowClick} />
    </div>
  );
};

export default ArrowComponent;
