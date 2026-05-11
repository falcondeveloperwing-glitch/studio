
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Plus, 
  ArrowRight, 
  MessageSquare, 
  Tag, 
  AlertCircle,
  MoreHorizontal,
  Instagram,
  Settings,
  Sparkles,
  Command
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MOCK_WORKFLOWS } from '@/lib/mock-data';

export default function AutomationsPage() {
  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-headline text-5xl font-bold tracking-tight mb-3"
          >
            Neural Workflows
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xl"
          >
            Automate Instagram DMs with intelligent logic blocks.
          </motion.p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 glow-primary rounded-2xl h-14 px-8 font-black text-sm tracking-tight gap-3 shadow-2xl transition-all hover:scale-105">
          <Plus size={20} /> Create Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-4 ml-2">
            <Zap size={14} className="text-primary" /> Active Deployments
          </div>
          
          {MOCK_WORKFLOWS.map((workflow, idx) => (
            <motion.div 
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <GlassCard className="relative group overflow-hidden border-white/[0.04] p-10 hover:border-white/10 transition-all duration-700 rounded-[2.5rem]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 relative z-10">
                  <div className="flex gap-6">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 border transition-all duration-700 group-hover:scale-110 shadow-2xl ${workflow.status === 'Active' ? 'bg-primary/15 border-primary/20 text-primary' : 'bg-white/5 border-white/10 text-muted-foreground'}`}>
                      <Zap size={32} fill={workflow.status === 'Active' ? 'currentColor' : 'none'} className={workflow.status === 'Active' ? 'animate-pulse' : ''} />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl mb-2 tracking-tight">{workflow.name}</h3>
                      <div className="flex flex-wrap items-center gap-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-2"><Instagram size={14} /> Instagram DM</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        <span className="flex items-center gap-2 text-white/60">{workflow.runs.toLocaleString()} runs</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <Badge variant={workflow.status === 'Active' ? 'default' : 'secondary'} className={`h-8 px-5 font-black text-[9px] uppercase tracking-widest rounded-full ${workflow.status === 'Active' ? 'bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border border-emerald-500/20' : ''}`}>
                      {workflow.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-white h-14 w-14 rounded-2xl hover:bg-white/5">
                      <MoreHorizontal size={24} />
                    </Button>
                  </div>
                </div>

                {/* Visual Logic Flow Preview */}
                <div className="mt-12 pt-10 border-t border-white/[0.05] flex flex-wrap items-center gap-6">
                  <div className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] font-black text-muted-foreground uppercase tracking-widest shadow-inner">Trigger</div>
                  <div className="text-sm font-bold text-white/90">{workflow.trigger}</div>
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <ArrowRight size={20} className="text-primary opacity-50" />
                  </motion.div>
                  <div className="px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest shadow-inner shadow-primary/10">Action</div>
                  <div className="text-sm font-bold text-white/90">{workflow.action}</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="space-y-10">
          <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-4 ml-2">
            Library
          </div>
          
          <GlassCard className="h-fit border-white/[0.04] p-10 rounded-[2.5rem]" variant="darker">
            <h3 className="font-headline font-bold text-2xl mb-10 tracking-tight">Rapid Templates</h3>
            <div className="space-y-5">
              {[
                { title: 'Abandoned Cart', icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/20' },
                { title: 'Lead Qualification', icon: Tag, color: 'text-accent', bg: 'bg-accent/20' },
                { title: 'O.O.O Assistant', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/20' }
              ].map((template, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 5 }}
                  className="p-6 rounded-[1.75rem] bg-white/[0.02] border border-white/[0.05] hover:border-primary/40 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center gap-5 mb-3">
                    <div className={`w-12 h-12 rounded-[1.25rem] ${template.bg} flex items-center justify-center shrink-0 shadow-2xl`}>
                      <template.icon className={template.color} size={22} />
                    </div>
                    <span className="text-base font-bold tracking-tight">{template.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-white/70 transition-colors">Neural recapture follow-up when users show high intent.</p>
                </motion.div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-10 h-14 border-white/5 bg-white/[0.03] hover:bg-white/[0.08] font-black text-[10px] uppercase tracking-widest rounded-2xl">Browse Marketplace</Button>
          </GlassCard>

          <GlassCard className="bg-primary glow-primary text-white border-none p-10 text-center rounded-[3rem] shadow-[0_30px_60px_rgba(104,20,247,0.3)] group relative overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full"
            />
            <div className="w-20 h-20 rounded-[2rem] bg-white/20 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-700">
              <Sparkles size={40} fill="white" />
            </div>
            <h3 className="font-headline font-bold text-3xl mb-4 tracking-tight">Advanced Logic</h3>
            <p className="text-base opacity-80 mb-10 leading-relaxed">Unlock multi-step logic, Shopify webhooks, and custom API endpoints.</p>
            <Button variant="secondary" className="w-full h-14 font-black text-[10px] uppercase tracking-widest bg-white text-primary hover:bg-white/90 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95">Open Pro Builder</Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
