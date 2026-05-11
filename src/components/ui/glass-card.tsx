import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "primary" | "accent" | "none";
  hoverable?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  glow = "none", 
  hoverable = true,
  ...props 
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        hoverable && "hover:bg-white/[0.07] hover:border-white/20 hover:scale-[1.01]",
        glow === "primary" && "glow-primary",
        glow === "accent" && "glow-accent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}