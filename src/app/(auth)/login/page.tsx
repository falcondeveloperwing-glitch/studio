'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
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
          <Button 
            variant="outline" 
            className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-xs uppercase tracking-widest gap-3 mb-8"
            type="button"
            onClick={() => toast({ title: "Auth Sync", description: "Connecting to Google infrastructure..." })}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Or credentials</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Account Email</label>
              <Input 
                className="h-12 bg-white/[0.03] border-white/10 rounded-xl px-4 text-sm text-white focus-visible:ring-primary/50" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Password</label>
                <Link href="#" className="text-[10px] text-primary uppercase font-bold tracking-widest hover:underline">Recovery</Link>
              </div>
              <Input 
                type="password" 
                className="h-12 bg-white/[0.03] border-white/10 rounded-xl px-4 text-sm text-white focus-visible:ring-primary/50" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full h-12 bg-primary text-black hover:bg-primary/90 rounded-xl font-bold text-sm group transition-all duration-500 active:scale-95" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" /></>}
            </Button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-[10px] uppercase font-black text-zinc-600 tracking-[0.4em]">Quick Demo Access</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="h-9 px-4 border-white/5 bg-white/[0.02] hover:bg-white/10 rounded-lg font-black text-[9px] uppercase tracking-widest gap-2 text-white"
                onClick={() => fillDemo('demo@replyrush.ai')}
                type="button"
              >
                Admin
              </Button>
              <Button 
                variant="outline" 
                className="h-9 px-4 border-white/5 bg-white/[0.02] hover:bg-white/10 rounded-lg font-black text-[9px] uppercase tracking-widest gap-2 text-white"
                onClick={() => fillDemo('business@replyrush.ai')}
                type="button"
              >
                Business
              </Button>
            </div>
          </div>
        </GlassCard>

        <p className="text-center mt-10 text-xs text-zinc-500 font-medium">
          New to the fleet? <Link href="/signup" className="text-white font-bold hover:underline">Deploy free trial</Link>
        </p>
        
        <div className="mt-12 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
        </div>
      </motion.div>
    </div>
  );
}
