"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Instagram, 
  Loader2,
  Users,
  CreditCard,
  Shield,
  Plus,
  Mail,
  CheckCircle2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { logActivity } from '@/lib/activity-logger';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useDashboard } from '../dashboard-context';

export default function SettingsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const { profile, loading, isAdmin } = useDashboard();
  const [activeTab, setActiveTab] = useState('general');
  const [savingProfile, setSavingProfile] = useState(false);

  const [localProfile, setLocalProfile] = useState<any>({});

  useEffect(() => {
    if (profile) setLocalProfile(profile);
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!user || !profile || !isAdmin) return;
    setSavingProfile(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        brandName: localProfile.brandName,
        email: localProfile.email,
        personality: localProfile.personality
      });

      await logActivity({
        db,
        userId: user.uid,
        actorName: localProfile.brandName || 'Admin',
        actorRole: profile.role || 'admin',
        actionType: 'PROFILE_UPDATED',
        description: `Updated business profile settings.`
      });

      toast({ title: "Profile Updated", description: "Your settings have been synced." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to save profile.", variant: "destructive" });
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-zinc-700" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Settings</h1>
          <p className="text-zinc-500 font-medium">Manage your workspace configuration and infrastructure.</p>
        </div>
        {!isAdmin && (
          <Badge variant="outline" className="h-8 border-amber-500/20 bg-amber-500/5 text-amber-500 font-bold px-4 gap-2">
            <ShieldAlert size={14} /> Read-Only Access
          </Badge>
        )}
      </div>

      <Tabs defaultValue="general" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-zinc-900/50 border border-white/5 p-1 h-12 mb-10 w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="general" className="px-6 text-xs font-bold uppercase tracking-widest">General</TabsTrigger>
          <TabsTrigger value="automation" className="px-6 text-xs font-bold uppercase tracking-widest">Logic</TabsTrigger>
          {isAdmin && <TabsTrigger value="team" className="px-6 text-xs font-bold uppercase tracking-widest">Team</TabsTrigger>}
          {isAdmin && <TabsTrigger value="billing" className="px-6 text-xs font-bold uppercase tracking-widest">Billing</TabsTrigger>}
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeTab === 'general' && (
              <div className="space-y-6">
                <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
                      <User size={18} />
                    </div>
                    <h2 className="font-bold text-xl text-white">Business Profile</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Brand Name</Label>
                      <Input 
                        disabled={!isAdmin}
                        className="bg-white/5 border-white/10 rounded-lg h-11 text-white disabled:opacity-50" 
                        value={localProfile.brandName || ''} 
                        onChange={(e) => setLocalProfile({...localProfile, brandName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Contact Email</Label>
                      <Input 
                        disabled={!isAdmin}
                        className="bg-white/5 border-white/10 rounded-lg h-11 text-white disabled:opacity-50" 
                        value={localProfile.email || ''} 
                        onChange={(e) => setLocalProfile({...localProfile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="mt-10 flex justify-end">
                      <Button 
                        onClick={handleSaveProfile} 
                        disabled={savingProfile}
                        className="bg-white text-black hover:bg-zinc-200 rounded-lg px-8 h-11 font-bold text-xs"
                      >
                        {savingProfile ? <Loader2 className="animate-spin mr-2" size={14} /> : 'Save Profile Changes'}
                      </Button>
                    </div>
                  )}
                </GlassCard>

                <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-xl">
                        <Instagram className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-white">Instagram Integration</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <p className="text-xs text-zinc-500 font-medium">Connected as <span className="text-white">@{profile?.brandName?.toLowerCase().replace(/\s+/g, '_') || 'operator'}</span></p>
                        </div>
                      </div>
                    </div>
                    {isAdmin && <Button variant="outline" className="border-white/10 bg-white/5 h-10 rounded-lg px-6 text-xs font-bold text-white">Sync Workspace</Button>}
                  </div>
                </GlassCard>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Fleet Members</h3>
                  <Button className="h-9 bg-white text-black hover:bg-zinc-200 font-bold text-xs px-4 rounded-lg">
                    <Plus size={14} className="mr-2" /> Invite Member
                  </Button>
                </div>
                <GlassCard className="border-white/5 bg-zinc-950/50 p-0 overflow-hidden">
                  <div className="divide-y divide-white/[0.05]">
                    {[
                      { name: profile?.brandName || 'Admin', role: 'Owner', status: 'Online', email: user?.email },
                      { name: 'Elena Rossi', role: 'Agent', status: 'Online', email: 'elena@replyrush.ai' },
                      { name: 'Jordan Vance', role: 'Manager', status: 'Offline', email: 'jordan@replyrush.ai' }
                    ].map((member, i) => (
                      <div key={i} className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 overflow-hidden">
                            <img src={`https://picsum.photos/seed/${member.name}/100/100`} className="w-full h-full object-cover grayscale" alt="" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{member.name}</p>
                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <Badge variant="outline" className="border-white/5 bg-white/[0.02] text-[9px] font-black uppercase tracking-widest text-zinc-400">
                              {member.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`} />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{member.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Growth Infrastructure</h3>
                      <p className="text-xs text-zinc-500">Currently on the <span className="text-white font-bold">Growth Monthly</span> plan.</p>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[10px] tracking-widest px-3 py-1">ACTIVE</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                      { label: 'Conversations', value: '429 / 5,000' },
                      { label: 'AI Tokens', value: '1.2M / 10M' },
                      { label: 'Team Seats', value: '3 / 5' }
                    ].map((usage, i) => (
                      <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">{usage.label}</p>
                        <p className="text-lg font-bold text-white">{usage.value}</p>
                        <div className="mt-3 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-zinc-700 w-1/3 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-white/5 mb-8" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <CreditCard size={20} className="text-zinc-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                        <p className="text-xs text-zinc-500">Expires 12/2026</p>
                      </div>
                    </div>
                    <Button variant="outline" className="h-10 border-white/10 bg-white/5 text-xs font-bold text-white rounded-lg px-6">Manage Billing</Button>
                  </div>
                </GlassCard>

                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1 mb-2">
                  <ExternalLink size={12} /> Billing History
                </div>
                <GlassCard className="border-white/5 bg-zinc-950/50 p-0 overflow-hidden">
                  <div className="divide-y divide-white/[0.05]">
                    {[
                      { date: 'Aug 01, 2025', amount: '$99.00', id: 'INV-84920' },
                      { date: 'Jul 01, 2025', amount: '$99.00', id: 'INV-83211' }
                    ].map((inv, i) => (
                      <div key={i} className="p-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-8">
                          <p className="font-bold text-white">{inv.date}</p>
                          <p className="text-zinc-600 font-medium">{inv.id}</p>
                        </div>
                        <p className="font-bold text-white">{inv.amount}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
