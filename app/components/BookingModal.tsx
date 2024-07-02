import React from "react";
import Image from "next/image";

interface Props {
  onClose: () => void;
}

export const BookingModal = ({ onClose }: Props) => {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-20">
      <div className="border-2 border-gray-300 flex flex-col justify-center items-center rounded text-center h-3/4 w-11/12 max-w-3xl z-50 ">
        <div className="flex flex-row items-center justify-between w-full ">
          <p className="p-4">GRANDRISINGSTUDIOS©</p>
          <span
            onClick={onClose}
            className=" relative top-0 right-0 p-4 cursor-pointer"
          >
            <Image
              src="/x-mark.svg"
              alt="exit"
              width={25}
              height={25}
              className="hover:bg-[#39464e]"
            />
          </span>
        </div>
        <iframe
          title="Booking"
          src="https://bookings.gettimely.com/grandrising/"
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
