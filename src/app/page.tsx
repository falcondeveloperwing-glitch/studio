
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
  Clock
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const { startDemo } = useDemo();

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-dashboard');
  const inboxImage = PlaceHolderImages.find(img => img.id === 'feature-inbox');
  const automationImage = PlaceHolderImages.find(img => img.id === 'feature-automation');

  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-white/10 font-body overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20 shadow-2xl">
              <Zap className="text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" size={18} />
            </div>
            <span className="font-headline text-lg font-bold tracking-tight text-white uppercase">
              Reply<span className="text-zinc-500">Rush</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <Link href="/platform" className="hover:text-white transition-colors">Platform</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/status" className="flex items-center gap-2 hover:text-white transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Status
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white mr-4 transition-colors">
              Sign In
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg px-6 h-10 text-[11px] font-black uppercase tracking-widest shadow-xl">
                Deploy Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100%] h-[100%] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-10">
              <Globe size={12} className="text-zinc-600" /> Infrastructure for Instagram Commerce
            </div>
            <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter mb-10 leading-[0.9]">
              Turn Instagram DMs into a <span className="text-zinc-600">revenue engine.</span>
            </h1>
            <p className="text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              The operating system for high-volume Instagram commerce. Recover abandoned leads, qualify inquiries, and close sales automatically with deterministic AI logic.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-xl px-10 h-14 text-sm font-bold group shadow-2xl">
                  Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </Link>
              <Button 
                onClick={startDemo}
                variant="outline" 
                size="lg" 
                className="border-white/5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl px-10 h-14 text-sm font-bold gap-3 transition-all"
              >
                <Play size={16} fill="currentColor" /> Watch Live Demo
              </Button>
            </div>

            {/* Main Product Showcase */}
            <div className="relative group mx-auto max-w-6xl">
              <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-[2rem] border border-white/10 bg-zinc-950 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                {heroImage && (
                  <Image 
                    src={heroImage.imageUrl} 
                    alt={heroImage.description}
                    width={1200}
                    height={800}
                    data-ai-hint={heroImage.imageHint}
                    className="w-full h-auto"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-white/5 bg-[#050507]">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-12">
            Trusted by modern commerce teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100">
            {['NIKE', 'SHOPIFY', 'ZARA', 'H&M', 'SUPREME'].map((brand) => (
              <span key={brand} className="text-2xl font-black font-headline tracking-tighter text-white">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="platform" className="py-32 bg-black">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8">
                <MessageSquare size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-8">
                Intelligent Inbox.<br/>
                <span className="text-zinc-600">Sub-second data sync.</span>
              </h2>
              <p className="text-lg text-zinc-500 mb-10 leading-relaxed font-medium">
                Our DM infrastructure analyzes customer intent in real-time. Respond to sizing, pricing, and availability queries with AI-assisted precision.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Neural buying intent detection',
                  'Deterministic response logic',
                  'Unified fleet collaboration',
                  'Sentiment analysis pipeline'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-bold text-zinc-300">
                    <CheckCircle2 size={16} className="text-white" /> {feature}
                  </li>
                ))}
              </ul>
              <Link href="/platform/inbox">
                <Button variant="link" className="text-white font-bold p-0 group">
                  Explore Inbox Infrastructure <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-zinc-950">
              {inboxImage && (
                <Image 
                  src={inboxImage.imageUrl} 
                  alt={inboxImage.description}
                  width={800}
                  height={600}
                  data-ai-hint={inboxImage.imageHint}
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
            <div className="order-2 lg:order-1 rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-zinc-950">
              {automationImage && (
                <Image 
                  src={automationImage.imageUrl} 
                  alt={automationImage.description}
                  width={800}
                  height={600}
                  data-ai-hint={automationImage.imageHint}
                  className="w-full h-auto"
                />
              )}
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8">
                <Zap size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-8">
                Visual Automations.<br/>
                <span className="text-zinc-600">Stateful revenue logic.</span>
              </h2>
              <p className="text-lg text-zinc-500 mb-10 leading-relaxed font-medium">
                Build sophisticated sales workflows without code. Trigger automated follow-ups, apply loyalty discounts, and recover abandoned leads with non-repudiable logic.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Response Offset</p>
                  <p className="text-2xl font-bold">0.08s</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Recovery Rate</p>
                  <p className="text-2xl font-bold">31.4%</p>
                </div>
              </div>
              <Link href="/platform/automations">
                <Button variant="link" className="text-white font-bold p-0 group">
                  Explore Sales Logic <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 border-t border-white/5 bg-[#050507]">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight mb-6">
              The Conversion Pipeline
            </h2>
            <p className="text-zinc-500 text-lg font-medium">
              From incoming DM to revenue. A deterministic infrastructure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Ingestion", desc: "Real-time DM ingestion via Meta Webhooks.", icon: Globe },
              { title: "Analysis", desc: "Neural scoring of buying intent.", icon: Search },
              { title: "Execution", desc: "Workflow-driven response logic.", icon: Zap },
              { title: "Conversion", desc: "Checkout link & sales closure.", icon: TrendingUp }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="p-8 rounded-2xl border border-white/5 bg-zinc-950 hover:border-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 mb-6 group-hover:text-white transition-colors">
                    <step.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold mb-3">{step.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                </div>
                {i < 3 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-zinc-800 z-10" size={16} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Infrastructure Section */}
      <section className="py-32 bg-black">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.01] blur-3xl rounded-full" />
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl font-bold font-headline tracking-tight mb-8">Enterprise Infrastructure</h2>
                <p className="text-zinc-500 mb-12 font-medium">Designed for commerce fleets who demand absolute reliability and non-repudiable data control.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white font-bold text-sm">
                      <ShieldCheck size={18} /> Audit Integrity
                    </div>
                    <p className="text-xs text-zinc-600 font-medium">Full historical logs of all operator and AI mutations.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white font-bold text-sm">
                      <Users size={18} /> RBAC Permissions
                    </div>
                    <p className="text-xs text-zinc-600 font-medium">Granular access control for Agents, Managers, and Admins.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white font-bold text-sm">
                      <History size={18} /> System Monitoring
                    </div>
                    <p className="text-xs text-zinc-600 font-medium">Real-time infrastructure health and global status.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white font-bold text-sm">
                      <Database size={18} /> Data Isolation
                    </div>
                    <p className="text-xs text-zinc-600 font-medium">Isolated tenant environments with end-to-end security.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md aspect-square rounded-full border border-white/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.7]" />
                  <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.4]" />
                  <Zap className="text-white opacity-20" size={120} />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-4 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">Global Sync</div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-zinc-950 px-4 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-emerald-500">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 relative">
        <div className="absolute inset-0 bg-white/[0.01]" />
        <div className="container max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-12 max-w-4xl mx-auto leading-[0.9]">
            Turn Instagram conversations into <span className="text-zinc-600">revenue infrastructure.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-xl px-12 h-16 text-base font-bold group shadow-2xl">
                Deploy Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              onClick={startDemo}
              variant="outline" 
              size="lg" 
              className="border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl px-12 h-16 text-base font-bold transition-all"
            >
              Watch Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-[#050507] border-t border-white/5">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-8">
                <Zap className="text-white fill-white" size={18} />
                <span className="font-headline text-lg font-bold tracking-tight uppercase">ReplyRush</span>
              </Link>
              <p className="text-sm text-zinc-600 max-w-xs leading-relaxed font-medium">
                Enterprise infrastructure for high-performance Instagram commerce. Every inquiry is a checkout opportunity.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Platform</h4>
              <ul className="space-y-4 text-xs font-bold text-zinc-600">
                <li><Link href="/platform" className="hover:text-white transition-colors">Platform Overview</Link></li>
                <li><Link href="/platform/inbox" className="hover:text-white transition-colors">Intelligent Inbox</Link></li>
                <li><Link href="/platform/automations" className="hover:text-white transition-colors">Visual Automations</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">System Health</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Support</h4>
              <ul className="space-y-4 text-xs font-bold text-zinc-600">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="/api-reference" className="hover:text-white transition-colors">API Reference</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-xs font-bold text-zinc-600">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/sla" className="hover:text-white transition-colors">SLA</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Connect</h4>
              <ul className="space-y-4 text-xs font-bold text-zinc-600">
                <li><span className="opacity-50 cursor-not-allowed">Twitter</span></li>
                <li><span className="opacity-50 cursor-not-allowed">LinkedIn</span></li>
                <li><span className="opacity-50 cursor-not-allowed">Instagram</span></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5">
            <p className="text-[10px] text-zinc-800 font-black uppercase tracking-widest">© 2025 ReplyRush AI Infrastructure.</p>
            <div className="flex gap-8 text-[10px] font-black text-zinc-800 uppercase tracking-widest">
              <span>Cloud Status: Optimal</span>
              <span>Region: Global</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
