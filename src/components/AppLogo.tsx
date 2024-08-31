import Image from "next/image";
import React from "react";

const AppLogo = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      className={className}
      width={width || 120}
      height={height || 120}
    />
  );
};

export default AppLogo;
