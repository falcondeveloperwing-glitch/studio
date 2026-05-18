'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/components/demo/demo-context';
import { 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Play,
  Globe,
  Users,
  Database,
  Search,
  History,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const { startDemo } = useDemo();

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-dashboard');
  const inboxImage = PlaceHolderImages.find(img => img.id === 'feature-inbox');
  const automationImage = PlaceHolderImages.find(img => img.id === 'feature-automation');

  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-white/10 font-body overflow-x-hidden relative">
      <div className="absolute inset-0 noise z-0" />
      
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50 h-20 flex items-center">
        <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-white/30 shadow-2xl">
              <Zap className="text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" size={20} />
            </div>
            <span className="font-headline text-xl font-bold tracking-tighter text-white uppercase">
              Reply<span className="text-zinc-500">Rush</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500">
            <Link href="/platform" className="hover:text-white transition-colors">Platform</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/status" className="flex items-center gap-2 hover:text-white transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              Status
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-black hover:bg-zinc-200 rounded-xl px-7 h-11 text-[11px] font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95">
                Deploy Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-white/[0.02] blur-[180px] rounded-full pointer-events-none" />
        
        <div className="container max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.04] text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-12 shadow-xl">
              <Globe size={14} className="text-zinc-600" /> Infrastructure for High-Performance Commerce
            </div>
            <h1 className="text-7xl md:text-[10rem] font-bold font-headline tracking-tighter mb-12 leading-[0.85] text-white">
              Turn DMs into <span className="text-zinc-700">revenue.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
              The operating system for high-volume Instagram commerce. Qualify inquiries, recover abandoned leads, and scale your sales fleet with deterministic AI logic.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-32">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-2xl px-12 h-16 text-base font-bold group shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-all active:scale-95">
                  Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </Link>
              <Button 
                onClick={startDemo}
                variant="outline" 
                size="lg" 
                className="border-white/5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl px-12 h-16 text-base font-bold gap-4 transition-all shadow-xl active:scale-95"
              >
                <Play size={18} fill="currentColor" /> Watch Cinematic Demo
              </Button>
            </div>

            {/* Main Product Showcase */}
            <div className="relative group mx-auto max-w-6xl">
              <div className="absolute -inset-2 bg-gradient-to-b from-white/10 to-transparent rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
              <div className="relative rounded-[2.5rem] border border-white/10 bg-zinc-950 overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.9)]">
                {heroImage && (
                  <Image 
                    src={heroImage.imageUrl} 
                    alt={heroImage.description}
                    width={1200}
                    height={800}
                    priority
                    data-ai-hint={heroImage.imageHint}
                    className="w-full h-auto transition-transform duration-1000 group-hover:scale-[1.01]"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 border-y border-white/5 bg-[#050507]">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 mb-16">
            Trusted by the next generation of commerce fleets
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 grayscale transition-all hover:opacity-100 hover:grayscale-0 duration-700">
            {['NIKE', 'SHOPIFY', 'ZARA', 'H&M', 'SUPREME', 'STUSSY'].map((brand) => (
              <span key={brand} className="text-3xl font-black font-headline tracking-tighter text-white">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Sections */}
      <section id="platform" className="py-40 bg-black">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center mb-56">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-10 shadow-2xl">
                <MessageSquare size={28} />
              </div>
              <h2 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-10 leading-[0.9]">
                Intelligent Inbox.<br/>
                <span className="text-zinc-700">Unified engagement.</span>
              </h2>
              <p className="text-xl text-zinc-500 mb-12 leading-relaxed font-medium">
                Our infrastructure analyzes customer intent in real-time. Respond to sizing, pricing, and availability queries with neural-assisted precision and sub-second sync.
              </p>
              <ul className="space-y-6 mb-12">
                {[
                  'Neural buying intent detection',
                  'Deterministic response logic',
                  'Unified fleet collaboration',
                  'Sentiment analysis pipeline'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm font-bold text-zinc-300">
                    <CheckCircle2 size={18} className="text-white" /> {feature}
                  </li>
                ))}
              </ul>
              <Link href="/platform/inbox">
                <Button variant="link" className="text-white font-bold p-0 group h-auto text-base">
                  Explore Inbox Infrastructure <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] bg-zinc-950 group">
              {inboxImage && (
                <Image 
                  src={inboxImage.imageUrl} 
                  alt={inboxImage.description}
                  width={800}
                  height={600}
                  data-ai-hint={inboxImage.imageHint}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-32 items-center mb-40">
            <div className="order-2 lg:order-1 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] bg-zinc-950 group">
              {automationImage && (
                <Image 
                  src={automationImage.imageUrl} 
                  alt={automationImage.description}
                  width={800}
                  height={600}
                  data-ai-hint={automationImage.imageHint}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-10 shadow-2xl">
                <Zap size={28} />
              </div>
              <h2 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-10 leading-[0.9]">
                Visual Automations.<br/>
                <span className="text-zinc-700">Revenue logic.</span>
              </h2>
              <p className="text-xl text-zinc-500 mb-12 leading-relaxed font-medium">
                Build sophisticated sales workflows without code. Trigger automated follow-ups, apply loyalty discounts, and recover abandoned leads with non-repudiable stateful logic.
              </p>
              <div className="grid grid-cols-2 gap-10 mb-12">
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Response Offset</p>
                  <p className="text-4xl font-bold tracking-tight">0.08s</p>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Recovery Rate</p>
                  <p className="text-4xl font-bold tracking-tight text-emerald-500">31.4%</p>
                </div>
              </div>
              <Link href="/platform/automations">
                <Button variant="link" className="text-white font-bold p-0 group h-auto text-base">
                  Explore Sales Logic <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Infrastructure Section */}
      <section className="py-40 border-t border-white/5 bg-[#050507]">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="rounded-[3rem] border border-white/5 bg-zinc-950/40 p-16 md:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.01] blur-[120px] rounded-full" />
            <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                <h2 className="text-5xl font-bold font-headline tracking-tighter mb-10 text-white leading-tight">Enterprise-Grade<br/>Infrastructure.</h2>
                <p className="text-xl text-zinc-500 mb-16 font-medium leading-relaxed">Designed for commerce fleets that demand absolute reliability, non-repudiable data control, and sub-second scale.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {[
                    { title: 'Audit Integrity', desc: 'Full historical logs of all mutations.', icon: ShieldCheck },
                    { title: 'RBAC Permissions', desc: 'Granular access for your entire fleet.', icon: Users },
                    { title: 'System Health', desc: 'Real-time global infrastructure status.', icon: History },
                    { title: 'Data Isolation', desc: 'Secure, isolated tenant environments.', icon: Database }
                  ].map((item, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex items-center gap-4 text-white font-bold text-base">
                        <item.icon size={22} className="text-zinc-400" /> {item.title}
                      </div>
                      <p className="text-sm text-zinc-600 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md aspect-square rounded-full border border-white/5 flex items-center justify-center relative bg-black/20">
                  <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.75] animate-pulse" />
                  <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.5]" />
                  <Zap className="text-white opacity-20 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" size={140} />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-5 py-2.5 rounded-full border border-white/10 text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl">Global Sync</div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-zinc-950 px-5 py-2.5 rounded-full border border-white/10 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 shadow-2xl flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.01]" />
        <div className="container max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-7xl md:text-[10rem] font-bold font-headline tracking-tighter mb-16 max-w-6xl mx-auto leading-[0.85] text-white">
              Automate your <span className="text-zinc-800">sales fleet.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-2xl px-16 h-20 text-lg font-bold group shadow-[0_24px_60px_rgba(255,255,255,0.15)] transition-all active:scale-95">
                  Deploy Free Trial <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                onClick={startDemo}
                variant="outline" 
                size="lg" 
                className="border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-2xl px-16 h-20 text-lg font-bold transition-all active:scale-95 shadow-xl"
              >
                Watch Cinematic Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-[#050507] border-t border-white/5 relative z-10">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 mb-24">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-10">
                <Zap className="text-white fill-white" size={24} />
                <span className="font-headline text-2xl font-bold tracking-tighter uppercase">ReplyRush</span>
              </Link>
              <p className="text-sm text-zinc-600 max-w-xs leading-relaxed font-bold uppercase tracking-widest">
                Infrastructure for high-performance commerce. Every inquiry is a checkout opportunity.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Platform</h4>
              <ul className="space-y-5 text-xs font-bold text-zinc-600 uppercase tracking-widest">
                <li><Link href="/platform" className="hover:text-white transition-colors">Platform Overview</Link></li>
                <li><Link href="/platform/inbox" className="hover:text-white transition-colors">Intelligent Inbox</Link></li>
                <li><Link href="/platform/automations" className="hover:text-white transition-colors">Visual Automations</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Resources</h4>
              <ul className="space-y-5 text-xs font-bold text-zinc-600 uppercase tracking-widest">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="/api-reference" className="hover:text-white transition-colors">API Reference</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Legal</h4>
              <ul className="space-y-5 text-xs font-bold text-zinc-600 uppercase tracking-widest">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/sla" className="hover:text-white transition-colors">SLA</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Fleet</h4>
              <ul className="space-y-5 text-xs font-bold text-zinc-600 uppercase tracking-widest">
                <li><span className="opacity-30 cursor-not-allowed">Twitter</span></li>
                <li><span className="opacity-30 cursor-not-allowed">LinkedIn</span></li>
                <li><span className="opacity-30 cursor-not-allowed">Instagram</span></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
            <p className="text-[10px] text-zinc-800 font-black uppercase tracking-[0.4em]">© 2025 ReplyRush AI Infrastructure.</p>
            <div className="flex gap-10 text-[10px] font-black text-zinc-800 uppercase tracking-[0.4em]">
              <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-900" /> Region: Global</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-900" /> Uptime: 99.9%</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
