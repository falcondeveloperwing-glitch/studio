'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Zap } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for small boutiques starting with AI automation.',
    features: [
      'Basic AI auto replies',
      'Inbox management',
      '500 conversations / mo',
      'Basic analytics dashboard',
      'Email support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$99',
    description: 'High-performance tools for growing commerce brands.',
    features: [
      'Everything in Starter',
      'AI knowledge base training',
      'Advanced sales automations',
      'WhatsApp redirect logic',
      'Lead capture system',
      'Priority performance analytics',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Agency',
    price: '$299',
    description: 'Manage multiple businesses with enterprise-grade logic.',
    features: [
      'Everything in Growth',
      'Multi-business dashboard',
      'White-label access',
      'Team member management',
      'Custom automation builder',
      'Unlimited conversations',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 font-body">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20 shadow-2xl">
              <Zap className="text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" size={20} />
            </div>
            <span className="font-headline text-xl font-bold tracking-tight text-white uppercase">
              Reply<span className="text-zinc-500">Rush</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/pricing" className="text-white">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-lg h-10 px-6 text-xs font-bold">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-6">
            Simple pricing.<br />Built for businesses that sell.
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Start free. Upgrade when you start getting results. No hidden fees or complex contracts.
          </p>
        </motion.div>
      </section>

      {/* Pricing Grid */}
      <section className="container mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col p-8 rounded-2xl border ${
                tier.popular 
                  ? 'border-white bg-zinc-900/50 shadow-2xl' 
                  : 'border-zinc-800 bg-zinc-900/20'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check size={16} className="text-zinc-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/signup">
                <Button 
                  className={`w-full h-12 rounded-xl font-bold transition-all ${
                    tier.popular 
                      ? 'bg-white text-black hover:bg-zinc-200' 
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  {tier.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ / Trust Footer */}
      <section className="border-t border-zinc-800 bg-zinc-900/10 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold font-headline mb-4">Enterprise needs?</h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            Contact us for custom volume pricing, dedicated account managers, and custom AI model training.
          </p>
          <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white rounded-xl px-8 h-12 font-medium">
            Contact Sales
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-zinc-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Zap size={16} className="text-zinc-400" />
            <span className="font-bold tracking-tight text-zinc-300">ReplyRush AI</span>
          </div>
          <div className="flex gap-10 text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
            <Link href="#" className="hover:text-white">API</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
          </div>
          <p className="text-[11px] text-zinc-700">© 2025 ReplyRush AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
