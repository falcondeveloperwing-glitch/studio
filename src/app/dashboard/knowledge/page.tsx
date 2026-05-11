"use client";

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  FileUp, 
  BrainCircuit, 
  CheckCircle2, 
  HelpCircle, 
  Trash2,
  Plus,
  ArrowRight,
  Info
} from 'lucide-react';
import { trainAIKnowledgeBase } from '@/ai/flows/ai-knowledge-base-training-flow';
import { useToast } from '@/hooks/use-toast';

export default function KnowledgePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [knowledgeText, setKnowledgeText] = useState("");

  const handleTrain = async () => {
    if (!knowledgeText) return;
    setLoading(true);
    try {
      const result = await trainAIKnowledgeBase({ textInput: knowledgeText });
      if (result.status === 'success') {
        toast({ title: "Knowledge Ingested", description: "Your AI is now smarter and ready to assist." });
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to train the AI.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="font-headline text-3xl font-bold mb-2">AI Knowledge Base</h1>
        <p className="text-muted-foreground">Train your AI with your business specifics to provide accurate, context-aware answers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/20">
                <BrainCircuit className="text-primary" size={20} />
              </div>
              <h2 className="font-headline font-bold text-xl">Store Intelligence</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Quick FAQs & Business Info</label>
                <Textarea 
                  className="min-h-[250px] bg-white/5 border-white/10 rounded-xl p-4 text-sm leading-relaxed focus-visible:ring-primary"
                  placeholder="Example: We ship worldwide. Delivery takes 3-5 days. Returns are accepted within 30 days. Our store is located in NYC..."
                  value={knowledgeText}
                  onChange={(e) => setKnowledgeText(e.target.value)}
                />
              </div>

              <div className="p-6 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileUp className="text-muted-foreground group-hover:text-primary" size={24} />
                </div>
                <p className="text-sm font-bold mb-1">Upload Business Documents</p>
                <p className="text-xs text-muted-foreground">Drag and drop PDFs, CSVs or Docs here (Max 10MB)</p>
              </div>

              <Button 
                onClick={handleTrain} 
                disabled={loading || !knowledgeText}
                className="w-full h-12 bg-primary hover:bg-primary/90 glow-primary font-bold rounded-xl gap-2"
              >
                {loading ? "Training AI..." : "Sync Knowledge Base"} <ArrowRight size={18} />
              </Button>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="border-emerald-500/20 bg-emerald-500/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="text-emerald-500" size={18} />
                <h3 className="font-bold text-sm">Active Knowledge</h3>
              </div>
              <ul className="space-y-3">
                <li className="text-xs text-muted-foreground flex items-center justify-between">
                  Pricing & Inventory <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">Synced</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-center justify-between">
                  Shipping Policy <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">Synced</span>
                </li>
              </ul>
            </GlassCard>
            <GlassCard className="border-primary/20 bg-primary/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-primary" size={18} />
                <h3 className="font-bold text-sm">AI Tip</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">The more specific your data, the better the AI performs. Try adding exact product names and SKU codes.</p>
            </GlassCard>
          </div>
        </div>

        <div className="space-y-6">
          <GlassCard className="h-fit">
            <h3 className="font-headline font-bold mb-4">Training History</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <FileUp size={14} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">price_list_v2.pdf</p>
                    <p className="text-[10px] text-muted-foreground">Processed 2 days ago · 4.2 MB</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 text-xs border-white/10 hover:bg-white/5">View Full History</Button>
          </GlassCard>

          <GlassCard className="bg-gradient-glow text-white border-none p-6">
            <HelpCircle className="mb-4 opacity-50" size={32} />
            <h3 className="font-headline font-bold text-lg mb-2">Need help training?</h3>
            <p className="text-xs opacity-80 mb-6 leading-relaxed">Our experts can help you structure your knowledge base for maximum sales performance.</p>
            <Button variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-white/90 font-bold">Contact Support</Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}