import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="bg-yellow-100 rounded-full w-15 h-15 relative shrink-0">
      <Image
        src={"/logo.svg"}
        alt="logo"
        fill
        priority
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
