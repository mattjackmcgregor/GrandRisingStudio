"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import BookNowButton from "./BookNowButton";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type section = { id: string; label: string; href: string };

const sections: section[] = [
  { id: "hero", label: "Home", href: "/" },
  { id: "services", label: "Services", href: "/services/all" },
  { id: "teamOverview", label: "Team", href: "/team/all" },
  { id: "projectsSection", label: "Projects", href: "/projects/all" },
  { id: "contact", label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setActiveSection(target.name);
    setIsDropdownOpen(false);
  };

  const desktopNav = (
    <div className="hidden md:flex justify-center w-full ">
      <ul className="flex justify-evenly px-8 w-full max-w-2xl mx-auto">
        {sections.map((section) => {
          if (section.id === "hero") {
            return;
          } else {
            return (
              <li
                key={section.id}
                className="px-4 py-2 transition-all duration-300 hover:underline underline-offset-4 decoration-transparent hover:decoration-current"
              >
                <Link href={section.href}>
                  <button
                    name={section.label}
                    value={section.id}
                    onClick={handleClick}
                    className={`text-white ${
                      isHomePage
                        ? activeSection === section.label
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
      <nav className="bg-black flex justify-between items-center fixed top-0 left-0 right-0 z-50 w-screen">
        <div className="px-4 py-2">
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
              height={40}
              width={40}
              className="cursor-pointer"
            />
          </Link>
        </div>
        {desktopNav}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
          <Button
            className="text-white px-6 py-3 bg-ghost rounded-full transition-colors duration-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {activeSection}
            <span className="ml-5">
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
          {isDropdownOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white rounded-md shadow-lg flex flex-col justify-center">
              {sections.map((section) => {
                if (isHomePage && section.id === "hero") {
                  return;
                } else {
                  return (
                    <Link href={section.href} key={section.id}>
                      <Button
                        key={section.id}
                        value={section.id}
                        name={section.label}
                        className="block w-full text-left px-4 py-2 bg-black hover:bg-gray-700 transition-all duration-300 hover:underline underline-offset-4 decoration-transparent hover:decoration-current"
                        onClick={handleClick}
                      >
                        {section.label}
                      </Button>
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div className="px-4 py-2">
          <BookNowButton extraClasses="rounded-full bg-transparent hover:bg-gray-200 text-white hover:text-black transition-colors duration-300 border border-white" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
