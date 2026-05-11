'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  TrendingUp,
  ChevronRight,
  Lock
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-hidden font-body">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="text-black" size={18} fill="black" />
            </div>
            <span className="font-bold text-lg tracking-tight">ReplyRush AI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-400">
            <Link href="#infrastructure" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>

          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg px-6 h-10 text-sm font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-48 text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/30 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            AI Sales Infrastructure for Instagram
          </div>
          <h1 className="text-5xl md:text-8xl font-bold font-headline tracking-tighter mb-8 leading-[0.9]">
            Your Instagram <br />Sales Engine.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Reply instantly, negotiate bulk deals, and recover abandoned leads 24/7 with autonomous sales logic.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-xl px-12 h-14 text-base font-bold group shadow-xl">
                Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="border-zinc-800 text-zinc-400 hover:text-white rounded-xl px-12 h-14 text-base font-medium bg-zinc-900/10">
                View Pricing <ChevronRight size={18} className="ml-1 opacity-50" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="infrastructure" className="container mx-auto px-6 py-40 border-t border-zinc-900">
        <div className="grid md:grid-cols-3 gap-16">
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
              <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center mb-8 transition-colors group-hover:border-zinc-700">
                <feature.icon size={22} className="text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-zinc-900/10 border-y border-zinc-900 py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight mb-8">Built for High-Volume Commerce.</h2>
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
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Average Latency</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">3.4x</p>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Sales ROI Avg.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <Zap size={16} className="text-zinc-400" />
            <span className="font-bold tracking-tight text-zinc-300">ReplyRush AI</span>
          </div>
          <div className="flex gap-10 text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <p className="text-[11px] text-zinc-800 font-medium">© 2025 ReplyRush AI. Engineering modern sales.</p>
        </div>
      </footer>
    </div>
  );
}
