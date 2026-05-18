
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, MessageSquare, Users, Search, Bot, ArrowLeft, BadgeCheck, ShieldAlert, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function InboxMarketingPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-white/10 font-body">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/platform" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Platform</span>
          </Link>
          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg h-9 px-4 text-[10px] font-black uppercase tracking-widest">Deploy Infrastructure</Button>
          </Link>
        </div>
      </nav>

      <div className="container max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-24">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-8">
            <MessageSquare size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter mb-8 text-white">Intelligent Inbox</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            The CRM-style DM ecosystem designed for high-performance commerce fleets. Manage thousands of conversations with sub-second data synchronization.
          </p>
        </div>

        <div className="space-y-32 mb-32">
          {/* Intent Detection Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 font-headline text-white">Neural Intent Detection</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  Our neural layer analyzes every incoming DM to detect high-value buying signals, sentiment shifts, and urgency levels before an operator even opens the thread.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { label: "High Purchase Intent", icon: BadgeCheck, color: "text-emerald-500" },
                  { label: "Pricing & Stock Inquiry", icon: Search, color: "text-blue-500" },
                  { label: "Frustrated Customer Alert", icon: ShieldAlert, color: "text-amber-500" }
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <tag.icon size={16} className={tag.color} />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{tag.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <GlassCard className="border-white/10 bg-zinc-950/50 p-0 overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Active Thread Stream</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                </div>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {[
                  { name: "Marcus Sterling", msg: "I need 10 units in XL Black.", intent: "High Intent", time: "2m ago" },
                  { name: "Elena Rossi", msg: "Do you ship to Milan?", intent: "Pricing Inquiry", time: "14m ago" },
                  { name: "Jordan Vance", msg: "Still no tracking info.", intent: "Escalated", time: "1h ago" }
                ].map((chat, i) => (
                  <div key={i} className="p-5 flex gap-4 items-start opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-bold text-white">{chat.name}</p>
                        <span className="text-[9px] font-bold text-zinc-600 uppercase">{chat.time}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate mb-2">{chat.msg}</p>
                      <Badge variant="outline" className="text-[8px] h-4 uppercase border-white/10 text-zinc-400">{chat.intent}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Team Collaboration Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <GlassCard className="border-white/10 bg-zinc-950/50 p-0 overflow-hidden shadow-2xl order-2 md:order-1">
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 font-bold text-xs">ER</div>
                  <div>
                    <p className="text-xs font-bold text-white">Elena Rossi (Agent)</p>
                    <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Active Now</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                    <Users size={10} /> Internal Note
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed italic">"Customer is a repeat buyer. I've offered the BULK15 discount code as per workflow w1."</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-950 bg-zinc-800" />)}
                  </div>
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">+2 others viewing</span>
                </div>
              </div>
            </GlassCard>

            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-4 font-headline text-white">Fleet Collaboration</h3>
              <p className="text-zinc-500 leading-relaxed mb-8 text-sm">
                Assign threads to specific specialists, leave internal operational notes, and prevent collision with "viewed-by" indicators across your entire support fleet.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2">Collision Check</p>
                  <p className="text-lg font-bold text-white">Active</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2">Ownership</p>
                  <p className="text-lg font-bold text-white">Persistent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-16 rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent text-center">
          <h2 className="text-3xl font-bold font-headline mb-6 text-white">Operational Excellence.</h2>
          <p className="text-zinc-500 mb-10 text-sm max-w-lg mx-auto">
            Reduce your fleet response times from hours to seconds with AI-assisted suggestions and deterministic automated handling.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-xl px-12 h-14 font-bold shadow-2xl">Start Free Trial</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl px-12 h-14 font-bold">Request Briefing</Button>
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-8 opacity-40">
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <Clock size={12} /> Sub-second Sync
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <BadgeCheck size={12} /> Meta Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
