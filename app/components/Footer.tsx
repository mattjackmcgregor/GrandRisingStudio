import Image from "next/image";

const Footer = () => (
  <footer className="bg-slate-950 text-white py-6">
    <div className="container mx-auto flex flex-col md:flex-row sm:flex-wrap items-center justify-between px-8 border-t border-gray-700">
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
            loading="lazy"
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
            loading="lazy"
          />
        </a>
        <a
          href="https://www.tiktok.com/@grandrising.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2 hover:text-gray-500"
        >
          <Image
            src="/tiktok-logo.svg"
            alt="TikTok"
            width={30}
            height={30}
            loading="lazy"
          />
        </a>
      </div>
      <p className="text-center md:text-start text-gray-400 mt-4">
        GRANDRISINGSTUDIOS{new Date().getFullYear()}&copy;
      </p>
    </div>
  </footer>
);

export default Footer;
