"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Instagram, 
  Sparkles, 
  Users, 
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Plus,
  MoreHorizontal,
  Loader2,
  Trash2,
  ArrowUpRight,
  Monitor,
  Shield
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [savingProfile, setSavingProfile] = useState(false);
  const [inviting, setInviting] = useState(false);

  // User profile data
  const userRef = React.useMemo(() => (user ? doc(db, 'users', user.uid) : null), [user, db]);
  const { data: profile, loading } = useDoc(userRef);

  const [localProfile, setLocalProfile] = useState<any>({});

  useEffect(() => {
    if (profile) setLocalProfile(profile);
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        brandName: localProfile.brandName,
        email: localProfile.email,
        personality: localProfile.personality
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
      </div>

      <Tabs defaultValue="general" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-zinc-900/50 border border-white/5 p-1 h-12 mb-10 w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="general" className="px-6">General</TabsTrigger>
          <TabsTrigger value="automation" className="px-6">Automation</TabsTrigger>
          <TabsTrigger value="team" className="px-6">Team</TabsTrigger>
          <TabsTrigger value="billing" className="px-6">Billing</TabsTrigger>
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
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Brand Name</Label>
                      <Input 
                        className="bg-white/5 border-white/10 rounded-lg h-11 text-white" 
                        value={localProfile.brandName || ''} 
                        onChange={(e) => setLocalProfile({...localProfile, brandName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contact Email</Label>
                      <Input 
                        className="bg-white/5 border-white/10 rounded-lg h-11 text-white" 
                        value={localProfile.email || ''} 
                        onChange={(e) => setLocalProfile({...localProfile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mt-10 flex justify-end">
                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={savingProfile}
                      className="bg-white text-black hover:bg-zinc-200 rounded-lg px-8 h-11 font-bold text-xs"
                    >
                      {savingProfile ? <Loader2 className="animate-spin mr-2" size={14} /> : 'Save Profile Changes'}
                    </Button>
                  </div>
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
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <p className="text-xs text-zinc-500 font-medium">Connected as <span className="text-white">@brand_official</span></p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="border-white/10 bg-white/5 h-10 rounded-lg px-6 text-xs font-bold text-white">Manage Connection</Button>
                  </div>
                </GlassCard>
              </div>
            )}
            {/* Other tabs remain largely visual or can be linked to other collections later */}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
