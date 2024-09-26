"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import BookNowButton from "./BookNowButton";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

type section = { id: string; label: string; href: string };

const sections: section[] = [
  { id: "hero", label: "Home", href: "/" },
  { id: "services", label: "Services", href: "/services/all" },
  { id: "teamOverview", label: "Team", href: "/team/all" },
  { id: "projectsSection", label: "Projects", href: "/projects/all" },
  { id: "contact", label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      // Intersection Observer setup
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // 50% of the target is visible
      };

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // Check if current section is intersecting the viewport
          if (entry.isIntersecting) {
            // Match the section id with the menu section id
            const sectionId = entry.target.id;
            const sectionLabel = sections.find(
              (section) => section.id === sectionId
            )?.label;
            // If the section that's intersecting is found in the menu selection, set it as active
            if (sectionLabel) {
              setActiveSection(sectionLabel);
            }
          }
        });
      }, options);

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observerRef.current?.observe(element);
      });

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    } else {
      const currentSection = sections.find(
        (section) => pathname === section.href
      );
      setActiveSection(currentSection?.label || "");
    }
  }, [isHomePage, pathname]);

  useEffect(() => {
    if (isDropdownOpen) {
      gsap.to(mobileMenuRef.current, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: "power3.out",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: "power3.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.display = "none";
          }
        },
      });
    }
  }, [isDropdownOpen]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setActiveSection(target.name);
    setIsDropdownOpen(false);
  };

  const handleMouseOver = (sectionLabel: string) => {
    if (activeSection !== sectionLabel) {
      setHoveredSection(sectionLabel);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen && mobileMenuRef.current) {
      mobileMenuRef.current.style.display = "flex";
    }
  };

  const desktopNav = (
    <div className="hidden md:flex justify-center w-full">
      <ul className="flex justify-around w-full md:w-3/4 max-w-2xl mx-auto backdrop-filter backdrop-blur-lg rounded-lg shadow-lg bg-transparent">
        {sections.map((section) => {
          if (section.id === "hero") {
            return null;
          } else {
            return (
              <li
                key={section.id}
                className="px-4 py-2 transition-all duration-300 underline-offset-4 decoration-transparent "
              >
                <Link href={section.href}>
                  <button
                    name={section.label}
                    value={section.id}
                    onClick={handleClick}
                    onMouseOver={() => handleMouseOver(section.label)}
                    onMouseOut={() => setHoveredSection(null)}
                    className={`hover:underline text-white ${
                      isHomePage
                        ? activeSection === section.label &&
                          (hoveredSection === activeSection ||
                            hoveredSection === null)
                          ? "underline"
                          : ""
                        : pathname === section.href
                        ? "underline"
                        : ""
                    }`}
                  >
                    {section.label}
                  </button>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );

  return (
    <>
      <nav className="bg-transparent px-3 md:px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 w-screen h-16 sm:h-16 md:h-20 lg:h-24 xl:h-28">
        <div className="">
          <Link
            href="/"
            onClick={() => {
              setActiveSection("Home");
              setIsDropdownOpen(false);
            }}
          >
            <Image
              src="https://res.cloudinary.com/deiv1hpqw/image/upload/v1719897432/compressedLogo_lq4ksg.png"
              alt="Grand Rising Logo"
              height={200}
              width={200}
              className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 cursor-pointer object-contain"
            />
          </Link>
        </div>
        {desktopNav}
        <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
          <Button
            className="text-white px-4 py-3 hover:bg-gray-700 flex justify-center rounded-full transition-colors duration-300 bg-filter backdrop-blur-lg bg-transparent hover:bg-transparent"
            onClick={toggleDropdown}
          >
            {activeSection}
            <span className="ml-1">
              {isDropdownOpen ? (
                <Image
                  src={"/cheveron-up.svg"}
                  height={15}
                  width={15}
                  alt="cheveron-up"
                />
              ) : (
                <Image
                  src={"/cheveron-down.svg"}
                  height={15}
                  width={15}
                  alt="cheveron-down"
                />
              )}
            </span>
          </Button>
        </div>
        <div>
          <BookNowButton extraClasses="rounded-full md:scale-110 bg-transparent hover:backdrop-filter hover:backdrop-blur-lg text-white transition-colors duration-300 border border-white" />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-50 bg-black bg-opacity-95 flex-col pt-40  items-center hidden opacity-0 translate-y-14"
      >
        <Image
          src="https://res.cloudinary.com/deiv1hpqw/image/upload/v1719897432/compressedLogo_lq4ksg.png"
          alt="Grand Rising Logo"
          height={200}
          width={200}
          className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 cursor-pointer object-contain absolute top-4 left-4"
        />
        <button
          onClick={toggleDropdown}
          className="absolute top-4 right-4 text-white text-3xl"
        >
          &times;
        </button>
        {sections.map((section) => (
          <Link href={section.href} key={section.id}>
            <Button
              value={section.id}
              name={section.label}
              className="text-white text-3xl my-4 px-8 py-4 bg-transparent hover:bg-gray-800 transition-all duration-300 rounded-lg"
              onClick={handleClick}
            >
              {section.label}
            </Button>
          </Link>
        ))}
        <BookNowButton extraClasses="mt-4 text-xl px-8 py-4 rounded-full bg-transparent hover:bg-gray-800 text-white transition-colors duration-300 border border-white" />
        <div className="mt-4">
          <Link href="https://www.instagram.com/grandrisingstudios/">
            <p className="text-white text-md mt-4">Instagram</p>
          </Link>
          <Link href="https://www.facebook.com/grandrisingstudios/">
            <p className="text-white text-md mt-4">Facebook</p>
          </Link>
        </div>
        <footer className="text-gray-300 text-sm mt-40">
          © GRANDRISINGSTUDIOS {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
};

export default Navbar;
