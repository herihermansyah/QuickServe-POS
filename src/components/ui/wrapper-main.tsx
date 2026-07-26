import {cn} from "@/lib/cn";
import React, {forwardRef} from "react";

interface WrapperMainProps {
  className?: string;
  children?: React.ReactNode;
}

const WrapperMain = forwardRef<HTMLDivElement, WrapperMainProps>(
  ({className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn("container mx-auto xl:w-main h-full", className)}
      >
        {children}
      </div>
    );
  },
);

WrapperMain.displayName = "WrapperMain";

export default WrapperMain;
