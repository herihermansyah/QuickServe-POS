"use client";
import React, {forwardRef} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "./ui/card";
import {CiTrash} from "react-icons/ci";
import Button from "./ui/button";
import {cn} from "@/lib/cn";
import {IoIosArrowUp} from "react-icons/io";
import {AnimatePresence, motion} from "motion/react";
import {useCartStore} from "@/store/use-cart-store";
import {formatCurrency} from "@/utils/format";
import Loading from "./loading";

interface CartProps {
  className?: string;
}

const CartContent = forwardRef<HTMLDivElement, CartProps>(
  ({className}, ref) => {
    const cartItems = useCartStore((state) => state.cartItems);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isMounted, setIsMounted] = React.useState(false);

    const incrementQuantity = useCartStore((state) => state.incrementQuantity);
    const decrementQuantity = useCartStore((state) => state.decrementQuantity);
    const removeFromCart = useCartStore((state) => state.romoveFromCart);
    const getSummeryCart = useCartStore((state) => state.getSummeryCart);

    const {subTotal, totalDiscount, taxAmount, grandTotal} = getSummeryCart();

    React.useEffect(() => {
      setTimeout(() => setIsLoading(false), 1000);
    }, []);

    React.useEffect(() => {
      setTimeout(() => {
        setIsMounted(true);
      }, 1000);
    }, []);

    return (
      <Card
        ref={ref}
        className={cn(
          "h-full bg-white flex-1 min-h-0 overflow-hidden p-0",
          "print:visible print:absolute print:inset-0 print:overflow-visible",
          "print:shadow-none print:px-50 print:h-fit",
          className,
        )}
      >
        <CardHeader className="pt-5">
          <CardTitle className="text-center">ORDER LIST</CardTitle>
          <div className="grid grid-cols-[1fr_90px_50px] items-center bg-amber-100 px-4 py-1 text-sm font-medium">
            <span className="text-left">NAME</span>
            <span className="text-center">QTY</span>
            <span className="text-right">PRICE</span>
          </div>
        </CardHeader>
        <CardContent className=" h-full flex-1 overflow-y-auto print:overflow-visible">
          {/* Item Row Grid */}
          {isLoading ? (
            <div className="h-full overflow-hidden">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="grid grid-cols-[1fr_70px_60px] print:grid-cols-[1fr_95px_60px] items-center px-3 py-2 print:py-0 text-sm"
                >
                  {/* Section Nama + Trash Icon */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="shrink-0 text-gray-500 hover:text-red-500 cursor-pointer transition-colors print:hidden"
                    >
                      <CiTrash size={18} />
                    </button>
                    {/* Truncate nama produk */}
                    <h3 className="truncate font-medium pr-3 print:pl-1">
                      {item.product.title}
                    </h3>
                  </div>

                  {/* Qty (Center) */}
                  <div className="flex items-center gap-3 relative z-5">
                    <Button
                      onClick={() => decrementQuantity(item.product.id)}
                      variant={"outline"}
                      className="p-0.5 print:hidden"
                    >
                      -
                    </Button>
                    <span className="font-bold text-[18px] border-b print:border-none border-green-700 flex items-center gap-10">
                      <span className="hidden print:block font-normal">x</span>
                      <span>{item.quantity}</span>
                    </span>
                    <Button
                      onClick={() => incrementQuantity(item.product.id)}
                      variant={"outline"}
                      className="p-0.5 print:hidden"
                    >
                      +
                    </Button>
                  </div>

                  {/* Price (Right) */}
                  <span className="text-right font-semibold">
                    {formatCurrency(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t print:mt-5 border-gray-300">
          <div className="flex flex-col gap-1 font-medium capitalize">
            <span>
              sub total :{" "}
              {isMounted ? formatCurrency(subTotal) : formatCurrency(0)}
            </span>
            <span>
              discount :{" "}
              {isMounted ? formatCurrency(totalDiscount) : formatCurrency(0)}
            </span>
            <div className="flex items-center gap-2">
              <span>tax 11 % :</span>
              <span>
                {isMounted ? formatCurrency(taxAmount) : formatCurrency(0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>total amount :</span>
              <span className="font-bold underline underline-offset-4">
                {isMounted ? formatCurrency(grandTotal) : formatCurrency(0)}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  },
);

CartContent.displayName = "CartContent";

const Cart = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const emptyCart = useCartStore((state) => state.clearCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const handlePrint = () => {
    return window.print();
  };

  return (
    <div className="h-full overflow-hidden flex flex-col gap-2 print:p-0">
      {/* background while pop up cart */}
      {isOpen && (
        <div className="bg-black/80 fixed inset-0 block lg:hidden print:hidden" />
      )}
      {/* content pop up cart */}
      <div className="block lg:hidden print:hidden">
        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0, scale: 0}}
              key="box"
              className="h-full absolute bottom-0 pt-20 pb-28 left-1/2 -translate-x-1/2 z-10 w-full px-4 sm:px-10"
            >
              <CartContent />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <CartContent className="hidden lg:flex print:block print:w-full" />

      <div className="flex flex-col gap-2 print:hidden">
        {/* button for open cart */}
        <motion.button
          whileTap={{y: 2}}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "bg-white w-full text-gray-500 py-1 rounded-md",
            "flex items-center justify-center",
            "cursor-pointer",
            "shadow-dropdown",
            isOpen && "rotate-180",
            "relative z-10",
            "lg:hidden",
          )}
        >
          <IoIosArrowUp size={20} />
        </motion.button>
        <div
          className={cn("grid grid-cols-[1fr_105px] gap-2 whitespace-nowrap")}
        >
          <Button
            onClick={handlePrint}
            size={"md"}
            className="justify-center relative z-15"
          >
            Print / Download
          </Button>
          {cartItems.length > 0 && (
            <Button
              onClick={emptyCart}
              className="justify-center relative z-15 bg-red-500"
            >
              Empty Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
