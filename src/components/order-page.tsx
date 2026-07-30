"use client";
import React from "react";
import ProductCard from "./product-card";
import {useDebounce} from "@/hooks/use-debounce";
import {useSearchParams} from "next/navigation";
import WrapperMain from "./ui/wrapper-main";
import CategoryCollection from "./category-collection";
import Cart from "./cart";

const OrderPage = () => {
  const searchParams = useSearchParams();
  const rawSearch = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const debouncedSearch = useDebounce(rawSearch, 500);
  return (
    <WrapperMain className="grid  md:grid-cols-[1fr_320px] gap-5 h-full overflow-hidden">
      <div className="flex flex-col gap-2 h-full min-w-0 overflow-hidden">
        <ProductCard searchQuery={debouncedSearch} categoryQuery={category} />
        <CategoryCollection />
      </div>
      <Cart />
    </WrapperMain>
  );
};

export default OrderPage;
