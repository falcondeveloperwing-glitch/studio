import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-body py-24">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-3 mb-12">
          <Zap size={24} className="text-white fill-white" />
          <span className="font-headline text-xl font-bold uppercase">ReplyRush</span>
        </Link>
        
        <h1 className="text-4xl font-bold font-headline mb-8 tracking-tighter">Terms of Service</h1>
        <p className="text-zinc-500 mb-12">Last Updated: August 14, 2025</p>

        <div className="prose prose-invert max-w-none space-y-10 text-zinc-400">
          <section>
            <h2 className="text-white text-xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using ReplyRush AI, you agree to be bound by these Terms of Service. If you are using the service on behalf of a business, you represent that you have the authority to bind that business.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">2. Service Usage</h2>
            <p className="leading-relaxed">
              ReplyRush provides AI-driven conversation automation for Instagram. You are responsible for ensuring that your use of the service complies with Meta's developer policies and community guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">3. Subscription & Billing</h2>
            <p className="leading-relaxed">
              Subscriptions are billed on a monthly basis. You may cancel at any time; however, fees for the current billing cycle are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">4. Limitation of Liability</h2>
            <p className="leading-relaxed">
              ReplyRush AI is an automation tool. While we strive for absolute precision, we are not liable for specific conversational outcomes or business results arising from automated interactions.
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
