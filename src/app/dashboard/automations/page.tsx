'use client';

import React, { useState } from 'react';
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
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MOCK_WORKFLOWS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AutomationsPage() {
  const { toast } = useToast();
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCreateAutomation = (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      setOpen(false);
      toast({
        title: "Automation Deployed",
        description: "New workflow logic is now monitoring live DMs.",
      });
    }, 1500);
  };

  const handleAction = (name: string) => {
    toast({
      title: "Configuring Workflow",
      description: `Opening settings for ${name}...`,
    });
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Automations</h1>
          <p className="text-zinc-500 font-medium">Manage automated responses for Instagram DMs.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg h-10 px-6 font-bold text-xs gap-2">
              <Plus size={16} /> Create Automation
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-white/10 text-white">
            <form onSubmit={handleCreateAutomation}>
              <DialogHeader>
                <DialogTitle>New Automation Workflow</DialogTitle>
                <DialogDescription className="text-zinc-500">
                  Define a trigger and an AI action to handle conversations.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Workflow Name</Label>
                  <Input placeholder="e.g. Price Inquiry Handler" className="bg-white/5 border-white/10" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Trigger Scenario</Label>
                  <Input placeholder="e.g. When customer asks for a discount" className="bg-white/5 border-white/10" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">AI Response Action</Label>
                  <Input placeholder="e.g. Offer 10% coupon if total > $200" className="bg-white/5 border-white/10" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={creating} className="w-full bg-white text-black hover:bg-zinc-200 font-bold">
                  {creating ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
                  {creating ? 'Deploying...' : 'Deploy Automation'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Active Automations
          </div>
          
          {MOCK_WORKFLOWS.map((workflow) => (
            <GlassCard key={workflow.id} className="border-white/5 p-6 hover:border-white/10 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${workflow.status === 'Active' ? 'bg-zinc-50 border-white text-black' : 'bg-white/5 border-white/10 text-zinc-500'}`}>
                    <Zap size={24} fill={workflow.status === 'Active' ? 'currentColor' : 'none'} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{workflow.name}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      <span className="flex items-center gap-1.5"><Instagram size={12} /> Instagram</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-800" />
                      <span>{workflow.runs.toLocaleString()} runs</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant={workflow.status === 'Active' ? 'default' : 'secondary'} className={`h-6 px-3 text-[9px] uppercase font-bold ${workflow.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20' : ''}`}>
                    {workflow.status}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleAction(workflow.name)} className="text-zinc-500 hover:text-white h-10 w-10">
                    <MoreHorizontal size={18} />
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs font-medium">
                <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-400">Trigger</div>
                <div className="text-white/80">{workflow.trigger}</div>
                <ArrowRight size={14} className="text-zinc-600" />
                <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-400">Action</div>
                <div className="text-white/80">{workflow.action}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Templates
          </div>
          
          <GlassCard className="border-white/5 p-6 bg-zinc-950">
            <h3 className="font-bold text-lg mb-6">Quick Templates</h3>
            <div className="space-y-4">
              {[
                { title: 'Abandoned Cart', icon: MessageSquare },
                { title: 'Lead Qualification', icon: Tag },
                { title: 'Outside Hours', icon: AlertCircle }
              ].map((template, i) => (
                <div 
                  key={i} 
                  onClick={() => handleAction(template.title)}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <template.icon className="text-zinc-500 group-hover:text-white transition-colors" size={16} />
                    <span className="text-sm font-bold">{template.title}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-normal">Automated follow-up when users show high purchase intent.</p>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={() => toast({ title: "Template Library", description: "Loading automation presets..." })} className="w-full mt-6 h-10 border-white/5 bg-white/[0.02] text-xs font-bold">Browse Library</Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
