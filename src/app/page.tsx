
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
  ShieldCheck, 
  Instagram, 
  Sparkles,
  CheckCircle2,
  Users,
  Play
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-dashboard');

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Cinematic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 noise z-0" />

      {/* Navigation */}
      <nav className="container mx-auto px-8 py-8 flex items-center justify-between relative z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-500">
            <Zap className="text-white fill-white" size={22} />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tighter text-white">ReplyRush<span className="text-primary">AI</span></span>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">
          <Link href="#features" className="hover:text-white transition-colors">Performance</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#demo" className="hover:text-white transition-colors">Showcase</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-white font-bold text-xs uppercase tracking-widest">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 glow-primary rounded-2xl font-bold h-12 px-8 text-sm tracking-tight transition-all duration-500 hover:scale-105 active:scale-95">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-8 pt-32 pb-48 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-primary text-[10px] font-black tracking-[0.2em] mb-12 uppercase"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Neural Sales Engine v4.0 is Live
        </motion.div>
        
        <motion.h1 
          {...fadeInUp}
          className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold mb-10 max-w-6xl mx-auto leading-[0.85] tracking-tighter text-gradient py-4"
        >
          Your AI Instagram <br className="hidden lg:block" /> Sales Team
        </motion.h1>
        
        <motion.p 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 font-body leading-relaxed"
        >
          Reply instantly, recover lost customers, and automate every conversation 24/7 with a sales agent that sounds like you.
        </motion.p>
        
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32"
        >
          <Link href="/signup">
            <Button size="lg" className="h-20 px-12 text-xl font-bold bg-primary hover:bg-primary/90 glow-primary rounded-3xl group transition-all duration-500 hover:scale-[1.02] shadow-2xl">
              Launch Agent <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-20 px-12 text-xl font-bold border-white/10 glass rounded-3xl hover:bg-white/10 transition-all duration-500 group">
            <Play className="mr-3 fill-white group-hover:scale-110 transition-transform" size={20} /> Watch Demo
          </Button>
        </motion.div>

        {/* Cinematic Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative max-w-7xl mx-auto px-4"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[180px] rounded-[4rem] -z-10 animate-pulse" />
          <div className="gradient-border-mask rounded-[3rem]">
            <GlassCard variant="darker" className="p-3 border-none shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-[3rem]">
              <div className="rounded-[2.5rem] overflow-hidden border border-white/5 relative aspect-[16/9] bg-black/40">
                {heroImg ? (
                  <Image 
                    src={heroImg.imageUrl} 
                    alt="Dashboard Preview" 
                    fill
                    className="object-cover opacity-90"
                    priority
                    data-ai-hint="futuristic SaaS dashboard"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="text-white/10 animate-pulse" size={80} />
                  </div>
                )}
                
                {/* Overlay Floating Card */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 left-12 p-6 glass rounded-3xl w-72 text-left border-primary/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-primary/20 text-primary">
                      <Sparkles size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white">AI Suggestion</span>
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed italic">"I see Jordan asked about the XL black hoodie. I've sent the sizing guide and a 10% discount link."</p>
                </motion.div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section id="features" className="container mx-auto px-8 py-40 relative">
        <div className="text-center mb-32 max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Advanced Automations
          </motion.div>
          <motion.h2 {...fadeInUp} className="font-headline text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-[0.9]">
            Scale without <br className="hidden md:block" /> the headcount.
          </motion.h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10"
        >
          {[
            { 
              title: 'Contextual Logic', 
              icon: BrainCircuit, 
              color: 'primary',
              desc: 'Our AI understands intent, tone, and slang. It closes deals using your specific brand voice and store policies.'
            },
            { 
              title: 'Visual Workflow', 
              icon: Zap, 
              color: 'accent',
              desc: 'Design complex multi-step DMs without code. Qualify leads, fetch order data, and send checkout links instantly.'
            },
            { 
              title: 'Revenue Guard', 
              icon: BarChart3, 
              color: 'emerald-500',
              desc: 'Never miss an abandoned cart again. ReplyRush recovers up to 45% of dormant leads in the first 24 hours.'
            }
          ].map((feature, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <GlassCard className="h-full p-12 border-white/[0.04] hover:border-white/10 group cursor-pointer transition-all duration-700">
                <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 shadow-2xl ${feature.color === 'primary' ? 'bg-primary/20 text-primary' : feature.color === 'accent' ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'}`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="font-headline text-3xl font-bold mb-6 tracking-tight text-white">{feature.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-8 py-48">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/30 via-black to-transparent border border-white/[0.05] p-24 rounded-[4rem] text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
          <h2 className="font-headline text-6xl md:text-8xl font-bold mb-10 tracking-tighter text-gradient py-2">Ready to scale?</h2>
          <p className="text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed font-body">Join 500+ premium Instagram brands automating their growth today.</p>
          <Link href="/signup">
            <Button size="lg" className="h-24 px-16 text-3xl font-black bg-primary hover:bg-primary/90 glow-primary rounded-[2rem] transition-all duration-500 hover:scale-[1.05] shadow-[0_20px_60px_rgba(104,20,247,0.4)]">
              Start Free Trial <ArrowRight className="ml-4" size={32} />
            </Button>
          </Link>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-12 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">
            <span className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Instant Setup</span>
            <span className="flex items-center gap-3"><Users size={18} className="text-primary" /> 24/7 Support</span>
            <span className="flex items-center gap-3"><ShieldCheck size={18} className="text-primary" /> Enterprise Security</span>
          </div>
        </motion.div>
      </section>

      <footer className="container mx-auto px-8 py-24 border-t border-white/[0.05] text-center">
        <p className="text-[11px] font-black text-muted-foreground/40 uppercase tracking-[0.6em]">© 2025 ReplyRush AI — The Future of Commerce.</p>
      </footer>
    </div>
  );
}

function BrainCircuit({ size, className }: { size?: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 .3 4.96 2.5 2.5 0 0 0 3.32 1.45 2.5 2.5 0 0 0 4.96.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0-.3-4.96 2.5 2.5 0 0 0-3.32-1.45z"></path>
      <path d="M15 13a6 6 0 0 1-6-6"></path>
      <circle cx="9" cy="7" r="1"></circle>
      <circle cx="15" cy="13" r="1"></circle>
      <path d="M12 12v10"></path>
      <path d="M9 22h6"></path>
    </svg>
  );
}
