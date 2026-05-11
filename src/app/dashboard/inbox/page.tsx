'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Sparkles, 
  Zap,
  MessageCircle,
  ExternalLink,
  Filter,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MOCK_CHATS } from '@/lib/mock-data';

export default function InboxPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);

  const activeChat = MOCK_CHATS.find(c => c.id === activeChatId);

  useEffect(() => {
    if (window.innerWidth > 1024 && !activeChatId) {
      setActiveChatId(MOCK_CHATS[0].id);
    }
  }, [activeChatId]);

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setShowMobileList(false);
  };

  return (
    <div className="h-full flex flex-col p-8 lg:p-14 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 rounded-full px-4 py-1 text-[9px] font-black tracking-[0.3em] uppercase">
              Omni-Channel Active
            </Badge>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
          </div>
          <h1 className="font-headline text-4xl lg:text-6xl font-bold tracking-tight mb-4">Neural Inbox</h1>
          <p className="text-muted-foreground text-lg lg:text-2xl max-w-xl opacity-70 leading-relaxed">Oversee live AI negotiations and monitor lead sentiment in real-time.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 lg:flex-none border-white/10 bg-white/5 rounded-[1.5rem] h-16 px-10 font-black text-[10px] uppercase tracking-[0.2em] gap-3 hover:bg-white/10 transition-all">
            <Filter size={20} /> <span className="hidden sm:inline">Advanced Filters</span>
          </Button>
          <Button className="flex-1 lg:flex-none bg-primary hover:bg-primary/90 glow-primary rounded-[1.5rem] h-16 px-10 font-black text-sm tracking-tight gap-3 shadow-2xl transition-all hover:scale-105 active:scale-95">
            <MessageCircle size={20} /> Broadcast DM
          </Button>
        </div>
      </div>

      <GlassCard className="flex-1 p-0 flex flex-col lg:flex-row overflow-hidden border-white/[0.06] bg-black/40 min-h-[600px] lg:min-h-[800px] rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]" variant="darker" hoverable={false}>
        <div className={`w-full lg:w-[450px] border-r border-white/5 flex flex-col bg-white/[0.01] transition-all duration-300 ${!showMobileList && 'hidden lg:flex'}`}>
          <div className="p-10 border-b border-white/5 bg-white/[0.01]">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
              <Input className="pl-16 h-16 bg-white/[0.04] border-white/10 rounded-[1.5rem] text-base font-medium focus-visible:ring-primary/40 placeholder:text-muted-foreground/40 transition-all" placeholder="Search threads or customers..." />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-5 space-y-3">
              {MOCK_CHATS.map((chat) => (
                <motion.div key={chat.id} onClick={() => handleSelectChat(chat.id)} whileHover={{ x: 8 }} className={`p-6 flex items-center gap-6 cursor-pointer transition-all duration-500 rounded-[2.25rem] relative group ${activeChatId === chat.id ? 'bg-white/[0.08] shadow-[0_15px_30px_rgba(0,0,0,0.3)] ring-1 ring-white/10' : 'hover:bg-white/[0.03]'}`}>
                  <div className="w-16 h-16 rounded-full bg-muted border-2 border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative shadow-2xl">
                    <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/150/150`} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-ai-hint="customer avatar" />
                    {chat.unread && <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary border-4 border-[#0a0a0c]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className={`font-bold text-lg truncate ${chat.unread ? 'text-white' : 'text-muted-foreground group-hover:text-white transition-colors'}`}>{chat.customerName}</p>
                      <span className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest whitespace-nowrap">2m ago</span>
                    </div>
                    <p className={`text-sm truncate mb-3 ${chat.unread ? 'text-white/80 font-medium' : 'text-muted-foreground/60'}`}>{chat.lastMessage}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-[8px] px-3 py-1 rounded-full border-none font-black tracking-[0.2em] uppercase ${chat.status === 'AI Handled' ? 'bg-primary/15 text-primary' : 'bg-amber-500/15 text-amber-500'}`}>
                        {chat.status}
                      </Badge>
                      {chat.id === '1' && <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1">Priority Lead</Badge>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className={`flex-1 flex flex-col relative bg-black/30 backdrop-blur-md ${showMobileList && 'hidden lg:flex'}`}>
          <AnimatePresence mode="wait">
            {activeChat ? (
              <motion.div key={activeChat.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="flex-1 flex flex-col h-full">
                <div className="p-8 lg:p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-3xl z-20">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-12 w-12 text-muted-foreground">
                      <ArrowLeft size={24} />
                    </Button>
                    <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-muted border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-3xl">
                      <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/150/150`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-bold text-xl lg:text-3xl text-white tracking-tight">{activeChat.customerName}</p>
                        <ShieldCheck size={20} className="text-primary opacity-50" />
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em]">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Analysis
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                          <BrainCircuit size={12} /> High Intent
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="hidden md:flex border-white/10 bg-white/5 rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest gap-3 shadow-xl hover:bg-white/10 transition-all">
                      <ExternalLink size={18} /> Open CRM
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-2xl h-14 w-14 hover:bg-white/5 transition-colors">
                      <MoreVertical size={24} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-10 lg:p-16">
                  <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16 pb-20">
                    <div className="text-center py-10 opacity-30">
                      <p className="text-[10px] font-black uppercase tracking-[0.8em]">End-to-End Encryption Active</p>
                    </div>
                    {activeChat.messages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`flex ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] lg:max-w-[70%] relative group ${msg.role === 'customer' ? 'order-1' : 'order-2'}`}>
                          <div className={`rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-10 text-base lg:text-lg leading-relaxed relative shadow-3xl border transition-all duration-500 hover:border-white/20 ${
                            msg.role === 'customer' 
                              ? 'bg-white/[0.04] text-white border-white/5 rounded-tl-none' 
                              : 'bg-primary text-white rounded-tr-none border-primary/20 glow-primary font-medium'
                          }`}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#0a0a0c] border-2 border-primary/50 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(104,20,247,0.5)]">
                                <Zap size={18} fill="currentColor" />
                              </motion.div>
                            )}
                          </div>
                          <div className={`flex items-center gap-4 mt-4 ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                            <p className="text-[9px] text-muted-foreground font-black tracking-[0.3em] uppercase opacity-50">
                              {msg.role === 'customer' ? 'Customer' : 'Neural Agent v4'} • 12:42 PM
                            </p>
                            {msg.role === 'ai' && <Badge variant="secondary" className="bg-white/5 text-white/40 border-none text-[8px] font-black px-2 tracking-[0.2em] uppercase">Verified AI</Badge>}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div className="text-center pt-8">
                      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        <TrendingUp size={12} /> Intent Shift: Customer is ready to purchase
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="px-10 lg:px-20 pb-10 lg:pb-16 pt-5 bg-gradient-to-t from-background to-transparent relative z-30">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="hidden sm:flex flex-wrap gap-3">
                      {["Send pricing catalog", "Check stock for XL", "Offer recovery discount"].map((hint, i) => (
                        <motion.button key={i} whileHover={{ y: -4, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 hover:text-white hover:border-primary/50 transition-all flex items-center gap-3 group shadow-xl">
                          <Sparkles size={12} className="text-primary group-hover:animate-spin-slow" /> {hint}
                        </motion.button>
                      ))}
                    </div>

                    <GlassCard variant="darker" className="p-3 border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-[2.5rem] lg:rounded-[3.5rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all" hoverable={false}>
                      <form className="relative flex items-center gap-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="p-4 lg:p-5 text-muted-foreground hover:text-primary cursor-pointer transition-all group hidden sm:block">
                          <Zap size={24} className="group-hover:scale-125 group-hover:rotate-12 transition-all" />
                        </div>
                        <Input 
                          className="flex-1 h-14 lg:h-20 bg-transparent border-none text-lg lg:text-xl placeholder:text-muted-foreground/30 focus-visible:ring-0 px-4 font-medium" 
                          placeholder="Command AI or type a reply..." 
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 glow-primary rounded-[1.5rem] lg:rounded-[2rem] w-14 h-14 lg:w-20 lg:h-20 shrink-0 transition-all shadow-2xl hover:scale-105 active:scale-95">
                          <Send size={24} className="lg:size-32" />
                        </Button>
                      </form>
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-20 text-center animate-in fade-in duration-1000">
                <div className="w-40 h-40 rounded-full bg-white/[0.02] border-2 border-white/[0.05] flex items-center justify-center mb-10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                  <BrainCircuit size={60} className="opacity-20 animate-pulse" />
                </div>
                <h2 className="font-headline text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">System Ready.</h2>
                <p className="max-w-lg text-lg lg:text-xl leading-relaxed opacity-50">Select a neural thread from the sidebar to start monitoring customer intent and AI negotiation logs.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
}