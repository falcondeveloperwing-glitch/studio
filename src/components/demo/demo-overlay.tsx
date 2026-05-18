'use client';

import React from 'react';
import { useDemo } from './demo-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, X, ChevronRight, ArrowRight, MousePointer2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DemoOverlay() {
  const { isActive, currentStep, stopDemo, nextStep, cursorPos, isClicking } = useDemo();

  if (!isActive) return null;

  const stepLabels: Record<string, string> = {
    landing: "Converting DMs into Revenue",
    login: "Infrastructure Authentication",
    dashboard: "Business Performance Overview",
    inbox: "Intelligent Sales Engagement",
    automations: "Deploying Conversion Logic",
    analytics: "Real-time Sales Impact",
    pricing: "Infrastructure Scaling",
    complete: "Demo Concluded"
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {/* Cinematic Human-Like Cursor Overlay */}
        <motion.div
          animate={{ 
            x: `${cursorPos.x}vw`, 
            y: `${cursorPos.y}vh`,
            scale: isClicking ? 0.8 : 1,
            // Subtle "jitter" to simulate human motor control
            rotate: isClicking ? -5 : 0
          }}
          transition={{ 
            type: "spring", 
            damping: 35, 
            stiffness: 90,
            mass: 1.2,
            scale: { duration: 0.15 }
          }}
          className="absolute top-0 left-0 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)] z-[10001]"
        >
          <MousePointer2 size={24} fill="white" strokeWidth={1.2} />
          {isClicking && (
            <div className="click-ripple absolute top-0 left-0" />
          )}
        </motion.div>

        {/* Cinematic End Screen */}
        {currentStep === 'complete' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#020203] flex items-center justify-center p-8 pointer-events-auto z-[10002]"
          >
            <div className="max-w-3xl w-full text-center space-y-12">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.03]"
              >
                <Zap size={20} className="text-white fill-white" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500">Infrastructure Finalized</span>
              </motion.div>
              
              <div className="space-y-8">
                <h2 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter text-white">
                  Automate your <span className="text-zinc-600">sales fleet</span>.
                </h2>
                <p className="text-lg text-zinc-500 font-medium max-w-xl mx-auto leading-relaxed">
                  Enterprise-grade infrastructure for high-performance Instagram commerce. Every inquiry is a checkout opportunity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-zinc-200 rounded-xl px-10 h-14 text-sm font-bold group shadow-2xl transition-all active:scale-95"
                  onClick={stopDemo}
                >
                  Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl px-10 h-14 text-sm font-bold transition-all active:scale-95"
                  onClick={() => { stopDemo(); window.location.href = '/pricing'; }}
                >
                  View Infrastructure
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Global Demo HUD */}
        {currentStep !== 'complete' && (
          <motion.div 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 pointer-events-auto"
          >
            <div className="bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-5 shadow-[0_32px_80px_rgba(0,0,0,0.8)] flex items-center justify-between gap-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
                  <Play size={18} className="text-white fill-white animate-pulse" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-1">Guided Simulation</p>
                  <h4 className="text-sm font-bold text-white flex items-center gap-3">
                    {stepLabels[currentStep]}
                    <Loader2 size={12} className="animate-spin text-zinc-700" />
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={nextStep}
                  className="h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/5"
                >
                  Skip <ChevronRight size={14} className="ml-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={stopDemo}
                  className="h-10 w-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/10"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
