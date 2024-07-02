import React from "react";
import Image from "next/image";

const Footer = () => {
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus fringilla lorem,";

  return (
    <footer className="bg-slate-950 text-white py-6 ">
      <div className="container mx-auto flex flex-col md:flex-row sm:flex-wrap items-center justify-between px-8">
        <div className="w-full md:w-2/3 md:border-b border-white pb-8">
          <p className="text-gray-400 text-center sm:text-start">
            {loremIpsum}
          </p>
        </div>
        <div className="flex md:w-1/3 justify-center items-center mt-4 md:mt-0">
          <a
            href="https://www.instagram.com/grandrising.studios/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 hover:text-gray-500"
          >
            <Image
              src="/ig-logo-inverse.svg"
              alt="Instagram"
              width={30}
              height={30}
            />
          </a>
          <a
            href="https://www.facebook.com/people/Grand-Rising-Studio/100063896923567/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 hover:text-gray-500"
          >
            <Image
              src="/facebook-logo.svg"
              alt="Facebook"
              width={30}
              height={30}
            />
          </a>
          <a
            href="https://www.tiktok.com/@grandrising.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 hover:text-gray-500"
          >
            <Image src="/tiktok-logo.svg" alt="TikTok" width={30} height={30} />
          </a>
        </div>
        <p className="text-center md:text-start text-gray-400 mt-4">
          GRANDRISINGSTUDIOS2023©
        </p>
      </div>
    </footer>
  );
};

export default Footer;
