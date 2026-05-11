'use client';

import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  variant?: "default" | "darker" | "borderless";
}

export function GlassCard({ 
  children, 
  className, 
  hoverable = true,
  variant = "default",
  ...props 
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        variant === "default" && "bg-zinc-900/30 border-white/[0.06] shadow-sm",
        variant === "darker" && "bg-black/40 border-white/[0.04]",
        variant === "borderless" && "border-transparent bg-transparent",
        hoverable && "hover:border-white/10 hover:bg-zinc-900/50",
        className
      )}
      {...props}
    >
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}
