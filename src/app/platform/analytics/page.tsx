
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { TrendingUp, Database, ArrowLeft, ShieldCheck, History, BarChart3 } from 'lucide-react';

export default function AnalyticsMarketingPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-white/10 font-body">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/platform" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Platform</span>
          </Link>
          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg h-9 px-4 text-[10px] font-black uppercase tracking-widest">View Insights</Button>
          </Link>
        </div>
      </nav>

      <div className="container max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-24">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-8">
            <BarChart3 size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter mb-8">Grounded Analytics</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Non-repudiable performance data. Every metric is derived from real-time Firestore aggregation, ensuring absolute accuracy for your commerce fleet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <GlassCard className="border-white/5 bg-zinc-950/50 p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                <TrendingUp size={20} />
              </div>
              <h3 className="font-bold text-xl">Revenue Attribution</h3>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Track exactly how much revenue is recovered through AI automated responses and follow-ups. No more guessing the impact of your DM strategy.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Recovery Rate</p>
                <p className="text-2xl font-bold">31.4%</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Avg Lift</p>
                <p className="text-2xl font-bold">+18.5%</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="border-white/5 bg-zinc-950/50 p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                <History size={20} />
              </div>
              <h3 className="font-bold text-xl">Operational Audit</h3>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Every AI interaction and human operator action is recorded in a permanent audit log. Full transparency for your entire workspace.
            </p>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-700 w-2/3" />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <section className="py-24 border-t border-white/5 text-center">
          <h2 className="text-3xl font-bold font-headline mb-8">Built on honest infrastructure.</h2>
          <p className="text-zinc-500 mb-12 text-sm max-w-lg mx-auto">
            We don't simulate your growth. Our analytics engine aggregates live activity logs to give you the most accurate view of your business performance.
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale grayscale transition-all hover:grayscale-0 hover:opacity-100">
            <div className="flex items-center gap-2 font-bold text-sm"><Database size={16} /> Firestore Aggregation</div>
            <div className="flex items-center gap-2 font-bold text-sm"><ShieldCheck size={16} /> Data Isolation</div>
          </div>
        </section>
      </div>
    </div>
  );
}
