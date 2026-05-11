import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "primary" | "accent" | "none";
  hoverable?: boolean;
  variant?: "default" | "darker" | "borderless";
}

export function GlassCard({ 
  children, 
  className, 
  glow = "none", 
  hoverable = true,
  variant = "default",
  ...props 
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-500 relative overflow-hidden group",
        variant === "default" && "glass",
        variant === "darker" && "glass-darker",
        variant === "borderless" && "bg-white/[0.02] backdrop-blur-xl",
        hoverable && "hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1",
        glow === "primary" && "glow-primary",
        glow === "accent" && "shadow-[0_0_30px_-5px_hsl(var(--accent)/0.3)]",
        className
      )}
      {...props}
    >
      {/* Subtle Inner Glow */}
      <div className="absolute inset-px rounded-[inherit] bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
