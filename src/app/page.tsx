'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck,
  Globe,
  BrainCircuit,
  Command,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-white/10 overflow-hidden font-body">
      {/* Navbar */}
      <nav className="border-b border-white/[0.05] bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Zap className="text-white fill-white" size={18} />
            <span className="font-semibold text-lg tracking-tight">ReplyRush</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors text-white">Sign In</Link>
          </div>

          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-md px-4 h-9 text-xs font-semibold shadow-sm">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-24 pb-32 text-center lg:text-left grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.03] text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-8">
            <span className="text-white">v1.0</span> • Neural Sales Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05]">
            Sales infrastructure for Instagram.
          </h1>
          <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
            ReplyRush automates your Instagram commerce through intelligent agents. Recover lost revenue and manage high-volume DMs with enterprise-grade precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-md px-8 h-12 text-sm font-semibold group shadow-lg">
                Deploy Agent <ArrowRight className="ml-2 group-hover:translate-x-0.5 transition-transform" size={16} />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="lg" className="text-zinc-400 hover:text-white rounded-md px-8 h-12 text-sm font-medium">
                View Dashboard <ChevronRight size={14} className="ml-1 opacity-50" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-lg border border-white/[0.05] bg-zinc-900/40 p-1 shadow-2xl overflow-hidden aspect-[4/3]">
            <Image 
              src="https://picsum.photos/seed/replyrush_hero/1200/900" 
              alt="Dashboard Preview" 
              fill 
              className="object-cover rounded-[4px] opacity-90 grayscale-[0.2]"
              data-ai-hint="SaaS dashboard"
            />
          </div>
          {/* Floating UI Elements */}
          <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-white/[0.08] p-5 rounded-lg shadow-2xl hidden md:block w-64 animate-in slide-in-from-left-4 duration-1000">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Revenue Recapture</span>
              <TrendingUp className="text-emerald-500" size={14} />
            </div>
            <p className="text-2xl font-bold tracking-tight">$14,285.00</p>
            <div className="mt-2 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-white w-2/3" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="container mx-auto px-6 py-32 border-t border-white/[0.05]">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { 
              title: "Instant Response", 
              icon: Zap, 
              desc: "Deploy neural agents that respond to product inquiries in <1 second, ensuring no lead goes cold." 
            },
            { 
              title: "Sales Intelligence", 
              icon: BrainCircuit, 
              desc: "Trained logic to move customers from questions to checkout using sentiment and scarcity triggers." 
            },
            { 
              title: "Unified Pipeline", 
              icon: Command, 
              desc: "Connect your Instagram DMs directly to your Shopify or custom ERP for real-time inventory sync." 
            }
          ].map((feature, i) => (
            <div key={i} className="space-y-5">
              <div className="w-10 h-10 rounded-md bg-zinc-900 border border-white/[0.08] flex items-center justify-center">
                <feature.icon size={18} className="text-white" />
              </div>
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-20 bg-zinc-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2.5">
            <Zap size={18} fill="white" />
            <span className="font-semibold tracking-tight">ReplyRush</span>
          </div>
          <div className="flex gap-10 text-[11px] font-medium text-zinc-500 uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">Legal</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-[11px] text-zinc-600">© 2025 ReplyRush AI. Built for high-volume commerce.</p>
        </div>
      </footer>
    </div>
  );
}
