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
          <span className="font-headline text-2xl font-bold tracking-tight text-white">ReplyRush<span className="text-primary">AI</span></span>
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
            <Button className="bg-primary hover:bg-primary/90 glow-primary rounded-xl font-bold">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest mb-8 animate-bounce">
          <Instagram size={14} /> NOW SUPPORTING INSTAGRAM DM AUTOMATION
        </div>
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold mb-8 max-w-5xl mx-auto leading-[0.9] tracking-tighter text-gradient py-2">
          Autonomous Sales for Instagram
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body leading-relaxed">
          ReplyRush AI turns your DMs into a high-performance sales machine. 
          Respond instantly, recover leads, and close deals while you sleep.
        </p>
        <div className="flex flex-col sm:row items-center justify-center gap-4 mb-24">
          <Link href="/signup">
            <Button size="lg" className="h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 glow-primary rounded-2xl group transition-all duration-500 hover:scale-[1.02]">
              Start 7-Day Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold border-white/5 glass rounded-2xl hover:bg-white/5">
            Book a Demo
          </Button>
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-[3rem] -z-10 animate-pulse" />
          <GlassCard className="p-2 border-white/5 overflow-hidden rounded-[2.5rem] shadow-[0_0_100px_rgba(104,20,247,0.1)]">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative aspect-[1200/800] bg-black/40">
              {heroImg ? (
                <Image 
                  src={heroImg.imageUrl} 
                  alt={heroImg.description} 
                  width={1200} 
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                  data-ai-hint="SaaS dashboard"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-black tracking-widest uppercase text-xs">
                  Loading Experience...
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-32 border-y border-white/5 relative bg-white/[0.01]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 text-center">
          {[
            { value: '50k+', label: 'Daily DMs' },
            { value: '85%', label: 'Recovery Rate' },
            { value: '1.2s', label: 'Response Time' },
            { value: '$4M+', label: 'Rev. Recovered' }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl lg:text-6xl font-black font-headline tracking-tighter text-white">{stat.value}</div>
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-40">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1 font-black text-[10px] uppercase tracking-widest">Performance Engines</Badge>
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-tight">Built for hyper-growth brands</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">Scale your business without scaling your headcount. Our AI acts as a 24/7 elite sales representative for your Instagram DM channel.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {[
            { 
              title: 'Neural Conversations', 
              icon: MessageSquare, 
              color: 'primary',
              desc: 'Context-aware responses that sound indistinguishable from your top sales rep. Trained on your specific brand voice and policies.'
            },
            { 
              title: 'Visual Logic Builder', 
              icon: Zap, 
              color: 'accent',
              desc: 'Intelligent triggers and multi-step workflows. Automatically qualify leads, fetch order status, or send checkout links instantly.'
            },
            { 
              title: 'Funnel Intelligence', 
              icon: BarChart3, 
              color: 'emerald-500',
              desc: 'Deep analytics on every conversation. Track revenue attribution, customer sentiment, and agent efficiency in real-time.'
            }
          ].map((feature, i) => (
            <GlassCard key={i} className="group p-10 border-white/[0.03] hover:border-white/10 transition-all duration-700">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-700 group-hover:scale-110 shadow-lg ${feature.color === 'primary' ? 'bg-primary/20 text-primary shadow-primary/20' : feature.color === 'accent' ? 'bg-accent/20 text-accent shadow-accent/20' : 'bg-emerald-500/20 text-emerald-500 shadow-emerald-500/20'}`}>
                <feature.icon size={28} />
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4 tracking-tight text-white">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-40">
        <GlassCard className="bg-gradient-to-br from-primary/30 via-primary/5 to-transparent border-primary/20 p-16 md:p-24 text-center overflow-hidden relative rounded-[3rem] shadow-[0_0_150px_rgba(104,20,247,0.2)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-[150px] rounded-full animate-pulse" />
          
          <h2 className="font-headline text-5xl md:text-7xl font-bold mb-10 max-w-4xl mx-auto leading-[0.9] tracking-tighter text-gradient py-2">Stop losing sales in your DMs.</h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed">Join 500+ premium brands scaling their revenue with our autonomous sales engine.</p>
          
          <Link href="/signup">
            <Button size="lg" className="h-20 px-12 text-2xl font-black bg-primary hover:bg-primary/90 glow-primary rounded-[1.5rem] transition-all duration-500 hover:scale-[1.05]">
              Get Started Now <ArrowRight className="ml-3" size={24} />
            </Button>
          </Link>
          
          <div className="mt-12 flex flex-col sm:row items-center justify-center gap-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-primary" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-primary" /> Setup in 5 minutes</div>
          </div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-20 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <span className="font-headline font-bold text-2xl text-white tracking-tight">ReplyRush AI</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-12">
          <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          <Link href="#" className="hover:text-primary transition-colors">Security</Link>
          <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
        </div>
        <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.4em]">© 2025 ReplyRush AI. Crafted for the future of commerce.</p>
      </footer>
    </div>
  );
}

function Badge({ children, variant, className }: { children: React.ReactNode, variant?: any, className?: string }) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
}
