
'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { 
  Zap, 
  Plus, 
  ArrowRight, 
  Instagram,
  Loader2,
  Terminal,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { collection, query, orderBy, addDoc, doc, updateDoc, limit } from 'firebase/firestore';
import { logActivity } from '@/lib/activity-logger';

export default function AutomationsPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const db = useFirestore();
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);
  
  const userRef = useMemoFirebase(() => (user ? doc(db, 'users', user.uid) : null), [user, db]);
  const { data: profile } = useDoc(userRef);

  const [formData, setFormData] = useState({
    name: '',
    trigger: '',
    action: ''
  });

  const automationsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(db, 'users', user.uid, 'automations'), orderBy('name', 'asc'), limit(50));
  }, [user, db]);

  const { data: automations, loading } = useCollection(automationsQuery);

  const handleCreateAutomation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    setCreating(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'automations'), {
        ...formData,
        status: 'Active',
        runs: 0,
        createdAt: new Date().toISOString()
      });

      await logActivity({
        db,
        userId: user.uid,
        actorName: profile.brandName || 'Admin',
        actorRole: profile.role || 'admin',
        actionType: 'WORKFLOW_CREATED',
        description: `Deployed new automation: ${formData.name}`
      });

      setOpen(false);
      setFormData({ name: '', trigger: '', action: '' });
      toast({ title: "Automation Deployed", description: "New logic is now live." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to create automation.", variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const toggleStatus = async (id: string, name: string, currentStatus: string) => {
    if (!user || !profile) return;
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    try {
      await updateDoc(doc(db, 'users', user.uid, 'automations', id), {
        status: newStatus
      });

      await logActivity({
        db,
        userId: user.uid,
        actorName: profile.brandName || 'Admin',
        actorRole: profile.role || 'admin',
        actionType: 'WORKFLOW_TOGGLED',
        description: `${newStatus} automation workflow: ${name}`
      });

      toast({ title: "Status Updated", description: `Automation ${newStatus.toLowerCase()}.` });
    } catch (err) {
      toast({ title: "Error", description: "Update failed.", variant: "destructive" });
    }
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
                  <Input 
                    placeholder="e.g. Price Inquiry Handler" 
                    className="bg-white/5 border-white/10" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Trigger Scenario</Label>
                  <Input 
                    placeholder="e.g. When customer asks for a discount" 
                    className="bg-white/5 border-white/10" 
                    value={formData.trigger}
                    onChange={(e) => setFormData({...formData, trigger: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">AI Response Action</Label>
                  <Input 
                    placeholder="e.g. Offer 10% coupon if total > $200" 
                    className="bg-white/5 border-white/10" 
                    value={formData.action}
                    onChange={(e) => setFormData({...formData, action: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={creating} className="w-full bg-white text-black hover:bg-zinc-200 font-bold">
                  {creating ? <Loader2 className="animate-spin mr-2" size={14} /> : 'Deploy Automation'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <GlassCard className="p-4 border-amber-500/20 bg-amber-500/[0.03] flex items-center gap-3">
        <AlertCircle size={16} className="text-amber-500" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80">
          Automations are currently in Sandbox Mode. Workflows will trigger for demo chats and test payloads.
        </p>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Active Automations
          </div>
          
          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin text-zinc-700" /></div>
          ) : automations.length === 0 ? (
            <div className="p-20 text-center border border-dashed border-white/5 rounded-2xl">
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">No Active Workflows</p>
              <p className="text-[10px] text-zinc-700 mt-2">Create your first trigger-action pair to begin.</p>
            </div>
          ) : (
            automations.map((workflow: any) => (
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
                        <span>{workflow.runs?.toLocaleString() || 0} executions</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge 
                      onClick={() => toggleStatus(workflow.id, workflow.name, workflow.status)}
                      className={`h-6 px-3 text-[9px] uppercase font-bold cursor-pointer ${workflow.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}
                    >
                      {workflow.status}
                    </Badge>
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
            ))
          )}
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Infrastructure Status</div>
          <GlassCard className="border-white/5 p-6 bg-zinc-950/20 h-fit">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-zinc-600" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Webhook Listeners</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase text-emerald-500">Live</span>
              </div>
            </div>
            <div className="space-y-4 font-mono text-[10px]">
              <div className="flex justify-between text-zinc-500">
                <span>POST /api/webhooks/instagram</span>
                <span className="text-emerald-500">200 OK</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>GET /api/webhooks/verify</span>
                <span className="text-emerald-500">ACTIVE</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={14} className="text-zinc-500" />
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Verification Token</p>
              </div>
              <div className="p-3 rounded-lg bg-black text-[10px] font-mono text-zinc-500 break-all border border-white/5">
                rr_live_v1_84920...
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
