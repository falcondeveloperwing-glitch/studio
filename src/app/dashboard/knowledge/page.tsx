"use client";

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  BrainCircuit, 
  CheckCircle2, 
  Trash2,
  FileUp,
  ArrowRight,
  Info
} from 'lucide-react';
import { trainAIKnowledgeBase } from '@/ai/flows/ai-knowledge-base-training-flow';
import { useToast } from '@/hooks/use-toast';

export default function KnowledgePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [knowledgeText, setKnowledgeText] = useState(
    "Standard Shipping: 3-5 business days via DHL. Rates: $15 Domestic, $45 International.\n\n" +
    "Returns: 30-day window for unworn items with tags. Refunds processed in 48 hours.\n\n" +
    "Pricing: Stealth Hoodie ($120), Tech Joggers ($85), Compression Shirt ($65).\n\n" +
    "Bulk Orders: 15% discount for 10+ items. Contact operations for custom SKU runs."
  );

  const handleTrain = async () => {
    if (!knowledgeText) return;
    setLoading(true);
    try {
      const result = await trainAIKnowledgeBase({ textInput: knowledgeText });
      if (result.status === 'success') {
        toast({ title: "Intelligence Synced", description: "AI neural pathways updated with new business logic." });
      }
    } catch (e) {
      toast({ title: "Error", description: "Neural sync failed. Please check network connectivity.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Knowledge Base</h1>
        <p className="text-zinc-500 text-sm">Upload business specifics to ensure high-accuracy automated sales negotiations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="border-zinc-800/50 bg-zinc-900/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <BrainCircuit size={20} />
              </div>
              <h2 className="font-bold text-lg">Neural Training Dataset</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 block">Contextual Business Data</label>
                <Textarea 
                  className="min-h-[300px] bg-zinc-950/50 border-zinc-800 rounded-xl p-5 text-sm leading-relaxed focus-visible:ring-zinc-700"
                  placeholder="Paste product lists, shipping rules, or return policies..."
                  value={knowledgeText}
                  onChange={(e) => setKnowledgeText(e.target.value)}
                />
              </div>

              <div className="p-10 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/30 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-zinc-700 transition-all">
                <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl border border-zinc-800">
                  <FileUp className="text-zinc-500 group-hover:text-white" size={24} />
                </div>
                <p className="text-sm font-bold mb-1">Upload Source Documents</p>
                <p className="text-xs text-zinc-500">PDF, XLSX, or DOCX (Max 10MB per file)</p>
              </div>

              <Button 
                onClick={handleTrain} 
                disabled={loading || !knowledgeText}
                className="w-full h-14 bg-white text-black hover:bg-zinc-200 font-bold rounded-xl gap-2 shadow-2xl transition-all active:scale-[0.98]"
              >
                {loading ? "Optimizing Neural Paths..." : "Sync Intelligence"} <ArrowRight size={18} />
              </Button>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="border-emerald-950/50 bg-emerald-500/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="text-emerald-500" size={18} />
                <h3 className="font-bold text-sm">Deployment Status</h3>
              </div>
              <ul className="space-y-3">
                <li className="text-xs text-zinc-400 flex items-center justify-between">
                  Inventory Mapping <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold">LIVE</span>
                </li>
                <li className="text-xs text-zinc-400 flex items-center justify-between">
                  Shipping Logic v2 <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold">LIVE</span>
                </li>
              </ul>
            </GlassCard>
            <GlassCard className="border-zinc-800 bg-zinc-900/10">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-zinc-500" size={18} />
                <h3 className="font-bold text-sm">System Guidance</h3>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">Specificity drives conversion. Use SKU codes and exact regional shipping times for 24% better AI performance.</p>
            </GlassCard>
          </div>
        </div>

        <div className="space-y-6">
          <GlassCard className="h-fit border-zinc-800/50 bg-zinc-900/20">
            <h3 className="font-bold text-lg mb-8 tracking-tight">Version History</h3>
            <div className="space-y-6">
              {[
                { name: 'q4_inventory_sheet.xlsx', time: '2h ago', size: '4.2 MB' },
                { name: 'shipping_policy_intl.pdf', time: '1d ago', size: '1.8 MB' },
                { name: 'refund_logic_v3.docx', time: '3d ago', size: '0.9 MB' }
              ].map((file, i) => (
                <div key={i} className="flex gap-4 pb-6 border-b border-zinc-800 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 shadow-lg">
                    <FileUp size={16} className="text-zinc-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{file.name}</p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{file.time} • {file.size}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto h-10 w-10 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl">
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
