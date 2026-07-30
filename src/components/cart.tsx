"use client";
import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "./ui/card";
import {CiTrash} from "react-icons/ci";
import Button from "./ui/button";
import {useRouter} from "next/navigation";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

const cartData = Array.from({length: 5}).map((_, i) => ({
  id: 1 + i,
  name: "nama product yang sangat panjang",
  qty: 5,
  price: "$5000",
}));

const Cart = () => {
  const [isLoading, setIsloading] = React.useState(false);
 
  return (
    <div className="h-full overflow-hidden flex flex-col gap-5">
      <Card className="flex-1 min-h-0 overflow-hidden p-0">
        <CardHeader className="pt-5">
          <CardTitle className="text-center">CART</CardTitle>
          <div className="grid grid-cols-[1fr_90px_50px] items-center bg-amber-100 px-4 py-1 text-sm font-medium">
            <span className="text-left">name</span>
            <span className="text-center">qty</span>
            <span className="text-right">price</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          {/* Item Row Grid */}
          <div className="flex flex-col gap-2">
            {cartData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_70px_60px] items-center px-3 py-2 text-sm"
              >
                {/* Section Nama + Trash Icon */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <button className="shrink-0 text-gray-500 hover:text-red-500 cursor-pointer transition-colors">
                    <CiTrash size={18} />
                  </button>
                  {/* Truncate nama produk */}
                  <h3 className="truncate font-medium pr-3">{item.name}</h3>
                </div>

                {/* Qty (Center) */}
                <div className="flex items-center gap-3">
                  <Button variant={"outline"} className="p-0.5">
                    +
                  </Button>
                  <span className="font-bold text-[18px] border-b border-green-700">
                    {item.qty}
                  </span>
                  <Button variant={"outline"} className="p-0.5">
                    -
                  </Button>
                </div>

                {/* Price (Right) */}
                <span className="text-right font-semibold">{item.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t border-gray-300">
          <div className="flex flex-col gap-1 font-medium capitalize">
            <span>sub total: $100000</span>
            <span>discount: $10000</span>
            <span>
              tax :<span className="font-bold">11 %</span>
            </span>
            <span>
              total amount :
              <span className="font-bold underline underline-offset-4">
                $10000000,000
              </span>
            </span>
          </div>
        </CardFooter>
      </Card>

      <Button
        disabled={isLoading}
        size={"md"}
        className="justify-center"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-5">
            <span className="animate-spin">
              <AiOutlineLoading3Quarters />
            </span>
            <span>loading....</span>
          </div>
        ) : (
          "processs"
        )}
      </Button>
    </div>
  );
};

export default Cart;
