import Image from "next/image";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-slate-950 text-white py-4">
    <div className="px-16 flex flex-col md:flex-row sm:flex-wrap items-center justify-between px-8 border-t border-gray-700">
      <div className="flex md:w-1/3 space-x-4 ">
        <a
          href="https://instagram.com/grandrisingstudios"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl mt-4 hover:text-pink-500 transition-colors duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="https://facebook.com/grandrisingstudios"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl mt-4  hover:text-blue-500 transition-colors duration-300"
        >
          <FaFacebook />
        </a>
      </div>
      <div className="flex justify-ceter items-center">
        <p className="text-center md:text-start text-gray-400 mt-4">
          © GRANDRISINGSTUDIOS {new Date().getFullYear()}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
