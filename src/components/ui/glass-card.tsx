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
        "rounded-[2.5rem] p-8 transition-all duration-700 relative overflow-hidden group",
        variant === "default" && "glass",
        variant === "darker" && "glass-darker",
        variant === "borderless" && "bg-white/[0.01] backdrop-blur-2xl",
        hoverable && "hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
        glow === "primary" && "glow-primary border-primary/20",
        glow === "accent" && "shadow-[0_0_40px_-5px_hsl(var(--accent)/0.3)] border-accent/20",
        className
      )}
      {...props}
    >
      <div className="absolute inset-px rounded-[inherit] bg-gradient-to-br from-white/[0.1] via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 noise z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}