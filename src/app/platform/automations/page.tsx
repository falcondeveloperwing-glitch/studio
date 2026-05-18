
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, Bot, ArrowLeft, ArrowRight, Play, Shield } from 'lucide-react';

export default function AutomationsMarketingPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-white/10 font-body">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/platform" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Platform</span>
          </Link>
          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg h-9 px-4 text-[10px] font-black uppercase tracking-widest">Get Started</Button>
          </Link>
        </div>
      </nav>

      <div className="container max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-24">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-8">
            <Zap size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter mb-8">Visual Automations</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Revenue-driven logic workflows. Deploy sophisticated responses that trigger automatically based on real customer scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { title: "Abandoned Leads", desc: "Automatically follow up with customers who inquired but didn't convert.", icon: Play },
            { title: "Smart Triage", desc: "Escalate complex inquiries to human agents while AI handles the routine.", icon: Bot },
            { title: "Policy Guard", desc: "Ensure every automated response adheres to your specific shipping and return rules.", icon: Shield }
          ].map((item, i) => (
            <GlassCard key={i} className="border-white/5 bg-zinc-950/50 p-8">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 mb-6">
                <item.icon size={20} />
              </div>
              <h3 className="font-bold text-lg mb-3">{item.title}</h3>
              <p className="text-zinc-600 text-xs leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>

        <section className="space-y-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-6">Trigger-Action Architecture</h2>
              <p className="text-zinc-500 mb-8 leading-relaxed text-sm">
                Build your workflows by defining clear triggers (e.g., "Customer asks for discount") and specific actions (e.g., "Provide 10% coupon if sentiment is positive"). 
              </p>
              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01] space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                  Example Workflow
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10">Stock Inquiry</span>
                  <ArrowRight size={14} className="text-zinc-700" />
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-emerald-500">Check Inventory & Respond</span>
                </div>
              </div>
            </div>
            <GlassCard className="border-white/10 bg-zinc-950 aspect-square flex items-center justify-center italic text-zinc-600 text-xs">
              [Visual Workflow Builder UI]
            </GlassCard>
          </div>
        </section>

        <div className="mt-32 p-12 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent text-center">
          <h2 className="text-4xl font-bold font-headline mb-8">Deploy conversion logic in minutes.</h2>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-xl px-12 h-16 font-bold">Start Building Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
