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
  AlertCircle,
  Clock,
  ArrowUpRight
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
      case 'Positive': return <Smile className="text-emerald-500" size={14} />;
      case 'Frustrated': return <AlertCircle className="text-primary" size={14} />;
      default: return <Smile className="text-muted-foreground" size={14} />;
    }
  };

  return (
    <div className="h-full flex flex-col p-8 lg:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 rounded-full px-5 py-1.5 text-[10px] font-black tracking-[0.4em] uppercase">
              Operational Fleet
            </Badge>
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Stream
            </div>
          </div>
          <h1 className="font-headline text-6xl lg:text-8xl font-bold tracking-tighter text-white">Neural Inbox</h1>
          <p className="text-muted-foreground text-2xl lg:text-3xl max-w-xl opacity-40 leading-relaxed font-light italic">Intercept AI negotiations and override neural triggers in real-time.</p>
        </div>
        <div className="flex gap-6">
          <Button variant="outline" className="flex-1 lg:flex-none border-white/5 bg-white/5 rounded-[2.5rem] h-20 px-12 font-black text-[11px] uppercase tracking-[0.3em] gap-4 hover:bg-white/10 transition-all shadow-2xl">
            <Filter size={24} /> <span className="hidden sm:inline">Context Filters</span>
          </Button>
          <Button className="flex-1 lg:flex-none bg-primary hover:bg-primary/90 glow-primary rounded-[2.5rem] h-20 px-12 font-black text-[11px] uppercase tracking-widest gap-4 shadow-3xl transition-all hover:scale-105 active:scale-95 text-white">
            <MessageCircle size={24} /> Neural Broadcast
          </Button>
        </div>
      </div>

      <GlassCard className="flex-1 p-0 flex flex-col lg:flex-row overflow-hidden border-white/[0.06] bg-black/40 min-h-[700px] lg:min-h-[900px] rounded-[4rem] shadow-4xl" variant="darker" hoverable={false}>
        <div className={`w-full lg:w-[550px] border-r border-white/5 flex flex-col bg-white/[0.01] transition-all duration-300 ${!showMobileList && 'hidden lg:flex'}`}>
          <div className="p-12 border-b border-white/5 bg-white/[0.01]">
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={24} />
              <Input className="pl-18 h-20 bg-white/[0.04] border-white/10 rounded-[2.25rem] text-xl font-light focus-visible:ring-primary/40 placeholder:text-muted-foreground/20 transition-all" placeholder="Search neural logs..." />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-8 space-y-4">
              {MOCK_CHATS.map((chat) => (
                <motion.div key={chat.id} onClick={() => handleSelectChat(chat.id)} whileHover={{ x: 10 }} className={`p-10 flex items-center gap-8 cursor-pointer transition-all duration-500 rounded-[3.5rem] relative group ${activeChatId === chat.id ? 'bg-white/[0.08] shadow-3xl ring-1 ring-white/10' : 'hover:bg-white/[0.03]'}`}>
                  <div className="w-24 h-24 rounded-full bg-muted border-4 border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative shadow-3xl">
                    <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/200/200`} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    {chat.unread && <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-primary border-[8px] border-[#0a0a0c]" />}
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className={`font-bold text-2xl truncate tracking-tight ${chat.unread ? 'text-white' : 'text-muted-foreground group-hover:text-white transition-colors'}`}>{chat.customerName}</p>
                      <span className="text-[11px] text-muted-foreground/30 font-black uppercase tracking-widest flex items-center gap-2"><Clock size={12}/> 2m</span>
                    </div>
                    <p className={`text-lg truncate font-light ${chat.unread ? 'text-white/70 font-medium' : 'text-muted-foreground/30'}`}>{chat.lastMessage}</p>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={`text-[9px] px-4 py-1.5 rounded-full border-none font-black tracking-[0.2em] uppercase ${chat.status === 'AI Handled' ? 'bg-primary/15 text-primary' : 'bg-amber-500/15 text-amber-500'}`}>
                        {chat.status}
                      </Badge>
                      <div className="flex items-center gap-2.5 text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">
                        {getSentimentIcon(chat.sentiment)} {chat.sentiment}
                      </div>
                    </div>
                  </div>
                  {activeChatId === chat.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-16 bg-primary rounded-r-full glow-primary" />
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className={`flex-1 flex flex-col relative bg-black/30 backdrop-blur-3xl ${showMobileList && 'hidden lg:flex'}`}>
          <AnimatePresence mode="wait">
            {activeChat ? (
              <motion.div key={activeChat.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="flex-1 flex flex-col h-full">
                <div className="p-12 lg:p-16 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-4xl z-20">
                  <div className="flex items-center gap-10">
                    <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-16 w-16 text-muted-foreground">
                      <ArrowLeft size={32} />
                    </Button>
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-muted border-4 border-white/10 flex items-center justify-center overflow-hidden shadow-4xl group">
                      <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/300/300`} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-5">
                        <p className="font-bold text-3xl lg:text-5xl text-white tracking-tighter">{activeChat.customerName}</p>
                        <ShieldCheck size={28} className="text-primary opacity-50" />
                      </div>
                      <div className="flex flex-wrap items-center gap-8">
                        <span className="flex items-center gap-3 text-[11px] text-emerald-500 font-black uppercase tracking-[0.4em]">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" /> Neural Intelligence Active
                        </span>
                        <span className="text-[11px] text-muted-foreground/30 font-black uppercase tracking-[0.4em] flex items-center gap-3">
                          <BrainCircuit size={16} /> Intent: {activeChat.intent}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden xl:flex items-center gap-4 bg-white/5 rounded-3xl p-3 px-8 border border-white/10 shadow-3xl">
                       <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Potential Value</span>
                       <span className="text-2xl font-bold font-headline text-primary">{(activeChat as any).value || '$0.00'}</span>
                    </div>
                    <Button variant="outline" className="hidden xl:flex border-white/10 bg-white/5 rounded-2xl h-18 px-12 font-black text-[11px] uppercase tracking-widest gap-4 shadow-3xl hover:bg-white/10 transition-all">
                      <ExternalLink size={24} /> ERP Sync
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-[2rem] h-18 w-18 hover:bg-white/5 transition-colors">
                      <MoreVertical size={32} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-16 lg:p-24">
                  <div className="max-w-6xl mx-auto space-y-20 lg:space-y-24 pb-32">
                    <div className="text-center py-16 opacity-20">
                      <p className="text-[11px] font-black uppercase tracking-[1em] text-white">Neural Channel Initialized • End-to-End Secure</p>
                    </div>
                    {activeChat.messages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.8 }} className={`flex ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] lg:max-w-[70%] relative group ${msg.role === 'customer' ? 'order-1' : 'order-2'}`}>
                          <div className={`rounded-[3.5rem] lg:rounded-[4.5rem] p-10 lg:p-14 text-xl lg:text-2xl leading-[1.6] relative shadow-4xl border transition-all duration-1000 hover:border-white/20 ${
                            msg.role === 'customer' 
                              ? 'bg-white/[0.04] text-white border-white/5 rounded-tl-none font-light' 
                              : 'bg-primary text-white rounded-tr-none border-primary/20 glow-primary font-medium'
                          }`}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute -top-6 -right-6 w-18 h-18 rounded-full bg-[#020203] border-2 border-primary/40 flex items-center justify-center text-primary shadow-4xl">
                                <Zap size={28} fill="currentColor" />
                              </motion.div>
                            )}
                          </div>
                          <div className={`flex items-center gap-6 mt-8 ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                            <p className="text-[11px] text-muted-foreground/30 font-black tracking-[0.4em] uppercase">
                              {msg.role === 'customer' ? 'Customer Profile' : 'Neural Fleet v8.4'} • 12:42
                            </p>
                            {msg.role !== 'customer' && <Badge className="bg-white/5 text-white/30 border-none text-[10px] font-black px-4 tracking-[0.3em] uppercase rounded-full">Automated</Badge>}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div className="text-center pt-16">
                      <div className="inline-flex items-center gap-5 px-10 py-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[12px] font-black uppercase tracking-[0.5em] shadow-4xl">
                        <TrendingUp size={16} /> Intent Pivot Detected: Proceeding to Checkout
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="px-16 lg:px-32 pb-16 lg:pb-24 pt-10 bg-gradient-to-t from-background via-background/80 to-transparent relative z-30">
                  <div className="max-w-6xl mx-auto space-y-10">
                    <div className="hidden sm:flex flex-wrap gap-5">
                      {["Send pricing catalog v4", "Verify XL stock levels", "Apply 10% loyalty credit"].map((hint, i) => (
                        <motion.button key={i} whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-10 py-5 rounded-[2.25rem] bg-white/[0.04] border border-white/10 text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-white hover:border-primary/50 transition-all flex items-center gap-5 group shadow-3xl">
                          <Sparkles size={18} className="text-primary group-hover:animate-spin-slow" /> {hint}
                        </motion.button>
                      ))}
                    </div>

                    <GlassCard variant="darker" className="p-5 border-white/15 shadow-4xl rounded-[4rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all" hoverable={false}>
                      <form className="relative flex items-center gap-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="p-6 text-muted-foreground hover:text-primary cursor-pointer transition-all group hidden sm:block">
                          <Zap size={36} className="group-hover:scale-125 group-hover:rotate-12 transition-all shadow-primary" />
                        </div>
                        <Input 
                          className="flex-1 h-20 lg:h-32 bg-transparent border-none text-2xl lg:text-3xl placeholder:text-muted-foreground/10 focus-visible:ring-0 px-8 font-light" 
                          placeholder="Command neural agent..." 
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 glow-primary rounded-[3rem] w-20 h-20 lg:w-28 lg:h-28 shrink-0 transition-all shadow-4xl hover:scale-105 active:scale-95 text-white">
                          <Send size={40} className="lg:size-56" />
                        </Button>
                      </form>
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-32 text-center animate-in fade-in duration-1000">
                <div className="w-64 h-64 rounded-full bg-white/[0.02] border-4 border-white/[0.05] flex items-center justify-center mb-16 shadow-4xl group">
                  <BrainCircuit size={120} className="opacity-10 group-hover:opacity-30 transition-opacity animate-pulse" />
                </div>
                <h2 className="font-headline text-6xl lg:text-8xl font-bold text-white mb-10 tracking-tighter text-gradient">System Standby.</h2>
                <p className="max-w-2xl text-2xl lg:text-3xl leading-relaxed opacity-40 font-light italic">Select a neural thread from the sidebar to begin monitoring real-time negotiation logs and intent shifts.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
}
