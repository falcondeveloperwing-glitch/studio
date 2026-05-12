'use client';

import React from 'react';
import { useDemo } from './demo-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DemoOverlay() {
  const { isActive, currentStep, stopDemo, nextStep } = useDemo();

  if (!isActive) return null;

  const stepLabels: Record<string, string> = {
    landing: "Introducing ReplyRush",
    login: "Authenticating Fleet",
    dashboard: "Workspace Intelligence",
    inbox: "AI-Driven Sales Inbox",
    automations: "Operational Logic",
    analytics: "Revenue Attribution",
    pricing: "Scale with Confidence",
    complete: "Demo Concluded"
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-lg px-6"
      >
        <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative">
              <Zap size={18} className="text-white fill-white" />
              <div className="absolute inset-0 bg-white/10 animate-ping rounded-xl" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Cinematic Demo Mode</p>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {stepLabels[currentStep]}
                <Loader2 size={12} className="animate-spin text-zinc-600" />
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={nextStep}
              className="h-9 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/5"
            >
              Skip <ChevronRight size={14} className="ml-1" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={stopDemo}
              className="h-9 w-9 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
