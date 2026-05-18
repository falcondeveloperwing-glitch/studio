
'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, ArrowLeft, Terminal, Globe, Shield, Code } from 'lucide-react';

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-[#020203] text-white font-body py-12 px-6">
      <div className="container max-w-5xl mx-auto">
        <nav className="mb-20 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Docs</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">API v1.0 Live</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h1 className="text-3xl font-bold font-headline tracking-tighter mb-4">API Reference</h1>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Connect your external tools to the ReplyRush infrastructure. Our API follows REST principles and uses standard HTTP methods.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Endpoints</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">POST</span>
                  <span className="text-xs font-mono text-zinc-400">/api/webhooks</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 opacity-50">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">GET</span>
                  <span className="text-xs font-mono text-zinc-600">/api/conversations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500">
                  <Globe size={18} />
                </div>
                <h2 className="text-xl font-bold font-headline">Incoming Webhooks</h2>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                ReplyRush consumes standard Instagram Graph API message events. To verify your endpoint during setup, respond to the challenge parameter.
              </p>
              <GlassCard className="p-0 border-white/10 bg-zinc-950 overflow-hidden">
                <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Meta Verification Request</span>
                  <Code size={12} className="text-zinc-700" />
                </div>
                <pre className="p-6 text-[11px] font-mono text-zinc-400 overflow-x-auto">
{`GET /api/webhooks/instagram?
  hub.mode=subscribe&
  hub.challenge=1158201444&
  hub.verify_token=replyrush_token

// Expected Response:
200 OK
"1158201444"`}
                </pre>
              </GlassCard>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500">
                  <Shield size={18} />
                </div>
                <h2 className="text-xl font-bold font-headline">Authentication</h2>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                All external API calls must include a valid Bearer token in the Authorization header. Tokens are generated within the Workspace Settings dashboard.
              </p>
              <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/5 text-amber-500/80 text-[11px] leading-relaxed">
                <strong>Warning:</strong> Never share your workspace API tokens. They provide full administrative access to your commerce data.
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
