import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, Instagram, ShieldCheck, Check } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-6">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[150px] rounded-full" />
      
      <div className="w-full max-w-lg grid grid-cols-1 lg:grid-cols-1 gap-12 relative z-10">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20 shadow-2xl">
                <Zap className="text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" size={20} />
              </div>
              <span className="font-headline text-2xl font-bold tracking-tight text-white uppercase">
                Reply<span className="text-zinc-500">Rush</span>
              </span>
            </Link>
            <h1 className="font-headline text-3xl font-bold mb-2 text-white">Create your account</h1>
            <p className="text-muted-foreground">Start your 7-day free trial. Setup in 2 minutes.</p>
          </div>

          <GlassCard className="p-8">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">First Name</label>
                  <Input className="h-12 bg-white/5 border-white/10 rounded-xl" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Name</label>
                  <Input className="h-12 bg-white/5 border-white/10 rounded-xl" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                <Input className="h-12 bg-white/5 border-white/10 rounded-xl" placeholder="john@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Password</label>
                <Input type="password" className="h-12 bg-white/5 border-white/10 rounded-xl" placeholder="At least 8 characters" />
              </div>
              <div className="flex items-start gap-2 py-2">
                <div className="w-4 h-4 rounded border border-white/20 bg-white/5 flex items-center justify-center mt-0.5">
                  <Check size={10} className="text-primary" />
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.</p>
              </div>
              <Button className="w-full h-12 bg-primary text-black hover:bg-primary/90 rounded-xl font-bold text-lg mt-2">
                Create Account
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Or sign up with</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <Button variant="outline" className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl font-bold gap-3">
              <Instagram size={18} /> Instagram Connect
            </Button>
          </GlassCard>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
