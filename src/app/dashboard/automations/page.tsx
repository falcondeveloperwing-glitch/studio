"use client";

import React from 'react';
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
  Mail,
  Instagram
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WORKFLOWS = [
  { 
    id: 1, 
    name: 'Price Inquiry Auto-Reply', 
    trigger: 'Customer asks about "price", "$", or "cost"', 
    action: 'Send product info + pricing link',
    status: 'Active',
    runs: '1,429'
  },
  { 
    id: 2, 
    name: 'Delivery Status Update', 
    trigger: 'Customer asks "where is my order"', 
    action: 'Fetch tracking from Shopify + reply',
    status: 'Active',
    runs: '842'
  },
  { 
    id: 3, 
    name: 'Inactivity Follow-up', 
    trigger: 'No customer reply for 24 hours', 
    action: 'Send "Still interested?" gentle nudge',
    status: 'Paused',
    runs: '124'
  }
];

export default function AutomationsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-headline text-3xl font-bold mb-2">Automations</h1>
          <p className="text-muted-foreground">Create intelligent triggers and actions to scale your sales effort.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 glow-primary rounded-xl gap-2 h-11 px-6">
          <Plus size={18} /> Create Workflow
        </Button>
      </div>

      {/* Workflow Builder Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 px-2">
            <Zap size={14} className="text-primary" /> Active Workflows
          </div>
          
          {WORKFLOWS.map((workflow) => (
            <GlassCard key={workflow.id} className="relative group overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${workflow.status === 'Active' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    <Zap size={24} fill={workflow.status === 'Active' ? 'currentColor' : 'none'} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{workflow.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Instagram size={12} /> Instagram DM</span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">{workflow.runs} total runs</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end mr-4">
                    <Badge variant={workflow.status === 'Active' ? 'default' : 'secondary'} className={workflow.status === 'Active' ? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30' : ''}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-white h-10 w-10">
                    <MoreHorizontal size={20} />
                  </Button>
                </div>
              </div>

              {/* Visual Flow Preview */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-muted-foreground uppercase">Trigger</div>
                <div className="text-[11px] font-medium text-white/80">{workflow.trigger}</div>
                <ArrowRight size={14} className="text-muted-foreground" />
                <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase">Action</div>
                <div className="text-[11px] font-medium text-white/80">{workflow.action}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-6">
          <GlassCard className="h-fit">
            <h3 className="font-headline font-bold text-lg mb-6">Automation Templates</h3>
            <div className="space-y-4">
              {[
                { title: 'Abandoned Cart Recovery', icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/20' },
                { title: 'Instant Lead Qualification', icon: Tag, color: 'text-accent', bg: 'bg-accent/20' },
                { title: 'Out-of-Office Assistant', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/20' }
              ].map((template, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${template.bg} flex items-center justify-center shrink-0`}>
                      <template.icon className={template.color} size={16} />
                    </div>
                    <span className="text-sm font-bold">{template.title}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">Boost conversion by automatically following up when users show intent.</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 border-white/10 hover:bg-white/5 font-bold">Explore Marketplace</Button>
          </GlassCard>

          <GlassCard className="bg-primary glow-primary text-white border-none p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Zap size={32} fill="white" />
            </div>
            <h3 className="font-headline font-bold text-xl mb-2">Build Custom Logic</h3>
            <p className="text-sm opacity-80 mb-6">Our Pro builder allows for complex multi-step workflows and API integrations.</p>
            <Button variant="secondary" className="w-full font-bold bg-white text-primary hover:bg-white/90">Open Pro Builder</Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}