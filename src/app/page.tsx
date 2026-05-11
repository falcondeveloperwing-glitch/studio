'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  Globe,
  Lock
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-zinc-800 overflow-hidden font-body">
      {/* Strict Navigation */}
      <nav className="border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="text-black" size={18} fill="black" />
            </div>
            <span className="font-bold text-lg tracking-tight">ReplyRush AI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-400">
            <Link href="#infrastructure" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="#logic" className="hover:text-white transition-colors">Logic</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>

          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg px-6 h-10 text-sm font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section - Minimalist & High-Impact */}
      <section className="container mx-auto px-6 pt-32 pb-48 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
            Production-Grade AI Sales Agent
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-white">
            Your Instagram <br />Sales Engine.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Reply instantly, negotiate bulk deals, and recover abandoned leads 24/7 with autonomous sales logic.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-xl px-12 h-14 text-base font-bold group shadow-xl">
                Deploy Agent <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="border-white/10 text-zinc-400 hover:text-white rounded-xl px-12 h-14 text-base font-medium bg-white/[0.02]">
                Explore Demo <ChevronRight size={18} className="ml-1 opacity-50" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid - Disciplined Spacing */}
      <section id="infrastructure" className="container mx-auto px-6 py-40 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
          {[
            { 
              title: "Neural Response", 
              icon: Zap, 
              desc: "Deploy agents that respond to high-revenue inquiries in <100ms, maintaining sales momentum without human intervention." 
            },
            { 
              title: "Commerce Logic", 
              icon: MessageSquare, 
              desc: "Sophisticated pricing and inventory awareness designed to move customers from curiosity to confirmed checkout." 
            },
            { 
              title: "Enterprise Shield", 
              icon: Lock, 
              desc: "Automated escalation protocols that protect your brand while ensuring complex inquiries reach your staff immediately." 
            }
          ].map((feature, i) => (
            <div key={i} className="group">
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 transition-colors group-hover:border-white/20">
                <feature.icon size={22} className="text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section - Data-Driven */}
      <section className="bg-white/[0.01] border-y border-white/5 py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Built for High-Volume Commerce.</h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-medium mb-12">
              ReplyRush AI is more than a chatbot. It is a sales infrastructure tool that manages inventory, applies loyalty logic, and recovers revenue that would otherwise be lost to silence.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              <div>
                <p className="text-3xl font-bold mb-1">92%</p>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Inquiry Recovery</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">0.08s</p>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Neural Latency</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">3.4x</p>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Sales ROI Avg.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal & Professional */}
      <footer className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Zap size={16} className="text-zinc-400" />
            </div>
            <span className="font-bold tracking-tight text-zinc-300">ReplyRush AI</span>
          </div>
          <div className="flex gap-10 text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">API Docs</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Status</Link>
          </div>
          <p className="text-[11px] text-zinc-700 font-medium">© 2025 ReplyRush AI. Engineering modern sales.</p>
        </div>
      </footer>
    </div>
  );
}
