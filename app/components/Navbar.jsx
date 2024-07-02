"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import BookNowButton from "./BookNowButton";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "teamOverview", label: "Team" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [position, setPosition] = useState("Home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 30) {
        setShowNav(true);
      } else {
        setShowNav(false);
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (e) => {
    console.log(e.target.value);
    setPosition(e.target.name);
    setIsDropdownOpen(false);
    document.getElementById(e.target.value)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <>
      {showNav && (
        <nav className="bg-black flex justify-between items-center top-0 left-0 right-0 z-50 fixed w-screen">
          <div className=" px-4 py-2 ">
            <Link href="/">
              <Image
                src="https://res.cloudinary.com/deiv1hpqw/image/upload/v1719897432/compressedLogo_lq4ksg.png"
                alt="Grand Rising Logo"
                height={40}
                width={40}
                className="cursor-pointer"
                priority
              />
            </Link>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 ">
            <Button
              className=" text-white px-6 py-3 bg-ghost rounded-full transition-colors duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {position}
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
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    value={section.id}
                    name={section.label}
                    className="block w-full text-left px-4 py-2 bg-black hover:bg-gray-700 transition-all duration-300 hover:underline underline-offset-4 decoration-transparent hover:decoration-current"
                    onClick={handleClick}
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="px-4 py-2">
            <BookNowButton extraClasses=" rounded-full hover:bg-gray-200 hover:text-black transition-colors duration-300 " />
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
