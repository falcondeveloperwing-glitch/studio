
'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2, Zap, ArrowLeft, Globe, Activity } from 'lucide-react';

export default function SlaPage() {
  return (
    <div className="min-h-screen bg-black text-white font-body py-12 px-6">
      <div className="container max-w-3xl mx-auto">
        <nav className="mb-20">
          <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
          </Link>
        </nav>

        <h1 className="text-4xl font-bold font-headline tracking-tighter mb-8">Service Level Agreement</h1>
        <p className="text-zinc-500 mb-12 leading-relaxed">
          Our commitment to infrastructure reliability and operational uptime for the ReplyRush AI fleet.
        </p>

        <div className="space-y-12 prose prose-invert max-w-none text-zinc-400 text-sm">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <Activity size={18} className="text-emerald-500" />
              <h3 className="m-0 font-bold">1. Uptime Commitment</h3>
            </div>
            <p className="leading-relaxed">
              ReplyRush AI targets an uptime of <strong className="text-white">99.9%</strong> for the core API engine and dashboard infrastructure. This excludes scheduled maintenance windows which are announced at least 24 hours in advance.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <Globe size={18} className="text-zinc-500" />
              <h3 className="m-0 font-bold">2. Third-Party Dependencies</h3>
            </div>
            <p className="leading-relaxed">
              As an integration-heavy platform, our reliability is partially dependent on the Meta Graph API and Google Cloud infrastructure. While we implement robust failover patterns, outages from these providers are outside our direct SLA coverage.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <Zap size={18} className="text-zinc-500" />
              <h3 className="m-0 font-bold">3. Incident Response</h3>
            </div>
            <p className="leading-relaxed">
              Our engineering team monitors infrastructure health 24/7. Critical system failures trigger immediate alerts with a target response time of under 2 hours during business operations.
            </p>
          </section>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700">Last Updated: Aug 2025</p>
          <Link href="/status" className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:underline">
            View Live Status
          </Link>
        </div>
      </div>
    </div>
  );
}
