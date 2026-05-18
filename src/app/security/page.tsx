
'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { ShieldCheck, Lock, Database, Users, Eye, Zap, ArrowLeft } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-white font-body py-12 px-6">
      <div className="container max-w-4xl mx-auto">
        <nav className="mb-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
          </Link>
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-[9px] font-black uppercase tracking-widest text-emerald-500">
            <ShieldCheck size={12} /> Standard Compliance
          </div>
        </nav>

        <div className="text-center mb-24">
          <h1 className="text-5xl font-bold font-headline tracking-tighter mb-8">Data Infrastructure Security</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade security is not a feature; it's our foundation. We implement rigorous protocols to ensure your commerce data remains isolated and protected.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-32">
          {[
            {
              title: "Workspace Isolation",
              desc: "Every workspace is partitioned at the database level using strict Firestore security rules keyed to User UIDs.",
              icon: Database
            },
            {
              title: "Role-Based Access (RBAC)",
              desc: "Define granular permissions for Admin, Manager, and Agent levels to prevent privilege escalation.",
              icon: Users
            },
            {
              title: "Audit Transparency",
              desc: "Non-repudiable logs record every mutation, providing a clear history of operator and AI activity.",
              icon: Eye
            },
            {
              title: "Encrypted Transit",
              desc: "All data is encrypted in transit using TLS 1.3 and at rest using industry-standard AES-256 protocols.",
              icon: Lock
            }
          ].map((item, i) => (
            <GlassCard key={i} className="p-8 border-white/5 bg-zinc-950/50">
              <item.icon className="text-zinc-600 mb-6" size={24} />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="p-12 rounded-3xl border border-white/5 bg-white/[0.02] space-y-8">
          <h2 className="text-2xl font-bold font-headline">Compliance & Infrastructure</h2>
          <div className="grid sm:grid-cols-2 gap-8 text-sm text-zinc-500">
            <div className="space-y-4">
              <p><strong className="text-white">Cloud Provider:</strong> Google Cloud Platform (GCP)</p>
              <p><strong className="text-white">Hosting:</strong> Vercel Global Edge Network</p>
            </div>
            <div className="space-y-4">
              <p><strong className="text-white">Auth Standard:</strong> Firebase Auth (JWT)</p>
              <p><strong className="text-white">Monitoring:</strong> Real-time infrastructure health</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
