import React, { forwardRef } from "react";

export const VintageInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full py-3 my-2 bg-transparent border-none border-b border-[#a69076] font-serif text-lg outline-none text-foreground placeholder:text-muted-foreground placeholder:italic focus:border-primary focus:border-b-2 transition-all ${className}`}
        {...props}
      />
    );
  }
);
VintageInput.displayName = "VintageInput";
