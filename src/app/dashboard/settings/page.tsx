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
  ShieldCheck
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-zinc-500 font-medium">Manage your business profile and platform preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Business Profile */}
        <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
              <User size={18} />
            </div>
            <h2 className="font-bold text-xl">Business Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Brand Name</Label>
              <Input className="bg-white/5 border-white/10 rounded-lg h-10" defaultValue="Nike Official Store" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contact Email</Label>
              <Input className="bg-white/5 border-white/10 rounded-lg h-10" defaultValue="support@nike.com" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description</Label>
              <Input className="bg-white/5 border-white/10 rounded-lg h-10" defaultValue="Premium sportswear and lifestyle brand." />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg px-6 h-10 font-bold text-xs">Save Changes</Button>
          </div>
        </GlassCard>

        {/* Assistant Personality */}
        <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
              <Sparkles size={18} />
            </div>
            <h2 className="font-bold text-xl">Automation Tone</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['Professional', 'Friendly', 'Luxury'].map((tone) => (
                <div key={tone} className={`p-4 rounded-xl border-2 transition-all ${tone === 'Professional' ? 'border-white bg-white/5' : 'border-white/5 bg-white/[0.01] hover:border-white/10 cursor-pointer'}`}>
                  <p className="text-sm font-bold mb-1">{tone}</p>
                  <p className="text-[10px] text-zinc-500 font-medium">Standard {tone.toLowerCase()} responses.</p>
                </div>
              ))}
            </div>

            <Separator className="bg-white/5" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Auto-escalate to human</p>
                  <p className="text-xs text-zinc-500">Notify team when a response cannot be automated.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Show "AI Assistant" label</p>
                  <p className="text-xs text-zinc-500">Inform customers they are interacting with automation.</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Integrations */}
        <GlassCard className="border-white/5 bg-zinc-950/50 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
                <Instagram className="text-zinc-400" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Instagram Connection</h3>
                <p className="text-xs text-zinc-500">Connected as <span className="text-white">@nike_official</span></p>
              </div>
            </div>
            <Button variant="outline" className="border-white/10 bg-white/5 h-9 rounded-lg px-4 text-xs font-bold">Manage</Button>
          </div>
        </GlassCard>

        {/* Navigation Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Notifications', icon: Bell, desc: 'Manage alerts' },
            { label: 'Team Members', icon: Users, desc: 'Manage staff access' },
            { label: 'Billing', icon: CreditCard, desc: 'Manage plan' },
            { label: 'Security', icon: ShieldCheck, desc: 'Password and auth' }
          ].map((item, i) => (
            <GlassCard key={i} className="flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors p-4 border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-zinc-600" />
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
