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
  BrainCircuit,
  Smile,
  AlertCircle
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

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return <Smile className="text-emerald-500" size={12} />;
      case 'Frustrated': return <AlertCircle className="text-primary" size={12} />;
      default: return <Smile className="text-muted-foreground" size={12} />;
    }
  };

  return (
    <div className="h-full flex flex-col p-8 lg:p-14 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 rounded-full px-4 py-1 text-[9px] font-black tracking-[0.3em] uppercase">
              Omni-Channel Active
            </Badge>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" />
          </div>
          <h1 className="font-headline text-5xl lg:text-7xl font-bold tracking-tighter mb-4">Neural Inbox</h1>
          <p className="text-muted-foreground text-xl lg:text-2xl max-w-xl opacity-50 leading-relaxed font-light">Monitor AI negotiations and real-time customer sentiment.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 lg:flex-none border-white/10 bg-white/5 rounded-[2rem] h-16 px-10 font-black text-[10px] uppercase tracking-[0.2em] gap-3 hover:bg-white/10 transition-all shadow-xl">
            <Filter size={20} /> <span className="hidden sm:inline">Filters</span>
          </Button>
          <Button className="flex-1 lg:flex-none bg-primary hover:bg-primary/90 glow-primary rounded-[2rem] h-16 px-10 font-black text-xs uppercase tracking-widest gap-3 shadow-[0_30px_60px_-10px_rgba(104,20,247,0.4)] transition-all hover:scale-105 active:scale-95 text-white">
            <MessageCircle size={20} /> Broadcast
          </Button>
        </div>
      </div>

      <GlassCard className="flex-1 p-0 flex flex-col lg:flex-row overflow-hidden border-white/[0.06] bg-black/40 min-h-[600px] lg:min-h-[800px] rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]" variant="darker" hoverable={false}>
        <div className={`w-full lg:w-[480px] border-r border-white/5 flex flex-col bg-white/[0.01] transition-all duration-300 ${!showMobileList && 'hidden lg:flex'}`}>
          <div className="p-12 border-b border-white/5 bg-white/[0.01]">
            <div className="relative group">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={20} />
              <Input className="pl-16 h-16 bg-white/[0.04] border-white/10 rounded-[1.75rem] text-lg font-light focus-visible:ring-primary/40 placeholder:text-muted-foreground/30 transition-all" placeholder="Search threads..." />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-3">
              {MOCK_CHATS.map((chat) => (
                <motion.div key={chat.id} onClick={() => handleSelectChat(chat.id)} whileHover={{ x: 8 }} className={`p-8 flex items-center gap-6 cursor-pointer transition-all duration-500 rounded-[2.75rem] relative group ${activeChatId === chat.id ? 'bg-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/10' : 'hover:bg-white/[0.03]'}`}>
                  <div className="w-20 h-20 rounded-full bg-muted border-2 border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative shadow-2xl">
                    <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/150/150`} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {chat.unread && <div className="absolute top-0 right-0 w-5 h-5 rounded-full bg-primary border-[6px] border-[#0a0a0c]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className={`font-bold text-xl truncate tracking-tight ${chat.unread ? 'text-white' : 'text-muted-foreground group-hover:text-white transition-colors'}`}>{chat.customerName}</p>
                      <span className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-widest">2m</span>
                    </div>
                    <p className={`text-base truncate mb-4 font-light ${chat.unread ? 'text-white/80 font-medium' : 'text-muted-foreground/40'}`}>{chat.lastMessage}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-[8px] px-3 py-1 rounded-full border-none font-black tracking-[0.2em] uppercase ${chat.status === 'AI Handled' ? 'bg-primary/15 text-primary' : 'bg-amber-500/15 text-amber-500'}`}>
                        {chat.status}
                      </Badge>
                      <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">
                        {getSentimentIcon(chat.sentiment)} {chat.sentiment}
                      </div>
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
                <div className="p-10 lg:p-14 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-3xl z-20">
                  <div className="flex items-center gap-8">
                    <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-14 w-14 text-muted-foreground">
                      <ArrowLeft size={28} />
                    </Button>
                    <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-muted border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                      <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/150/150`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <p className="font-bold text-2xl lg:text-4xl text-white tracking-tighter">{activeChat.customerName}</p>
                        <ShieldCheck size={24} className="text-primary opacity-50" />
                      </div>
                      <div className="flex flex-wrap items-center gap-6">
                        <span className="flex items-center gap-2 text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em]">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Neural Analysis
                        </span>
                        <span className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                          <BrainCircuit size={14} /> {activeChat.intent}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Button variant="outline" className="hidden xl:flex border-white/10 bg-white/5 rounded-2xl h-16 px-10 font-black text-[10px] uppercase tracking-widest gap-3 shadow-2xl hover:bg-white/10 transition-all">
                      <ExternalLink size={20} /> CRM
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-[1.5rem] h-16 w-16 hover:bg-white/5 transition-colors">
                      <MoreVertical size={28} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-12 lg:p-20">
                  <div className="max-w-5xl mx-auto space-y-14 lg:space-y-20 pb-20">
                    <div className="text-center py-10 opacity-30">
                      <p className="text-[10px] font-black uppercase tracking-[0.8em]">End-to-End Neural Encryption</p>
                    </div>
                    {activeChat.messages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`flex ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] lg:max-w-[75%] relative group ${msg.role === 'customer' ? 'order-1' : 'order-2'}`}>
                          <div className={`rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-12 text-lg lg:text-xl leading-relaxed relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border transition-all duration-700 hover:border-white/20 ${
                            msg.role === 'customer' 
                              ? 'bg-white/[0.04] text-white border-white/5 rounded-tl-none font-light' 
                              : 'bg-primary text-white rounded-tr-none border-primary/20 glow-primary font-medium'
                          }`}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-5 -right-5 w-14 h-14 rounded-full bg-[#0a0a0c] border-2 border-primary/50 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(104,20,247,0.6)]">
                                <Zap size={22} fill="currentColor" />
                              </motion.div>
                            )}
                          </div>
                          <div className={`flex items-center gap-5 mt-6 ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                            <p className="text-[10px] text-muted-foreground/30 font-black tracking-[0.3em] uppercase">
                              {msg.role === 'customer' ? 'Customer' : 'Neural Agent v5.2'} • 12:42
                            </p>
                            {msg.role === 'ai' && <Badge className="bg-white/5 text-white/30 border-none text-[9px] font-black px-3 tracking-widest uppercase rounded-full">Secure</Badge>}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div className="text-center pt-10">
                      <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl">
                        <TrendingUp size={14} /> Intent Shift Detected: Readiness High
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="px-12 lg:px-24 pb-12 lg:pb-20 pt-6 bg-gradient-to-t from-background to-transparent relative z-30">
                  <div className="max-w-5xl mx-auto space-y-8">
                    <div className="hidden sm:flex flex-wrap gap-4">
                      {["Send pricing catalog", "Check stock for XL", "Offer recovery discount"].map((hint, i) => (
                        <motion.button key={i} whileHover={{ y: -4, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-[1.75rem] bg-white/[0.04] border border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-white hover:border-primary/50 transition-all flex items-center gap-4 group shadow-2xl">
                          <Sparkles size={14} className="text-primary group-hover:animate-spin-slow" /> {hint}
                        </motion.button>
                      ))}
                    </div>

                    <GlassCard variant="darker" className="p-4 border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-[3rem] lg:rounded-[4rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all" hoverable={false}>
                      <form className="relative flex items-center gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="p-5 text-muted-foreground hover:text-primary cursor-pointer transition-all group hidden sm:block">
                          <Zap size={28} className="group-hover:scale-125 group-hover:rotate-12 transition-all" />
                        </div>
                        <Input 
                          className="flex-1 h-16 lg:h-24 bg-transparent border-none text-xl lg:text-2xl placeholder:text-muted-foreground/20 focus-visible:ring-0 px-6 font-light" 
                          placeholder="Command Neural Agent..." 
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 glow-primary rounded-[2rem] lg:rounded-[2.5rem] w-16 h-16 lg:w-24 lg:h-24 shrink-0 transition-all shadow-[0_30px_60px_-10px_rgba(104,20,247,0.5)] hover:scale-105 active:scale-95 text-white">
                          <Send size={30} className="lg:size-40" />
                        </Button>
                      </form>
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-24 text-center animate-in fade-in duration-1000">
                <div className="w-48 h-48 rounded-full bg-white/[0.02] border-2 border-white/[0.05] flex items-center justify-center mb-12 shadow-[0_0_120px_rgba(0,0,0,0.6)]">
                  <BrainCircuit size={80} className="opacity-10 animate-pulse" />
                </div>
                <h2 className="font-headline text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tighter">System Idle.</h2>
                <p className="max-w-xl text-xl lg:text-2xl leading-relaxed opacity-40 font-light">Select a neural thread from the sidebar to begin monitoring negotiation logs and customer intent shifts.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
}