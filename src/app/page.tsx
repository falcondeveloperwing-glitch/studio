
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  BarChart3, 
  Instagram, 
  Sparkles,
  Play,
  TrendingUp,
  ShieldCheck,
  Globe,
  BrainCircuit,
  Command,
  Target,
  DollarSign
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } }
};

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-dashboard');

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background selection:bg-primary/30">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh opacity-80 pointer-events-none" />
      <div className="absolute top-[-15%] left-[-5%] w-[60%] h-[60%] bg-primary/20 blur-[180px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute inset-0 noise z-0" />

      <nav className="container mx-auto px-8 py-10 flex items-center justify-between relative z-50">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center glow-primary group-hover:scale-110 transition-all duration-500">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="font-headline text-3xl font-bold tracking-tighter text-white">ReplyRush<span className="text-primary">AI</span></span>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">
          <Link href="#features" className="hover:text-white transition-colors">Neural Logic</Link>
          <Link href="#enterprise" className="hover:text-white transition-colors">Enterprise</Link>
          <Link href="#demo" className="hover:text-white transition-colors">Acquisition</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" className="text-muted-foreground hover:text-white font-bold text-[10px] uppercase tracking-widest">Console Access</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 glow-primary rounded-2xl font-bold h-14 px-10 text-xs uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl text-white">
              Deploy Agent
            </Button>
          </Link>
        </div>
      </nav>

      <section className="container mx-auto px-8 pt-32 lg:pt-48 pb-40 text-center relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-primary text-[10px] font-black tracking-[0.4em] mb-12 uppercase">
          <Sparkles size={12} className="animate-pulse" />
          The $100k+ Sales Pipeline Recapture Asset
        </motion.div>
        
        <motion.h1 {...fadeInUp} className="font-headline text-6xl sm:text-8xl md:text-9xl font-bold mb-10 max-w-7xl mx-auto leading-[0.8] tracking-tighter text-gradient pb-6">
          Neural Sales <br className="hidden lg:block" /> Intelligence.
        </motion.h1>
        
        <motion.p {...fadeInUp} transition={{ delay: 0.2 }} className="text-xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-20 font-body leading-relaxed opacity-70 font-light">
          Scale your Instagram revenue 24/7. Recapture 42% of abandoned DMs with a neural agent that learns your product catalog in seconds.
        </motion.p>
        
        <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-40">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full h-20 px-14 text-xl font-bold bg-primary hover:bg-primary/90 glow-primary rounded-[2rem] group transition-all duration-500 hover:scale-[1.02] shadow-2xl text-white">
              Deploy Free Trial <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto h-20 px-14 text-xl font-bold border-white/10 glass rounded-[2rem] hover:bg-white/10 transition-all duration-500 group">
            <Play className="mr-3 fill-white group-hover:scale-110 transition-transform" size={24} /> Acquisition Demo
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative max-w-7xl mx-auto group">
          <div className="absolute inset-0 bg-primary/10 blur-[200px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity" />
          <div className="rounded-[3.5rem] p-2 bg-gradient-to-b from-white/20 to-transparent">
            <div className="rounded-[3rem] overflow-hidden border border-white/10 relative aspect-[16/10] bg-black/60 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">
              {heroImg ? (
                <Image src={heroImg.imageUrl} alt="Neural Dashboard" fill className="object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-[4s]" priority />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center"><Zap className="text-white/10 animate-pulse" size={80} /></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          </div>
          
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-10 -right-10 lg:-right-20 p-8 glass rounded-[2.5rem] w-80 text-left border-primary/30 shadow-2xl hidden md:block">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-2xl"><DollarSign size={24} /></div>
              <div>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Capital Recaptured</p>
                <p className="text-2xl font-bold font-headline text-white">$142,850</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed font-medium italic">"The agent successfully stabilized our DM funnel, increasing LTV by 14.2%."</p>
          </motion.div>
        </motion.div>
      </section>

      <section id="features" className="container mx-auto px-8 py-40 relative">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-10 mb-32">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-block px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              Neural Precision Fleet
            </motion.div>
            <h2 className="font-headline text-6xl lg:text-9xl font-bold tracking-tighter leading-[0.8] text-gradient pb-4">Revenue at <br/> Infinite Scale.</h2>
          </div>
          <p className="max-w-md text-xl text-muted-foreground leading-relaxed opacity-60 font-light">ReplyRush is a high-value SaaS asset designed to solve the critical "latency churn" for 7-figure Instagram brands. Built for acquisition, designed for performance.</p>
        </div>

        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: 'Neural Intent', icon: BrainCircuit, color: 'primary', desc: 'Reads buyer sentiment and urgency to prioritize high-ticket negotiations over support tickets.' },
            { title: 'Funnel Recovery', icon: Target, color: 'emerald-500', desc: 'Re-engages dormant leads automatically using scarcity triggers and personalized incentives.' },
            { title: 'Brand Synthesis', icon: Command, color: 'accent', desc: 'Syncs with your ERP or policy docs in minutes to provide pixel-perfect, on-brand responses.' }
          ].map((feature, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <GlassCard className="h-full p-12 border-white/[0.05] hover:border-white/20 rounded-[3rem]">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl ${feature.color === 'primary' ? 'bg-primary/20 text-primary' : feature.color === 'accent' ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'}`}>
                  <feature.icon size={36} />
                </div>
                <h3 className="font-headline text-3xl font-bold mb-6 tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed opacity-60 font-light">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer className="container mx-auto px-10 py-32 border-t border-white/[0.05] text-center">
        <div className="flex flex-col items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center glow-primary"><Zap className="text-white fill-white" size={24} /></div>
            <span className="font-headline text-3xl font-bold">ReplyRush<span className="text-primary">AI</span></span>
          </div>
          <div className="flex gap-12 text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">
            <Link href="#" className="hover:text-white transition-colors">Legal</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">API Docs</Link>
          </div>
          <p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.6em] mt-10">© 2025 ReplyRush AI — Neural Commerce Systems Group.</p>
        </div>
      </footer>
    </div>
  );
}
