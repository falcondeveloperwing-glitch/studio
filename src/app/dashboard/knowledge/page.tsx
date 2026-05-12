"use client";

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Database, 
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
    "SHIPPING INFORMATION:\n" +
    "- Standard Domestic (US): 3-5 business days via UPS. $12.95 flat rate.\n" +
    "- International: 2-4 business days via DHL. Calculated at checkout.\n" +
    "- Free shipping on orders over $250.\n\n" +
    "PRODUCT PRICING:\n" +
    "- Tech Hoodie: $120.00. Available in Black/Grey.\n" +
    "- Performance Joggers: $85.00.\n" +
    "- Base Layer: $65.00.\n\n" +
    "DISCOUNT POLICY:\n" +
    "- Tier 1 (10-24 units): 15% discount code: BULK15.\n" +
    "- Tier 2 (25+ units): 25% discount code: BULK25.\n\n" +
    "RETURNS:\n" +
    "- 30-day window for unworn items.\n" +
    "- Exchanges are free; returns incur a $10 restocking fee."
  );

  const handleTrain = async () => {
    if (!knowledgeText) return;
    setLoading(true);
    try {
      const result = await trainAIKnowledgeBase({ textInput: knowledgeText });
      if (result.status === 'success') {
        toast({ title: "Updated", description: "Business data synced successfully." });
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to update business data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Knowledge Base</h1>
        <p className="text-zinc-500 font-medium">Upload business details to guide automated responses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="border-white/5 p-8 bg-zinc-950/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                <Database size={20} />
              </div>
              <h2 className="font-bold text-xl">Business Data</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 block">Product & Policy Details</label>
                <Textarea 
                  className="min-h-[300px] bg-zinc-900/50 border-white/10 rounded-xl p-4 text-sm leading-relaxed focus-visible:ring-zinc-700"
                  placeholder="Paste your product list, shipping rules, or FAQs..."
                  value={knowledgeText}
                  onChange={(e) => setKnowledgeText(e.target.value)}
                />
              </div>

              <div className="p-8 rounded-xl border border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-white/10">
                  <FileUp className="text-zinc-500 group-hover:text-white" size={20} />
                </div>
                <p className="text-sm font-bold mb-1">Upload Documents</p>
                <p className="text-xs text-zinc-600">PDF, XLSX, or DOCX (Max 10MB)</p>
              </div>

              <Button 
                onClick={handleTrain} 
                disabled={loading || !knowledgeText}
                className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-bold rounded-lg gap-2"
              >
                {loading ? "Updating..." : "Save Business Data"} <ArrowRight size={16} />
              </Button>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard className="border-white/5 p-6 bg-zinc-950/20">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-emerald-500" size={16} />
                <h3 className="font-bold text-sm">Status</h3>
              </div>
              <ul className="space-y-2 text-xs text-zinc-500 font-medium">
                <li className="flex items-center justify-between">Inventory Mapping <span className="text-emerald-500">Live</span></li>
                <li className="flex items-center justify-between">Shipping Logic <span className="text-emerald-500">Live</span></li>
              </ul>
            </GlassCard>
            <GlassCard className="border-white/5 p-6 bg-zinc-950/20">
              <div className="flex items-center gap-2 mb-4">
                <Info className="text-zinc-500" size={16} />
                <h3 className="font-bold text-sm">Guidance</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-normal">Accurate pricing and shipping data significantly improves the quality of automated responses.</p>
            </GlassCard>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            History
          </div>
          <GlassCard className="border-white/5 p-6 bg-zinc-950">
            <h3 className="font-bold text-lg mb-6">Source Files</h3>
            <div className="space-y-6">
              {[
                { name: 'inventory_list.xlsx', time: '2h ago' },
                { name: 'shipping_rates.pdf', time: '1d ago' },
                { name: 'refund_policy.docx', time: '3d ago' }
              ].map((file, i) => (
                <div key={i} className="flex gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <FileUp size={14} className="text-zinc-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold truncate">{file.name}</p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase">{file.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-red-500">
                    <Trash2 size={14} />
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
