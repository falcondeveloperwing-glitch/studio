import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-body py-24">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-3 mb-12">
          <Zap size={24} className="text-white fill-white" />
          <span className="font-headline text-xl font-bold uppercase">ReplyRush</span>
        </Link>
        
        <h1 className="text-4xl font-bold font-headline mb-8 tracking-tighter">Privacy Policy</h1>
        <p className="text-zinc-500 mb-12">Last Updated: August 14, 2025</p>

        <div className="prose prose-invert max-w-none space-y-10 text-zinc-400">
          <section>
            <h2 className="text-white text-xl font-bold mb-4">1. Data Collection</h2>
            <p className="leading-relaxed">
              ReplyRush AI collects business data essential for providing automated messaging services. This includes Instagram DM content, customer names, and interaction history. We do not sell your business intelligence to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">2. AI Infrastructure Usage</h2>
            <p className="leading-relaxed">
              Conversation data is processed through our secure AI nodes to generate response logic. Data is encrypted at rest and in transit. Your specific business knowledge base remains isolated and private to your workspace.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">3. Third-Party Integrations</h2>
            <p className="leading-relaxed">
              Our platform integrates with Meta APIs (Instagram) and Google Cloud for infrastructure. Each integration is governed by their respective privacy standards in addition to our own rigorous protocols.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">4. Security Standards</h2>
            <p className="leading-relaxed">
              We maintain enterprise-grade security protocols including 2FA, regular audits, and zero-trust access for our internal engineering team.
            </p>
          </section>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5">
          <Link href="/" className="text-sm font-bold text-zinc-500 hover:text-white underline underline-offset-4">Return Home</Link>
        </div>
      </div>
    </div>
  );
}
