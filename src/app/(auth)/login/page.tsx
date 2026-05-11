
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useLocalAuth } from '@/hooks/use-local-auth';

export default function LoginPage() {
  const { login } = useLocalAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock delay for cinematic feel
    setTimeout(() => {
      login(email, email.includes('admin') ? 'admin' : 'business');
    }, 1500);
  };

  const fillDemo = (role: 'admin' | 'business') => {
    setEmail(role === 'admin' ? 'demo@replyrush.ai' : 'business@replyrush.ai');
    setPassword(role === 'admin' ? 'ReplyRush123' : 'Business123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-8">
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-primary/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[150px] rounded-full" />
      <div className="absolute inset-0 noise z-0" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-500">
              <Zap className="text-white fill-white" size={24} />
            </div>
            <span className="font-headline text-3xl font-bold tracking-tighter">ReplyRush<span className="text-primary">AI</span></span>
          </Link>
          <h1 className="font-headline text-4xl font-bold mb-4 tracking-tighter">Welcome back</h1>
          <p className="text-muted-foreground text-lg">Sign in to manage your neural sales team.</p>
        </div>

        <GlassCard className="p-10 border-white/[0.06] shadow-2xl" variant="darker">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Account Email</label>
              <Input 
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-base focus-visible:ring-primary/50" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Password</label>
                <Link href="#" className="text-[10px] text-primary uppercase font-bold tracking-widest hover:underline">Forgot?</Link>
              </div>
              <Input 
                type="password" 
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-base focus-visible:ring-primary/50" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 glow-primary rounded-2xl font-bold text-lg group transition-all duration-500 active:scale-95" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" /></>}
            </Button>
          </form>

          <div className="my-10 flex items-center gap-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.4em]">Demo Access</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-12 border-white/5 bg-white/[0.02] hover:bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest gap-2"
              onClick={() => fillDemo('admin')}
            >
              <Sparkles size={14} className="text-primary" /> Admin
            </Button>
            <Button 
              variant="outline" 
              className="h-12 border-white/5 bg-white/[0.02] hover:bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest gap-2"
              onClick={() => fillDemo('business')}
            >
              <Zap size={14} className="text-accent" /> Business
            </Button>
          </div>
        </GlassCard>

        <p className="text-center mt-10 text-sm text-muted-foreground">
          New to ReplyRush? <Link href="/signup" className="text-primary font-bold hover:underline">Launch free trial</Link>
        </p>
      </motion.div>
    </div>
  );
}
