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
        "rounded-[3rem] p-12 transition-all duration-1000 relative overflow-hidden group",
        variant === "default" && "glass",
        variant === "darker" && "glass-darker",
        variant === "borderless" && "bg-white/[0.01] backdrop-blur-[60px]",
        hoverable && "hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-3 hover:shadow-4xl",
        glow === "primary" && "glow-primary border-primary/20",
        glow === "accent" && "shadow-[0_0_60px_-10px_hsl(var(--accent)/0.4)] border-accent/20",
        className
      )}
      {...props}
    >
      <div className="absolute inset-px rounded-[inherit] bg-gradient-to-br from-white/[0.12] via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="absolute inset-0 noise z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[2s]" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
