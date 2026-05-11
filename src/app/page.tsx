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
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-white/10 overflow-hidden font-body">
      {/* Navigation */}
      <nav className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <Zap className="text-black" size={18} fill="black" />
            </div>
            <span className="font-bold text-lg tracking-tight">ReplyRush</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>

          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg px-5 h-10 text-sm font-semibold transition-all">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-32 pb-40 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now Powered by Gemini 2.0
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.95] text-balance">
            Your AI Instagram <br />Sales Team.
          </h1>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Reply instantly, recover lost customers, and automate commerce conversations 24/7 with professional AI agents.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-xl px-10 h-14 text-base font-bold group shadow-2xl">
                Deploy AI Agent <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="lg" className="text-zinc-400 hover:text-white rounded-xl px-10 h-14 text-base font-medium">
                View Live Demo <ChevronRight size={18} className="ml-1 opacity-50" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-24 relative max-w-6xl mx-auto"
        >
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-2 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden aspect-video relative">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
            <img 
              src="https://picsum.photos/seed/replyrush_v2/1200/800" 
              alt="Dashboard Preview" 
              className="w-full h-full object-cover rounded-xl opacity-80"
            />
          </div>
          {/* Floating Metrics */}
          <div className="absolute -top-10 -left-10 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl hidden lg:block w-72 text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Revenue Recaptured</span>
              <TrendingUp className="text-emerald-500" size={14} />
            </div>
            <p className="text-3xl font-bold tracking-tight">$14,285.00</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
              <span className="text-emerald-500 font-bold">+12%</span> vs last week
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="container mx-auto px-6 py-40 border-t border-zinc-900">
        <div className="grid md:grid-cols-3 gap-20">
          {[
            { 
              title: "Instant Response", 
              icon: Zap, 
              desc: "Deploy neural agents that respond to high-intent product inquiries in under 1 second, ensuring no lead goes cold." 
            },
            { 
              title: "Sales Intelligence", 
              icon: MessageSquare, 
              desc: "Trained logic to move customers from curiosity to checkout using sentiment-driven scarcity triggers." 
            },
            { 
              title: "Enterprise Trust", 
              icon: ShieldCheck, 
              desc: "Built-in escalation protocols that seamlessly hand over complex logistics issues to your human support team." 
            }
          ].map((feature, i) => (
            <div key={i} className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <feature.icon size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-24 bg-zinc-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Zap size={16} fill="white" />
            </div>
            <span className="font-bold tracking-tight">ReplyRush AI</span>
          </div>
          <div className="flex gap-12 text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">
            <Link href="#" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-[11px] text-zinc-600 font-medium">© 2025 ReplyRush AI. Optimized for high-volume commerce.</p>
        </div>
      </footer>
    </div>
  );
}
