
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, Bot, ArrowLeft, ArrowRight, Play, Shield, Terminal, Settings } from 'lucide-react';

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
          <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter mb-8 text-white">Visual Automations</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Revenue-driven logic workflows. Deploy sophisticated responses that trigger automatically based on real-time customer behavior signals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { title: "Abandoned Leads", desc: "Automatically follow up with customers who inquired about pricing but didn't convert.", icon: Play },
            { title: "Smart Triage", desc: "Escalate complex logistics inquiries to human agents while AI handles inventory routine.", icon: Bot },
            { title: "Policy Guard", desc: "Ensure every automated response adheres to your specific shipping and return rules.", icon: Shield }
          ].map((item, i) => (
            <GlassCard key={i} className="border-white/5 bg-zinc-950/50 p-8">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 mb-6">
                <item.icon size={20} />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white">{item.title}</h3>
              <p className="text-zinc-600 text-xs leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>

        <section className="space-y-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-6 text-white">Trigger-Action Logic</h2>
              <p className="text-zinc-500 mb-8 leading-relaxed text-sm">
                Build your workflows by defining deterministic triggers and specific AI actions. No complex code, just business logic.
              </p>
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">
                    <Terminal size={12} /> Execution Node v1.0
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white">Stock Inquiry</span>
                    <ArrowRight size={14} className="text-zinc-700" />
                    <span className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">Check Inventory & Reply</span>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">
                    <Terminal size={12} /> Execution Node v1.1
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white">Price Inquiry</span>
                    <ArrowRight size={14} className="text-zinc-700" />
                    <span className="px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-500">Apply Bulk Tier Discount</span>
                  </div>
                </div>
              </div>
            </div>
            
            <GlassCard className="border-white/10 bg-zinc-950 p-0 overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <Settings size={12} className="text-zinc-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Workflow Designer</span>
                </div>
              </div>
              <div className="p-8 flex flex-col items-center justify-center min-h-[300px] space-y-8">
                <div className="w-48 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">Incoming DM</div>
                <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <Bot size={20} />
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
                <div className="w-48 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-emerald-500">Automated Response</div>
              </div>
            </GlassCard>
          </div>
        </section>

        <div className="mt-32 p-16 rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent text-center">
          <h2 className="text-4xl font-bold font-headline mb-8 text-white">Deploy conversion logic in minutes.</h2>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-xl px-12 h-16 font-bold shadow-2xl">Start Building Workflows</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
