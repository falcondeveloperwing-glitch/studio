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
        "rounded-xl border transition-all duration-200 active:scale-[0.99]",
        variant === "default" && "bg-zinc-900/40 border-zinc-800 shadow-sm",
        variant === "darker" && "bg-zinc-950 border-zinc-800",
        variant === "borderless" && "border-transparent bg-transparent",
        hoverable && "hover:border-zinc-700 hover:bg-zinc-900/60",
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
