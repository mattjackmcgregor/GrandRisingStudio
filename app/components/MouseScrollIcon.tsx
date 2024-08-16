import React from "react";

const MouseScrollIcon = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <div className="w-[1.5px] py-[5px] px-[7.5px] h-[17.5px] border border-white rounded-[12.5px] opacity-75 box-content">
        <div className="w-[1.5px] h-[5px] rounded-[25%] bg-white animate-scroll"></div>
      </div>
      <p className="text-xs opacity-50 mt-2">Scroll down</p>
    </div>
  );
};

export default MouseScrollIcon;
