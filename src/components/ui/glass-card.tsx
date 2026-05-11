
'use client';

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from 'framer-motion';

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
        "rounded-[2rem] p-8 transition-all duration-700 relative overflow-hidden group",
        variant === "default" && "glass",
        variant === "darker" && "glass-darker",
        variant === "borderless" && "bg-white/[0.02] backdrop-blur-3xl",
        hoverable && "hover:bg-white/[0.06] hover:border-white/15 hover:-translate-y-1.5",
        glow === "primary" && "glow-primary",
        glow === "accent" && "shadow-[0_0_40px_-5px_hsl(var(--accent)/0.3)]",
        className
      )}
      {...props}
    >
      {/* Dynamic Inner Glow Gradient */}
      <div className="absolute inset-px rounded-[inherit] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Noise Texture Layer */}
      <div className="absolute inset-0 noise z-0 opacity-[0.03] pointer-events-none" />
      
      {/* Subtle Bottom Shine */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
