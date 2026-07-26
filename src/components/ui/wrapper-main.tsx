import React, {forwardRef} from "react";

interface WrapperMainProps {
  className?: string;
  children?: React.ReactNode;
}

const WrapperMain = forwardRef<HTMLDivElement, WrapperMainProps>(
  ({className, children, ...props}, ref) => {
    return (
      <div ref={ref} {...props} className={className}>
        {children}
      </div>
    );
  },
);

WrapperMain.displayName = "WrapperMain";

export default WrapperMain;
