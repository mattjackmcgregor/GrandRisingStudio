"use client";

import Image from "next/image";
import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import BookNowButton from "./BookNowButton";
import dynamic from "next/dynamic";
import MouseScrollIcon from "./MouseScrollIcon";

const DynamicCloudinaryVideo = dynamic(() => import("./CloudinaryVideo"), {
  ssr: false,
});

const Hero = () => {
  const h1Ref = useRef(null);
  const mouseScrollIconRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // Calculate opposite direction for shadow
      const shadowX = -(deltaX / 40);
      const shadowY = -(deltaY / 40);

      const rotateX = -(deltaY / centerY) * 10; // Max rotation angle in degrees
      const rotateY = -(deltaX / centerX) * -10; // Max rotation angle in degrees

      gsap.to(h1Ref.current, {
        rotateX,
        rotateY,
        textShadow: `${shadowX}px ${shadowY}px 10px rgba(0, 0, 0, 100)`,
        duration: 0.1,
        ease: "power2.out",
        transformPerspective: 500, // Add perspective to the transformation
      });
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 0) {
        gsap.to(mouseScrollIconRef.current, {
          opacity: 0,
          duration: 0.5,
        });
      } else {
        gsap.to(mouseScrollIconRef.current, {
          opacity: 1,
          duration: 0.5,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const HeroVideo = useMemo(() => {
    return (
      <DynamicCloudinaryVideo
        publicId="heroCompressed2_znc83d"
        className="w-full h-[100vh] object-cover opacity-60"
      />
    );
  }, []);

  const HeroImage = useMemo(() => {
    return (
      <Image
        src="https://res.cloudinary.com/deiv1hpqw/image/upload/v1719897432/compressedLogo_lq4ksg.png"
        alt="grand rising logo"
        height={220}
        width={220}
        priority
        loading="eager"
      />
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col bg-black items-center justify-center"
    >
      <div id="bg-video" className="absolute inset-0 z-0">
        {HeroVideo}
      </div>
      <div className="relative z-10 text-center flex flex-col items-center">
        {HeroImage}
        <h1
          ref={h1Ref}
          className="text-white text-4xl mb-4"
          style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
        >
          Grand Rising Studios
        </h1>
        <h2 className="text-white text-sm mb-8">Barber | Tattoo | Design</h2>
        <BookNowButton extraClasses="rounded-full bg-transparent hover:backdrop-filter hover:backdrop-blur-lg hover:underline transition-colors duration-300" />
      </div>
      <div ref={mouseScrollIconRef}>
        <MouseScrollIcon />
      </div>
    </section>
  );
};

export default React.memo(Hero);
