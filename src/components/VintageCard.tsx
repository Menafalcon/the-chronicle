import React from "react";

interface VintageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
}

export function VintageCard({ children, className = "", delay = 0, ...props }: VintageCardProps) {
  return (
    <div
      className={`bg-card p-8 md:p-12 paper-shadow vintage-border relative ${className}`}
      {...props}
    >
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-foreground/30 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-foreground/30 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-foreground/30 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-foreground/30 pointer-events-none" />
      {children}
    </div>
  );
}