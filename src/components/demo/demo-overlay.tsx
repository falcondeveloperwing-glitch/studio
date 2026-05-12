'use client';

import React from 'react';
import { useDemo } from './demo-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, X, ChevronRight, ArrowRight, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DemoOverlay() {
  const { isActive, currentStep, stopDemo, nextStep, cursorPos, isClicking } = useDemo();

  if (!isActive) return null;

  const stepLabels: Record<string, string> = {
    landing: "Converting DMs into Revenue",
    login: "Authenticating AI Fleet",
    dashboard: "Business Intelligence Overview",
    inbox: "AI-Driven Sales Conversations",
    automations: "Deploying Operational Logic",
    analytics: "Real-time Sales Impact",
    pricing: "Scaling with Growth Plan",
    complete: "Demo Concluded"
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        {/* Human-like Cursor Simulation */}
        <motion.div
          animate={{ 
            x: `${cursorPos.x}vw`, 
            y: `${cursorPos.y}vh`,
            scale: isClicking ? 0.8 : 1
          }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 120,
            scale: { duration: 0.1 }
          }}
          className="absolute top-0 left-0 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] z-[10000]"
        >
          <MousePointer2 size={24} fill="white" />
          {isClicking && (
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              className="absolute top-0 left-0 w-6 h-6 rounded-full border border-white/50"
            />
          )}
        </motion.div>

        {/* Cinematic Final Screen */}
        {currentStep === 'complete' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#020203] flex items-center justify-center p-6 pointer-events-auto"
          >
            <div className="max-w-2xl w-full text-center space-y-12">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5"
              >
                <Zap size={24} className="text-white fill-white" />
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-400">ReplyRush AI</span>
              </motion.div>
              
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold font-headline tracking-tight text-white">
                  Conversations into <span className="text-zinc-600">revenue</span>.
                </h2>
                <p className="text-xl text-zinc-500 font-medium max-w-lg mx-auto leading-relaxed">
                  Enterprise infrastructure for high-performance Instagram commerce.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-zinc-200 rounded-2xl px-12 h-14 text-base font-bold group shadow-2xl transition-all active:scale-95"
                  onClick={stopDemo}
                >
                  Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-2xl px-12 h-14 text-base font-bold transition-all active:scale-95"
                  onClick={() => { stopDemo(); window.location.href = '/pricing'; }}
                >
                  View Infrastructure
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Floating HUD */}
        {currentStep !== 'complete' && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 pointer-events-auto"
          >
            <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative group">
                  <Zap size={20} className="text-white fill-white" />
                  <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-1">Infrastructure Demo</p>
                  <h4 className="text-sm font-bold text-white flex items-center gap-3">
                    {stepLabels[currentStep]}
                    <Loader2 size={14} className="animate-spin text-zinc-700" />
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={nextStep}
                  className="h-10 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/5 transition-all"
                >
                  Skip <ChevronRight size={14} className="ml-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={stopDemo}
                  className="h-10 w-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all"
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
