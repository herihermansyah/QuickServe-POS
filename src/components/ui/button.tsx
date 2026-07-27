import React, {forwardRef} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/lib/cn";


const buttonVariants = cva(
  "capitalize font-semibold rounded-md disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 ",
  {
    variants: {
      variant: {
        fill: "bg-green-700 text-white disabled:bg-green-300",
        outline:
          "ring-2 ring-green-700 bg-white text-yellow-400 disabled:bg-gray-300 disabled:ring-green-300",
      },
      size: {
        sm: "py-2 px-3 text-[16px]",
        md: "py-2.5 px-5 text-[18px]",
      },
    },
    defaultVariants: {
      variant: "fill",
      size: "sm",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, children, variant, size, ...props}, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(buttonVariants({size, variant}), "", className)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
