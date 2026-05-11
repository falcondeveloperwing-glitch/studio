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
  TrendingUp
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 overflow-hidden">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="text-white fill-white" size={20} />
            <span className="font-bold text-xl tracking-tight">ReplyRush</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
          </div>

          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6 text-sm font-medium h-9">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-24 pb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-8">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            V1.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Automate your Instagram sales with AI.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed">
            Reply instantly to every DM, recover lost customers, and grow your business 24/7 with a neural sales fleet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full px-10 h-14 text-base font-semibold group">
                Deploy Your Agent <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="lg" className="text-zinc-400 hover:text-white rounded-full px-10 h-14 text-base font-medium">
                View Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-24 relative max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-2 shadow-2xl overflow-hidden aspect-[16/10]">
            <Image 
              src="https://picsum.photos/seed/saas-dashboard/1200/800" 
              alt="Dashboard Preview" 
              fill 
              className="object-cover rounded-xl opacity-80"
              data-ai-hint="SaaS dashboard"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6 py-32 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              title: "Instant Response", 
              icon: Zap, 
              desc: "Never lose a lead to response delay. AI handles initial inquiries in under 2 seconds." 
            },
            { 
              title: "Neural Sales", 
              icon: BrainCircuit, 
              desc: "Trained to move customers toward purchase with personalized scarcity and social proof." 
            },
            { 
              title: "CRM Sync", 
              icon: Command, 
              desc: "Integrate directly with Shopify, Klaviyo, and your existing business workflow." 
            }
          ].map((feature, i) => (
            <div key={i} className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
                <feature.icon size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap size={20} fill="white" />
            <span className="font-bold">ReplyRush</span>
          </div>
          <div className="flex gap-8 text-xs text-zinc-500 uppercase tracking-widest">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
          </div>
          <p className="text-xs text-zinc-600">© 2025 ReplyRush AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
