
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, Instagram, ArrowRight, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { auth } = initializeFirebase();
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: 'admin' | 'business') => {
    if (role === 'admin') {
      setEmail('demo@replyrush.ai');
      setPassword('ReplyRush123');
    } else {
      setEmail('business@replyrush.ai');
      setPassword('Business123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-6">
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[150px] rounded-full" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
              <Zap className="text-white fill-white" size={20} />
            </div>
            <span className="font-headline text-2xl font-bold">ReplyRush<span className="text-primary">AI</span></span>
          </Link>
          <h1 className="font-headline text-3xl font-bold mb-2 tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to manage your AI sales team.</p>
        </div>

        <GlassCard className="p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
              <Input 
                className="h-12 bg-white/5 border-white/10 rounded-xl" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input 
                type="password" 
                className="h-12 bg-white/5 border-white/10 rounded-xl" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <p className="text-destructive text-xs font-bold">{error}</p>}

            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 glow-primary rounded-xl font-bold text-lg" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-center">Demo Accounts</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-xs" onClick={() => fillDemo('admin')}>
              Admin Demo
            </Button>
            <Button variant="outline" className="h-12 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-xs" onClick={() => fillDemo('business')}>
              Business Demo
            </Button>
          </div>
        </GlassCard>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
}
