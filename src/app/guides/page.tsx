
'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, ArrowLeft, CheckCircle2, Play, Settings, Users } from 'lucide-react';

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-black text-white font-body py-12 px-6">
      <div className="container max-w-4xl mx-auto">
        <nav className="mb-20 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Docs</span>
          </Link>
          <Zap className="text-white fill-white opacity-20" size={24} />
        </nav>

        <div className="mb-16">
          <h1 className="text-4xl font-bold font-headline tracking-tighter mb-4">Setup Guides</h1>
          <p className="text-zinc-500">Step-by-step tutorials to master your commerce infrastructure.</p>
        </div>

        <div className="grid gap-4">
          {[
            { 
              title: "Deploying to Vercel", 
              desc: "How to configure environment variables and initialize your first production instance.", 
              icon: Play, 
              time: "5 min" 
            },
            { 
              title: "Meta Webhook Handshake", 
              desc: "Step-by-step guide to connecting your Instagram account and verifying the webhook endpoint.", 
              icon: Settings, 
              time: "10 min" 
            },
            { 
              title: "Training the AI Nodes", 
              desc: "Uploading business policies, inventory lists, and FAQ documents to guide responses.", 
              icon: Zap, 
              time: "3 min" 
            },
            { 
              title: "Managing Fleet Roles", 
              desc: "How to invite team members and configure granular permissions for agents and managers.", 
              icon: Users, 
              time: "5 min" 
            }
          ].map((guide, i) => (
            <GlassCard key={i} className="border-white/5 bg-zinc-950/50 hover:border-white/10 transition-colors p-8 flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-white transition-colors">
                  <guide.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{guide.title}</h3>
                  <p className="text-sm text-zinc-600">{guide.desc}</p>
                </div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700">{guide.time}</p>
                <div className="flex items-center gap-1.5 text-zinc-800 mt-2">
                  <CheckCircle2 size={12} /> <span className="text-[9px] font-bold">READY</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-3xl border border-white/5 bg-white/[0.01] text-center">
          <p className="text-sm text-zinc-500 font-medium mb-6">Need dedicated enterprise onboarding?</p>
          <Link href="/contact" className="text-xs font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors underline underline-offset-8">
            Schedule a Briefing
          </Link>
        </div>
      </div>
    </div>
  );
}
