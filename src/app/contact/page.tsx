'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, Mail, MessageSquare, Globe, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Received",
      description: "Our enterprise support team will contact you within 2 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-white/10">
      <nav className="border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Zap className="text-white fill-white" size={20} />
            <span className="font-headline text-xl font-bold uppercase tracking-tight">ReplyRush</span>
          </Link>
          <Link href="/login" className="text-sm font-bold text-zinc-500 hover:text-white transition-colors">Sign In</Link>
        </div>
      </nav>

      <div className="container max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-bold font-headline tracking-tighter mb-8">Contact Our Fleet</h1>
            <p className="text-lg text-zinc-500 mb-12 leading-relaxed">
              Have questions about enterprise deployment, custom AI logic, or account high-performance scaling? Our team is ready to assist.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-600 mb-1">Email Support</p>
                  <p className="text-sm font-bold">fleet@replyrush.ai</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-600 mb-1">Live Demo</p>
                  <p className="text-sm font-bold">Schedule a Zoom briefing</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-600 mb-1">HQ</p>
                  <p className="text-sm font-bold">New York City, NY</p>
                </div>
              </div>
            </div>
          </div>

          <GlassCard className="p-8 border-white/5 bg-zinc-950/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">First Name</label>
                  <Input className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Last Name</label>
                  <Input className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Work Email</label>
                <Input type="email" className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="john@company.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Message</label>
                <Textarea className="bg-white/5 border-white/10 min-h-[150px] rounded-xl" placeholder="How can we help your business scale?" required />
              </div>
              <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold">
                Send Inquiry <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
