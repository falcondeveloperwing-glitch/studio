'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { useLocalAuth } from '@/hooks/use-local-auth';
import { useToast } from '@/hooks/use-toast';
import { MOCK_USERS } from '@/lib/mock-users';

export default function LoginPage() {
  const { login } = useLocalAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Cinematic delay for realism
    setTimeout(() => {
      const success = login(email, password);
      
      if (success) {
        toast({
          title: "Access Granted",
          description: "Neural sales fleet is online.",
        });
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "Invalid credentials. Please use the demo accounts.",
        });
      }
    }, 1000);
  };

  const fillDemo = (email: string) => {
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020203] px-8">
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
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20 shadow-2xl">
              <Zap className="text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" size={24} />
            </div>
            <span className="font-headline text-3xl font-bold tracking-tight text-white uppercase">
              Reply<span className="text-zinc-500">Rush</span>
            </span>
          </Link>
          <h1 className="font-headline text-4xl font-bold mb-4 tracking-tighter text-white">Command Center</h1>
          <p className="text-muted-foreground text-lg">Sign in to manage your AI fleet.</p>
        </div>

        <GlassCard className="p-10 border-white/[0.06] shadow-2xl" variant="darker">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Account Email</label>
              <Input 
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-base text-white focus-visible:ring-primary/50" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Password</label>
                <Link href="#" className="text-[10px] text-primary uppercase font-bold tracking-widest hover:underline">Recovery</Link>
              </div>
              <Input 
                type="password" 
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-base text-white focus-visible:ring-primary/50" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full h-14 bg-primary text-black hover:bg-primary/90 rounded-2xl font-bold text-lg group transition-all duration-500 active:scale-95" disabled={loading}>
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
              className="h-12 border-white/5 bg-white/[0.02] hover:bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest gap-2 text-white"
              onClick={() => fillDemo('demo@replyrush.ai')}
              type="button"
            >
              <ShieldCheck size={14} className="text-white" /> Admin
            </Button>
            <Button 
              variant="outline" 
              className="h-12 border-white/5 bg-white/[0.02] hover:bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest gap-2 text-white"
              onClick={() => fillDemo('business@replyrush.ai')}
              type="button"
            >
              <Zap size={14} className="text-white" /> Business
            </Button>
          </div>
        </GlassCard>

        <p className="text-center mt-10 text-sm text-muted-foreground">
          New to the fleet? <Link href="/signup" className="text-primary font-bold hover:underline">Deploy free trial</Link>
        </p>
      </motion.div>
    </div>
  );
}
