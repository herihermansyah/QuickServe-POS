import {cn} from "@/lib/cn";
import React, {forwardRef} from "react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "flex flex-col gap-3 rounded-md p-2 shadow-dropdown bg-white",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn("flex flex-col gap-0.5", className)}
      >
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, CardProps>(
  ({className, children, ...props}, ref) => {
    return (
      <h3
        ref={ref}
        {...props}
        className={cn("truncate font-semibold", className)}
      >
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "CardTitle";

const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn("flex items-center justify-between", className)}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";

const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn("flex flex-col gap-2", className)}
      >
        {children}
      </div>
    );
  },
);

CardContent.displayName = "CardContent";

export {Card, CardHeader, CardTitle, CardFooter, CardContent};
