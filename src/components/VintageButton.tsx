import React from "react";

interface VintageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export function VintageButton({ children, className = "", variant = "primary", ...props }: VintageButtonProps) {
  const baseStyles = "font-serif font-variant-small-caps tracking-widest px-8 py-3 text-lg cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase";
  
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-[2px_2px_5px_rgba(0,0,0,0.3)] hover:bg-[#a30000] hover:-translate-y-[1px] active:translate-y-[1px]",
    outline: "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
