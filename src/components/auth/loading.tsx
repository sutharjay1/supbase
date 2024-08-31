import Image from "next/image";
import React from "react";
import AppLogo from "../AppLogo";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <AppLogo
        width={120}
        height={120}
        className="animate-pulse duration-[0.9s] ease-in-out"
      />
    </div>
  );
};

export default Loading;
