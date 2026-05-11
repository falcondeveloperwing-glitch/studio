"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Instagram, 
  Sparkles, 
  Bell, 
  Users, 
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="font-headline text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your business profile, AI personality, and platform integrations.</p>
      </div>

      <div className="space-y-8">
        {/* Business Profile */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-primary/20">
              <User className="text-primary" size={20} />
            </div>
            <h2 className="font-headline font-bold text-xl">Business Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase">Brand Name</Label>
              <Input className="bg-white/5 border-white/10 rounded-xl" defaultValue="Nike Official Store" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase">Contact Email</Label>
              <Input className="bg-white/5 border-white/10 rounded-xl" defaultValue="support@nike.com" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase">Business Description</Label>
              <Input className="bg-white/5 border-white/10 rounded-xl" defaultValue="Premium sportswear and lifestyle brand." />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 rounded-xl px-8 h-10 font-bold">Save Profile</Button>
          </div>
        </GlassCard>

        {/* AI Personality */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-accent/20">
              <Sparkles className="text-accent" size={20} />
            </div>
            <h2 className="font-headline font-bold text-xl">AI Assistant Personality</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Professional', 'Friendly', 'Luxury'].map((tone) => (
                <div key={tone} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${tone === 'Luxury' ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}>
                  <p className="text-sm font-bold mb-1">{tone}</p>
                  <p className="text-[10px] text-muted-foreground">Tailored for {tone.toLowerCase()} brands.</p>
                </div>
              ))}
            </div>

            <Separator className="bg-white/5" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Auto-escalate to human</p>
                <p className="text-[11px] text-muted-foreground">Automatically notify staff when AI cannot answer.</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Show "AI Assistant" badge</p>
                <p className="text-[11px] text-muted-foreground">Inform customers that they are speaking to AI.</p>
              </div>
              <Switch />
            </div>
          </div>
        </GlassCard>

        {/* Integration Placeholder */}
        <GlassCard className="relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center shadow-lg">
                <Instagram className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold">Instagram Connection</h3>
                <p className="text-xs text-muted-foreground">Connected as <span className="text-white font-medium">@nike_official</span></p>
              </div>
            </div>
            <Button variant="outline" className="border-white/10 bg-white/5 h-10 rounded-xl px-6 font-bold text-xs">Disconnect Account</Button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        </GlassCard>

        {/* Settings Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Notification Settings', icon: Bell, desc: 'Manage alerts and push notifications' },
            { label: 'Team Members', icon: Users, desc: 'Invite and manage your sales staff' },
            { label: 'Billing & Subscriptions', icon: CreditCard, desc: 'Manage your plan and invoices' },
            { label: 'Security & Auth', icon: ShieldCheck, desc: '2FA and login activity' }
          ].map((item, i) => (
            <GlassCard key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-white transition-colors" />
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}