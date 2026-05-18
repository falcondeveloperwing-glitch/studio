
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, MessageSquare, Users, Search, Bot, ArrowLeft } from 'lucide-react';

export default function InboxMarketingPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-white/10 font-body">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/platform" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Platform</span>
          </Link>
          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg h-9 px-4 text-[10px] font-black uppercase tracking-widest">Deploy Now</Button>
          </Link>
        </div>
      </nav>

      <div className="container max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-24">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-8">
            <MessageSquare size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter mb-8">Intelligent Inbox</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            The CRM-style DM ecosystem designed for high-performance commerce teams. Manage thousands of conversations with sub-second latency.
          </p>
        </div>

        <div className="space-y-12 mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-headline">Intent Detection</h3>
              <p className="text-zinc-500 leading-relaxed mb-6 text-sm">
                Our AI analyzes every incoming DM to detect buying signals, customer sentiment, and urgency levels before your team even opens the thread.
              </p>
              <ul className="space-y-3 text-xs font-bold text-zinc-400">
                <li className="flex items-center gap-3"><Bot size={14} className="text-zinc-600" /> High-intent lead scoring</li>
                <li className="flex items-center gap-3"><Search size={14} className="text-zinc-600" /> Automated query categorization</li>
              </ul>
            </div>
            <GlassCard className="border-white/10 bg-zinc-950/50 aspect-video flex items-center justify-center italic text-zinc-600 text-xs">
              [Unified Inbox UI Preview]
            </GlassCard>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <GlassCard className="border-white/10 bg-zinc-950/50 aspect-video flex items-center justify-center italic text-zinc-600 text-xs order-2 md:order-1">
              [Collaboration Tools Preview]
            </GlassCard>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-4 font-headline">Team Collaboration</h3>
              <p className="text-zinc-500 leading-relaxed mb-6 text-sm">
                Assign threads to specific agents, leave internal notes, and track performance across your entire support fleet in one unified interface.
              </p>
              <ul className="space-y-3 text-xs font-bold text-zinc-400">
                <li className="flex items-center gap-3"><Users size={14} className="text-zinc-600" /> Granular thread assignment</li>
                <li className="flex items-center gap-3"><Zap size={14} className="text-zinc-600" /> Collision detection logic</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-12 rounded-3xl border border-white/5 bg-white/[0.02] text-center">
          <h2 className="text-3xl font-bold font-headline mb-6">Zero Response Latency.</h2>
          <p className="text-zinc-500 mb-10 text-sm max-w-lg mx-auto">Reduce your response times from hours to seconds with AI-driven suggestions and automated handling.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-xl px-12 h-16 font-bold">Start Free Trial</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
