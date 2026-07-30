"use client";
import Loading from "@/components/loading";
import Logo from "@/components/logo";
import SearchBar from "@/components/search-bar";
import WrapperMain from "@/components/ui/wrapper-main";
import {useRouter, useSearchParams} from "next/navigation";
import React, {Suspense} from "react";

const HeaderSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("category");
    router.replace(`?${params.toString()}`);
  };
  return <SearchBar value={search} onChange={handleSearch} />;
};

const Header = () => {
  return (
    <WrapperMain className="flex items-center justify-between gap-10">
      <Logo />
      <div className="w-full md:w-1/2">
        <Suspense fallback={<Loading />}>
          <HeaderSearchParams />
        </Suspense>
      </div>
    </WrapperMain>
  );
};

export default Header;
