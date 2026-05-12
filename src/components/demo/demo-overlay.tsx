'use client';

import React from 'react';
import { useDemo } from './demo-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, X, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function DemoOverlay() {
  const { isActive, currentStep, stopDemo, nextStep } = useDemo();

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
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        {/* Cinematic Final Screen */}
        {currentStep === 'complete' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black flex items-center justify-center p-6 pointer-events-auto"
          >
            <div className="max-w-2xl w-full text-center space-y-12">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5"
              >
                <Zap size={24} className="text-white fill-white" />
                <span className="text-sm font-bold tracking-[0.3em] uppercase">ReplyRush AI</span>
              </motion.div>
              
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
                  Turn conversations into <span className="text-zinc-500">revenue</span> automatically.
                </h2>
                <p className="text-xl text-zinc-500 font-medium">
                  The infrastructure for high-performance Instagram commerce.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-zinc-200 rounded-xl px-12 h-14 text-base font-bold group shadow-2xl"
                  onClick={stopDemo}
                >
                  Get Started Free <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl px-12 h-14 text-base font-bold"
                  onClick={() => { stopDemo(); window.location.href = '/pricing'; }}
                >
                  View Plans
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Floating HUD */}
        {currentStep !== 'complete' && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 pointer-events-auto"
          >
            <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative">
                  <Zap size={18} className="text-white fill-white" />
                  <div className="absolute inset-0 bg-white/10 animate-ping rounded-xl" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Product Demo Tour</p>
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
        )}
      </div>
    </AnimatePresence>
  );
}
