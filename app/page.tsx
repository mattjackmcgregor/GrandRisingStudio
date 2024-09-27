// app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/Hero";
import ServicesContainer from "./components/ServicesContainer";
import TeamOverviewContainer from "./components/TeamOverviewContainer";
import ProjectsSection from "./components/ProjectsSection";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const teamRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Adjust based on the number of services
          scrub: 1,
          pin: true,
        },
      });

      // Hero animation
      tl.to(heroRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });

      // Services animations
      const serviceSections = gsap.utils.toArray<HTMLElement>(
        ".service-section",
        servicesRef.current
      );
      serviceSections.forEach((section, index) => {
        if (index === 0) {
          tl.to(section, { opacity: 1, duration: 1 }, "-=0.5");
        }
        if (index < serviceSections.length - 1) {
          tl.to(section, { opacity: 0, duration: 1 }, "+=0.5");
          tl.to(serviceSections[index + 1], { opacity: 1, duration: 1 }, "<");
        }
      });

      // Fade out last service
      // tl.to(
      //   serviceSections[serviceSections.length - 1],
      //   { opacity: 0, duration: 0.5 },
      //   "+=0.5"
      // );

      // ... add other section animations here if needed
      animateParallaxSections();
    });

    return () => ctx.revert();
  }, []);

  function animateParallaxSections() {
    [teamRef, projectsRef, contactRef].forEach((sectionRef) => {
      gsap.fromTo(
        sectionRef.current,
        { y: "100%" },
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    });
  }

  return (
    <main className="bg-black text-white">
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div ref={servicesRef} className="absolute inset-0 z-10">
          <ServicesContainer />
        </div>
        <div ref={heroRef} className="absolute inset-0 z-20">
          <Hero />
        </div>
      </div>
      <div ref={teamRef} className="relative">
        <TeamOverviewContainer />
      </div>
      <div ref={projectsRef} className="relative">
        <ProjectsSection />
      </div>
      <div ref={contactRef} className="relative">
        <Contact />
      </div>
    </main>
  );
}
