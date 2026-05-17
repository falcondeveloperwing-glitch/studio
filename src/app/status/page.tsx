'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Zap, Activity, Globe, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const systems = [
  { name: 'Core API Engine', status: 'Operational', uptime: '99.99%', latency: '42ms', icon: Zap },
  { name: 'Inbox Sync (Meta)', status: 'Operational', uptime: '100%', latency: '85ms', icon: Globe },
  { name: 'AI Generation Node', status: 'Operational', uptime: '99.95%', latency: '1240ms', icon: Activity },
  { name: 'Analytics Pipeline', status: 'Operational', uptime: '99.98%', latency: '18ms', icon: ShieldCheck },
];

const incidents = [
  { date: 'Aug 14, 2025', title: 'Scheduled Maintenance', description: 'Upgraded infrastructure for higher throughput.', status: 'Completed' },
  { date: 'Jul 28, 2025', title: 'Increased Meta API Latency', description: 'Mitigated downstream delays from Instagram DMs.', status: 'Resolved' },
];

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-black text-white font-body py-12 px-6">
      <nav className="max-w-4xl mx-auto mb-16 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20">
            <Zap className="text-white fill-white" size={16} />
          </div>
          <span className="font-headline text-lg font-bold tracking-tight text-white uppercase">
            Reply<span className="text-zinc-500">Rush</span>
          </span>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white gap-2">
            <ArrowLeft size={14} /> Back to Home
          </Button>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <CheckCircle2 size={16} />
            <span className="text-sm font-bold tracking-tight">All Systems Operational</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Infrastructure Status</h1>
          <p className="text-zinc-500 font-medium">Real-time health monitoring for the ReplyRush fleet.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systems.map((system) => (
            <GlassCard key={system.name} className="border-white/5 bg-zinc-950/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500">
                    <system.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{system.name}</h3>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Global Cluster</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold uppercase text-[9px] tracking-widest px-3">
                  {system.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Uptime</p>
                  <p className="text-sm font-bold text-white">{system.uptime}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Latency</p>
                  <p className="text-sm font-bold text-white">{system.latency}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
            <Clock size={12} /> Recent History
          </div>
          <GlassCard className="border-white/5 bg-zinc-950/50 p-0 overflow-hidden">
            <div className="divide-y divide-white/[0.05]">
              {incidents.map((incident, i) => (
                <div key={i} className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{incident.date}</span>
                    <Badge variant="outline" className="border-white/10 text-zinc-500 text-[9px] font-black uppercase tracking-widest h-5 px-2">
                      {incident.status}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-white">{incident.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{incident.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] text-center">
          <p className="text-sm text-zinc-500 font-medium mb-6">Need enterprise SLA documentation or technical logs?</p>
          <button className="text-xs font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">
            Download Transparency Report
          </button>
        </div>
      </div>
    </div>
  );
}
