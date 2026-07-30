"use client";

import React, {Suspense} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Mousewheel, Pagination} from "swiper/modules";
import {useRouter, useSearchParams} from "next/navigation";
import {getCategory} from "@/service/category";
import {cn} from "@/lib/cn";
import "swiper/css";
import "swiper/css/pagination";
import Loading from "./loading";

const CategoryContent = () => {
  const [category, setCategory] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const data = await getCategory();
        setCategory(data);
      } catch (error) {
        console.log("failed to fetch data" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, []);

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug && categorySlug !== activeCategory) {
      params.set("category", categorySlug);
    } else {
      params.delete("category");
    }
    params.delete("search");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="bg-white py-2 px-5 rounded-md  flex items-center gap-3">
      {isLoading ? (
        <div className="flex items-center gap-3">
          {Array.from({length: 10}).map((_, i) => (
            <div
              key={i}
              className="h-12 w-30 bg-gray-200 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="bg-white py-2 px-5 rounded-md  flex items-center gap-3">
          <button
            onClick={() => handleCategoryClick("")}
            className={`py-2 px-3 rounded-md border text-xs capitalize transition w-fit whitespace-nowrap ${
              activeCategory === ""
                ? "border-amber-500 bg-amber-50 font-bold text-amber-700"
                : "border-gray-300 hover:border-amber-300 text-gray-700"
            }`}
          >
            All Categories
          </button>
          <div className="w-1 h-8 bg-gray-300" />

          <Swiper
            className="w-full relative"
            slidesPerView={"auto"}
            loop={true}
            mousewheel={{forceToAxis: true}}
            spaceBetween={12}
            modules={[Pagination, Mousewheel]}
          >
            {category.map((cat, index) => {
              const isActive = activeCategory === cat;
              return (
                <SwiperSlide key={index} className="w-auto!">
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className={cn(
                      "w-full py-2 px-3 rounded-md border text-xs capitalize transition whitespace-nowrap cursor-pointer",
                      isActive
                        ? "border-amber-500 bg-amber-50 font-bold text-amber-700"
                        : "border-gray-300 hover:border-amber-300 text-gray-700",
                    )}
                  >
                    {cat.replace("-", " ")}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

const CategoryCollection = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryContent />
    </Suspense>
  );
};

export default CategoryCollection;
