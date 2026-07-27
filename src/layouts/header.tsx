import Logo from "@/components/logo";
import SearchBar from "@/components/search-bar";
import WrapperMain from "@/components/ui/wrapper-main";
import React from "react";

const Header = () => {
  return (
    <WrapperMain className="flex items-center justify-between gap-10">
      <Logo />
      <div className="w-full md:w-1/2">
        <SearchBar />
      </div>
    </WrapperMain>
  );
};

export default Header;
