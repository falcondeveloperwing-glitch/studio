import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2, MessageSquare, Zap, BarChart3, ArrowRight, ShieldCheck, Instagram } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-dashboard');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight">ReplyRush<span className="text-primary">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#testimonials" className="hover:text-white transition-colors">Success Stories</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-white">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 glow-primary">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-bounce">
          <Instagram size={14} /> NOW SUPPORTING INSTAGRAM DM AUTOMATION
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold mb-8 max-w-4xl mx-auto leading-tight text-gradient">
          AI Sales Employee for Instagram Businesses
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body">
          Automatically reply to customers, recover lost leads, and close sales 24/7.
          The most intelligent DM assistant ever built.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/signup">
            <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 glow-primary rounded-xl">
              Start Your 7-Day Free Trial
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold border-white/10 glass rounded-xl">
            Book a Demo
          </Button>
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-3xl -z-10" />
          <GlassCard className="p-2 border-white/5 overflow-hidden">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <Image 
                src={heroImg?.imageUrl || ''} 
                alt={heroImg?.description || 'Dashboard'} 
                width={1200} 
                height={800}
                className="w-full h-auto"
                data-ai-hint="SaaS dashboard"
              />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-bold font-headline mb-2 text-primary">50k+</div>
            <div className="text-sm text-muted-foreground">Active DMs Daily</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-headline mb-2 text-primary">85%</div>
            <div className="text-sm text-muted-foreground">Lead Recovery Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-headline mb-2 text-primary">1.2s</div>
            <div className="text-sm text-muted-foreground">Avg. Response Time</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-headline mb-2 text-primary">$4M+</div>
            <div className="text-sm text-muted-foreground">Revenue Recovered</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">Built for High-Growth Brands</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Scaling manually is impossible. ReplyRush AI acts as your dedicated sales representative, 24 hours a day.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard className="group">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <MessageSquare className="text-primary group-hover:text-white" size={24} />
            </div>
            <h3 className="font-headline text-xl font-bold mb-4">AI Conversations</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Context-aware responses that sound human. Our AI understands product details, shipping policies, and pricing instantly.</p>
          </GlassCard>
          <GlassCard className="group">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
              <Zap className="text-accent group-hover:text-background" size={24} />
            </div>
            <h3 className="font-headline text-xl font-bold mb-4">Smart Automations</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Visual workflow builder to trigger actions based on keywords. "Price?" sends a link. "Address?" sends locations. Effortlessly.</p>
          </GlassCard>
          <GlassCard className="group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
              <BarChart3 className="text-emerald-500 group-hover:text-white" size={24} />
            </div>
            <h3 className="font-headline text-xl font-bold mb-4">Revenue Analytics</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Track exactly how much money the AI is making for your business. Monitor conversation volume and customer satisfaction in real-time.</p>
          </GlassCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-32">
        <GlassCard className="bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border-primary/20 p-12 text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 max-w-3xl mx-auto leading-tight">Ready to stop losing sales in DMs?</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">Join 500+ premium brands using ReplyRush AI to automate their Instagram sales pipeline.</p>
          <Link href="/signup">
            <Button size="lg" className="h-16 px-10 text-xl font-bold bg-primary hover:bg-primary/90 glow-primary rounded-2xl">
              Get Started Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1"><ShieldCheck size={16} className="text-primary" /> No credit card required</div>
            <div className="flex items-center gap-1"><CheckCircle2 size={16} className="text-primary" /> Setup in 5 minutes</div>
          </div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/5 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="text-primary" size={20} />
          <span className="font-headline font-bold text-white">ReplyRush AI</span>
        </div>
        <p>© 2025 ReplyRush AI. All rights reserved. Crafted for the future of commerce.</p>
      </footer>
    </div>
  );
}