
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Zap, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  Database, 
  ArrowRight,
  ChevronRight,
  Globe,
  Bot
} from 'lucide-react';

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-white/10 font-body">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Zap className="text-white fill-white" size={20} />
            <span className="font-headline text-lg font-bold tracking-tight uppercase">ReplyRush</span>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white">Sign In</Button>
          </Link>
        </div>
      </nav>

      <div className="container max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mb-24">
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-8">
            Infrastructure for <span className="text-zinc-600">Modern Commerce.</span>
          </h1>
          <p className="text-xl text-zinc-500 leading-relaxed font-medium">
            ReplyRush AI isn't just a chatbot. It's a high-performance operating system designed to manage, automate, and scale Instagram DM operations for elite brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
          {[
            {
              title: "Unified Intelligence",
              desc: "A single neural layer that understands customer intent, sentiment, and buying history across every conversation.",
              icon: Bot,
              link: "/platform/inbox"
            },
            {
              title: "Logic-Driven Growth",
              desc: "Deploy sophisticated sales workflows that trigger based on real buying signals, not just keywords.",
              icon: Zap,
              link: "/platform/automations"
            },
            {
              title: "Data Integrity",
              desc: "Grounded analytics derived from real-time Firestore activity, providing a non-repudiable record of performance.",
              icon: Database,
              link: "/platform/analytics"
            },
            {
              title: "Enterprise Security",
              desc: "Role-based access control and isolated workspace environments built on Google Cloud infrastructure.",
              icon: ShieldCheck,
              link: "/security"
            }
          ].map((item, i) => (
            <Link key={i} href={item.link}>
              <GlassCard className="h-full hover:border-white/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 mb-6 group-hover:text-white transition-colors">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ChevronRight size={12} />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <section className="py-24 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-6">Global Sync Architecture</h2>
              <p className="text-zinc-500 mb-8 leading-relaxed">
                Our infrastructure is built for high-volume synchronization. From Meta API ingestion to Firestore persistence, every event is processed with sub-second latency to ensure your team is always working on live data.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <Globe size={16} className="text-zinc-600" /> Multi-region data replication
                </div>
                <div className="flex items-center gap-3 text-sm font-bold">
                  <Zap size={16} className="text-zinc-600" /> Real-time state management
                </div>
                <div className="flex items-center gap-3 text-sm font-bold">
                  <Database size={16} className="text-zinc-600" /> Encrypted persistent storage
                </div>
              </div>
            </div>
            <div className="p-10 rounded-3xl border border-white/5 bg-zinc-950/50 text-center">
              <p className="text-sm text-zinc-500 font-medium mb-8">Ready to deploy your commerce fleet?</p>
              <Link href="/signup">
                <Button className="bg-white text-black hover:bg-zinc-200 rounded-xl px-10 h-14 font-bold">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
