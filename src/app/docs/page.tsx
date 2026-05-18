
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Book, Zap, Shield, Globe, Terminal, ArrowLeft } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 font-body py-12">
      <div className="container max-w-5xl mx-auto px-6">
        <nav className="flex items-center justify-between mb-20">
          <Link href="/" className="flex items-center gap-3">
            <Zap className="text-white fill-white" size={18} />
            <span className="font-headline text-lg font-bold tracking-tight uppercase">Docs</span>
          </Link>
          <Link href="/api-reference" className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">API Reference</Link>
        </nav>

        <div className="grid lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Fundamentals</h4>
              <ul className="space-y-3 text-xs font-bold text-zinc-400">
                <li className="text-white">Introduction</li>
                <li className="hover:text-white transition-colors cursor-pointer">Architecture</li>
                <li className="hover:text-white transition-colors cursor-pointer">Quickstart</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Infrastructure</h4>
              <ul className="space-y-3 text-xs font-bold text-zinc-400">
                <li className="hover:text-white transition-colors cursor-pointer">Firebase Setup</li>
                <li className="hover:text-white transition-colors cursor-pointer">Meta Webhooks</li>
                <li className="hover:text-white transition-colors cursor-pointer">Security Models</li>
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-16">
            <section>
              <h1 className="text-4xl font-bold font-headline tracking-tighter mb-6">Introduction</h1>
              <p className="text-zinc-500 leading-relaxed mb-8">
                Welcome to the ReplyRush AI documentation. This guide will help you deploy, configure, and operate your own high-performance Instagram commerce infrastructure.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <GlassCard className="p-6 border-white/5 bg-zinc-950/50">
                  <Terminal className="text-zinc-600 mb-4" size={18} />
                  <h3 className="font-bold text-sm mb-2">Quickstart</h3>
                  <p className="text-xs text-zinc-600 leading-normal">Get your workspace running in under 10 minutes with our deployment guide.</p>
                </GlassCard>
                <GlassCard className="p-6 border-white/5 bg-zinc-950/50">
                  <Shield className="text-zinc-600 mb-4" size={18} />
                  <h3 className="font-bold text-sm mb-2">Security</h3>
                  <p className="text-xs text-zinc-600 leading-normal">Learn how we isolate workspace data and enforce role-based access.</p>
                </GlassCard>
              </div>
            </section>

            <section className="prose prose-invert max-w-none space-y-8 text-zinc-400 text-sm">
              <h2 className="text-white text-xl font-bold">Architecture Overview</h2>
              <p className="leading-relaxed">
                ReplyRush AI is built on a modern serverless stack designed for extreme reliability and stateful realtime operations.
              </p>
              <ul className="space-y-4">
                <li><strong className="text-zinc-200">Frontend:</strong> Next.js 15 (App Router) for high-performance rendering and SEO.</li>
                <li><strong className="text-zinc-200">Persistence:</strong> Google Cloud Firestore for real-time document synchronization.</li>
                <li><strong className="text-zinc-200">Auth:</strong> Firebase Authentication with persistent multi-role session management.</li>
                <li><strong className="text-zinc-200">AI:</strong> Genkit + Gemini 2.5 Flash for grounded, low-latency response generation.</li>
              </ul>
            </section>

            <div className="pt-12 border-t border-white/5 flex justify-between">
              <div />
              <Link href="/guides" className="group flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors">
                Setup Guides <Zap size={14} className="group-hover:fill-white" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
