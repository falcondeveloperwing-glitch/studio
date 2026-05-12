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
  ShieldCheck,
  Clock,
  CheckCircle2,
  Target
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 font-body">
      {/* Navigation */}
      <nav className="border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20 shadow-2xl">
              <Zap className="text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" size={20} />
            </div>
            <span className="font-headline text-xl font-bold tracking-tight text-white uppercase">
              Reply<span className="text-zinc-500">Rush</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>

          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg px-6 h-10 text-xs font-bold">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-6 pt-24 pb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-900 bg-zinc-900/40 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-8">
            Now in public beta
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight mb-8">
            Automate your Instagram sales.
          </h1>
          <p className="text-lg text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Respond to customer inquiries instantly, recover abandoned leads, and increase your conversion rate with automated sales logic.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-lg px-8 h-12 text-sm font-bold group">
                Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="border-zinc-800 text-zinc-400 hover:text-white rounded-lg px-8 h-12 text-sm font-medium bg-zinc-900/20">
                View Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Business Value Section */}
      <section className="py-24 border-y border-zinc-900 bg-zinc-950">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight mb-6">
              Recover lost sales instantly.
            </h2>
            <p className="text-zinc-500 text-lg font-medium">
              Businesses lose up to 40% of leads due to slow response times. ReplyRush automates the human bottleneck.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Instant Response", desc: "Respond to inquiries in under 1 second to capture purchase intent.", icon: Clock },
              { title: "Lead Recovery", desc: "Automatically follow up with customers who haven't completed checkout.", icon: Target },
              { title: "Sales Automation", desc: "Provide accurate pricing and availability for your entire inventory.", icon: CheckCircle2 },
              { title: "24/7 Operations", desc: "Qualify leads and close sales even while your team is offline.", icon: TrendingUp }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-zinc-900 bg-black hover:border-zinc-800 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center mb-6 text-zinc-500 group-hover:text-white transition-colors">
                  <item.icon size={18} />
                </div>
                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black">
        <div className="container max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Zap size={14} className="text-zinc-500" />
            <span className="font-bold text-sm tracking-tight text-zinc-400">ReplyRush</span>
          </div>
          <div className="flex gap-10 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <p className="text-[10px] text-zinc-800 font-bold uppercase tracking-widest">© 2025 ReplyRush</p>
        </div>
      </footer>
    </div>
  );
}
