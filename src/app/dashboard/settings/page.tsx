"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Instagram, 
  Sparkles, 
  Bell, 
  Users, 
  CreditCard,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Plus,
  MoreHorizontal,
  LogOut,
  RefreshCw,
  AlertCircle,
  Loader2,
  Trash2,
  ArrowUpRight,
  Monitor
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [savingProfile, setSavingProfile] = useState(false);
  const [tone, setTone] = useState('Professional');
  const [inviting, setInviting] = useState(false);

  // Tone Previews
  const tonePreviews: Record<string, string> = {
    Professional: "Thank you for reaching out. We have 14 units of the Stealth Hoodie in XL available for immediate dispatch. Would you like me to process a bulk discount link for you?",
    Friendly: "Hey there! 👋 So glad you like the new collection. We actually have those XL Stealth Hoodies ready to ship! Want me to grab a 15% discount code for your team?",
    Luxury: "Exclusivity is our hallmark. Our Stealth series is currently in limited stock (14 units remain). We can certainly facilitate a priority order for your coaching team today."
  };

  const handleSaveProfile = () => {
    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      toast({
        title: "Profile Updated",
        description: "Your business settings have been synchronized.",
      });
    }, 1200);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setTimeout(() => {
      setInviting(false);
      toast({
        title: "Invitation Sent",
        description: "A secure access link was sent to the new member.",
      });
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-zinc-500 font-medium">Manage your workspace configuration and infrastructure.</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-zinc-900/50 border border-white/5 p-1 h-12 mb-10 w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="general" className="px-6 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">General</TabsTrigger>
          <TabsTrigger value="automation" className="px-6 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Automation</TabsTrigger>
          <TabsTrigger value="team" className="px-6 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Team</TabsTrigger>
          <TabsTrigger value="billing" className="px-6 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Billing</TabsTrigger>
          <TabsTrigger value="security" className="px-6 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Security</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          {/* GENERAL SETTINGS */}
          <TabsContent value="general">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
                    <User size={18} />
                  </div>
                  <h2 className="font-bold text-xl">Business Profile</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Brand Name</Label>
                    <Input className="bg-white/5 border-white/10 rounded-lg h-11" defaultValue="Nike Official Store" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contact Email</Label>
                    <Input className="bg-white/5 border-white/10 rounded-lg h-11" defaultValue="support@nike.com" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Store Description</Label>
                    <Input className="bg-white/5 border-white/10 rounded-lg h-11" defaultValue="Premium sportswear and lifestyle brand." />
                  </div>
                </div>
                <div className="mt-10 flex justify-end">
                  <Button 
                    onClick={handleSaveProfile} 
                    disabled={savingProfile}
                    className="bg-white text-black hover:bg-zinc-200 rounded-lg px-8 h-11 font-bold text-xs"
                  >
                    {savingProfile ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
                    {savingProfile ? 'Saving...' : 'Save Profile Changes'}
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
                      <h3 className="font-bold text-base">Instagram Direct Integration</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <p className="text-xs text-zinc-500 font-medium">Connected as <span className="text-white">@nike_official</span></p>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-white/10 bg-white/5 h-10 rounded-lg px-6 text-xs font-bold">Manage Connection</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-950 border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle>Connection Management</DialogTitle>
                        <DialogDescription className="text-zinc-500">Manage your Meta API permissions and account status.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-6">
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
                          <CheckCircle2 className="text-emerald-500" size={20} />
                          <div>
                            <p className="text-sm font-bold">Account is healthy</p>
                            <p className="text-xs text-zinc-500">Last verified: 12 minutes ago</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Permissions</p>
                          {['instagram_manage_messages', 'pages_read_engagement', 'instagram_basic'].map(p => (
                            <div key={p} className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                              <code className="text-zinc-400">{p}</code>
                              <Badge className="bg-emerald-500/10 text-emerald-500 border-none h-5">Verified</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter className="gap-2">
                        <Button variant="ghost" className="text-red-500 hover:text-red-400 hover:bg-red-500/5">Disconnect Account</Button>
                        <Button className="bg-white text-black hover:bg-zinc-200">Sync Now</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </GlassCard>
            </motion.div>
          </TabsContent>

          {/* AUTOMATION SETTINGS */}
          <TabsContent value="automation">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
                    <Sparkles size={18} />
                  </div>
                  <h2 className="font-bold text-xl">Automation Personality</h2>
                </div>

                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Professional', 'Friendly', 'Luxury'].map((t) => (
                      <button 
                        key={t} 
                        onClick={() => setTone(t)}
                        className={`p-5 rounded-2xl border-2 text-left transition-all ${t === tone ? 'border-white bg-white/5 ring-4 ring-white/5' : 'border-white/5 bg-white/[0.01] hover:border-white/10'}`}
                      >
                        <p className="text-sm font-bold mb-2">{t}</p>
                        <p className="text-[11px] text-zinc-500 leading-normal">Optimized for high-intent {t.toLowerCase()} sales responses.</p>
                      </button>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                      <RefreshCw size={12} className={savingProfile ? 'animate-spin' : ''} />
                      AI Live Preview ({tone})
                    </div>
                    <p className="text-sm text-zinc-300 italic leading-relaxed">"{tonePreviews[tone]}"</p>
                  </div>

                  <Separator className="bg-white/5" />

                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">Auto-escalate to Team</p>
                        <p className="text-xs text-zinc-500 mt-1">Handoff to manual support if sentiment drops below neutral.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">Show "AI Agent" Label</p>
                        <p className="text-xs text-zinc-500 mt-1">Disclose automated responses to maintain customer transparency.</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </TabsContent>

          {/* TEAM SETTINGS */}
          <TabsContent value="team">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-zinc-500">Manage access and roles for your sales team.</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-black hover:bg-zinc-200 h-9 px-4 text-xs font-bold gap-2">
                      <Plus size={14} /> Invite Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-zinc-950 border-white/10 text-white">
                    <form onSubmit={handleInvite}>
                      <DialogHeader>
                        <DialogTitle>Invite Team Member</DialogTitle>
                        <DialogDescription className="text-zinc-500">Send an invitation to join your ReplyRush fleet.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-6">
                        <div className="space-y-3">
                          <Label className="text-xs font-bold text-zinc-500 uppercase">Email Address</Label>
                          <Input className="bg-white/5 border-white/10 rounded-lg" placeholder="name@company.com" required />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-bold text-zinc-500 uppercase">Role</Label>
                          <select className="w-full bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20">
                            <option value="admin">Admin (Full Access)</option>
                            <option value="manager">Manager (Operations Only)</option>
                            <option value="sales">Sales Associate (Inbox Only)</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={inviting} className="w-full bg-white text-black hover:bg-zinc-200 font-bold">
                          {inviting ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
                          Send Invitation
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: 'Marcus Sterling', email: 'marcus@nike.com', role: 'Owner', avatar: '1' },
                  { name: 'Elena Rossi', email: 'elena@nike.com', role: 'Sales Lead', avatar: '2' },
                  { name: 'Jordan Vance', email: 'jordan@nike.com', role: 'Support', avatar: '3' }
                ].map((member, i) => (
                  <GlassCard key={i} className="border-white/5 p-5 bg-zinc-950/50 hover:bg-zinc-900/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-zinc-900 grayscale">
                          <img src={`https://picsum.photos/seed/${member.avatar}/100/100`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{member.name}</p>
                          <p className="text-[11px] text-zinc-500 font-medium">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-white/10 text-zinc-500 py-0.5 px-3">
                          {member.role}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-white">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* BILLING SETTINGS */}
          <TabsContent value="billing">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
                      <CreditCard size={18} />
                    </div>
                    <h2 className="font-bold text-xl">Growth Fleet</h2>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold uppercase text-[10px] tracking-widest px-3">Active Plan</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Monthly Cost</p>
                    <p className="text-2xl font-bold">$99.00 <span className="text-xs font-normal text-zinc-500">/mo</span></p>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Next Payment</p>
                    <p className="text-2xl font-bold">Oct 14, 2025</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Usage Limits</p>
                    <p className="text-2xl font-bold">84% <span className="text-xs font-normal text-zinc-500">capacity</span></p>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold">Payment Method</p>
                    <p className="text-xs text-zinc-500 mt-1">Visa ending in •••• 4242</p>
                  </div>
                  <Button variant="outline" className="border-white/10 bg-white/5 h-10 px-6 text-xs font-bold">Change Method</Button>
                </div>
              </GlassCard>

              <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
                <h3 className="font-bold text-lg mb-8">Billing History</h3>
                <div className="space-y-4">
                  {[
                    { date: 'Sep 14, 2025', amount: '$99.00', status: 'Paid', inv: 'INV-8421' },
                    { date: 'Aug 14, 2025', amount: '$99.00', status: 'Paid', inv: 'INV-7312' },
                    { date: 'Jul 14, 2025', amount: '$99.00', status: 'Paid', inv: 'INV-6504' }
                  ].map((invoice, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-6">
                        <span className="text-xs font-bold text-zinc-400">{invoice.date}</span>
                        <span className="text-xs font-bold text-zinc-600">{invoice.inv}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm font-bold">{invoice.amount}</span>
                        <Badge className="bg-zinc-800 text-zinc-400 border-none h-6 px-3">{invoice.status}</Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-white">
                          <ArrowUpRight size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </TabsContent>

          {/* SECURITY SETTINGS */}
          <TabsContent value="security">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
                    <Lock size={18} />
                  </div>
                  <h2 className="font-bold text-xl">Security Configuration</h2>
                </div>

                <div className="space-y-10">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">New Password</Label>
                        <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 rounded-lg h-11" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Confirm Password</Label>
                        <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 rounded-lg h-11" />
                      </div>
                    </div>
                    <Button variant="outline" className="border-white/10 bg-white/5 h-10 px-6 text-xs font-bold">Update Password</Button>
                  </div>

                  <Separator className="bg-white/5" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
                        <ShieldCheck className="text-emerald-500" size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Two-Factor Authentication</p>
                        <p className="text-xs text-zinc-500 mt-1">Enhance account security with SMS or App verification.</p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <Separator className="bg-white/5" />

                  <div>
                    <h3 className="text-sm font-bold mb-6">Active Sessions</h3>
                    <div className="space-y-4">
                      {[
                        { device: 'MacBook Pro (Sonoma)', location: 'New York, US', status: 'Current Session', icon: Monitor },
                        { device: 'iPhone 15 Pro', location: 'New York, US', status: '2 hours ago', icon: Monitor }
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500">
                              <session.icon size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-bold">{session.device}</p>
                              <p className="text-[10px] text-zinc-500 font-medium">{session.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold uppercase text-zinc-600">{session.status}</span>
                            {i !== 0 && <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500/50 hover:text-red-500"><Trash2 size={14} /></Button>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
