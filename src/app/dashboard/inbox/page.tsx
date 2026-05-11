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
  Phone,
  Instagram,
  ChevronRight
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MOCK_CHATS } from '@/lib/mock-data';

export default function InboxPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);

  const activeChat = MOCK_CHATS.find(c => c.id === activeChatId);

  // Default to first chat on desktop
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
    <div className="h-full flex flex-col p-6 lg:p-12 space-y-6 lg:space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-headline text-3xl lg:text-5xl font-bold tracking-tight mb-2"
          >
            Neural Inbox
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-base lg:text-xl"
          >
            Monitor AI-driven Instagram threads.
          </motion.p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 lg:flex-none border-white/5 bg-white/5 rounded-xl lg:rounded-2xl h-12 lg:h-14 px-6 lg:px-8 font-black text-[10px] uppercase tracking-widest gap-2">
            <Filter size={18} /> <span className="hidden sm:inline">Filters</span>
          </Button>
          <Button className="flex-1 lg:flex-none bg-primary hover:bg-primary/90 glow-primary rounded-xl lg:rounded-2xl h-12 lg:h-14 px-6 lg:px-8 font-black text-xs lg:text-sm tracking-tight gap-2">
            <MessageCircle size={18} /> New Thread
          </Button>
        </div>
      </div>

      <GlassCard className="flex-1 p-0 flex flex-col lg:flex-row overflow-hidden border-white/[0.04] bg-black/40 min-h-[500px] lg:min-h-[700px] rounded-[1.5rem] lg:rounded-[3rem] shadow-2xl" variant="darker">
        {/* Sidebar - Chat List */}
        <div className={`
          w-full lg:w-[400px] border-r border-white/5 flex flex-col bg-white/[0.01] transition-all duration-300
          ${!showMobileList && 'hidden lg:flex'}
        `}>
          <div className="p-6 lg:p-8 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input className="pl-12 lg:pl-14 h-12 lg:h-14 bg-white/[0.03] border-white/10 rounded-xl lg:rounded-2xl text-sm lg:text-base font-medium focus-visible:ring-primary/40 placeholder:text-muted-foreground/50" placeholder="Search threads..." />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-3 lg:p-4 space-y-1 lg:space-y-2">
              {MOCK_CHATS.map((chat) => (
                <motion.div 
                  key={chat.id} 
                  onClick={() => handleSelectChat(chat.id)}
                  whileHover={{ x: 5 }}
                  className={`p-4 lg:p-6 flex items-center gap-4 lg:gap-5 cursor-pointer transition-all duration-500 rounded-[1.5rem] lg:rounded-[2rem] relative group ${activeChatId === chat.id ? 'bg-white/[0.07] shadow-xl' : 'hover:bg-white/[0.02]'}`}
                >
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-muted border border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative">
                    <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/150/150`} alt="Avatar" className="w-full h-full object-cover" />
                    {chat.unread && <div className="absolute top-0 right-0 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-primary border-4 border-[#0a0a0c]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`font-bold text-sm lg:text-base truncate ${chat.unread ? 'text-white' : 'text-muted-foreground group-hover:text-white transition-colors'}`}>{chat.customerName}</p>
                      <span className="text-[8px] lg:text-[10px] text-muted-foreground font-black uppercase tracking-widest">2m</span>
                    </div>
                    <p className={`text-xs lg:text-sm truncate mb-2 ${chat.unread ? 'text-white/90 font-medium' : 'text-muted-foreground'}`}>{chat.lastMessage}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[7px] lg:text-[9px] px-2 py-0.5 rounded-full border-none h-4 lg:h-5 font-black tracking-[0.2em] uppercase ${chat.status === 'AI Handled' ? 'bg-primary/15 text-primary' : 'bg-amber-500/15 text-amber-500'}`}>
                        {chat.status}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className={`
          flex-1 flex flex-col relative bg-black/20
          ${showMobileList && 'hidden lg:flex'}
        `}>
          <AnimatePresence mode="wait">
            {activeChat ? (
              <motion.div 
                key={activeChat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col h-full"
              >
                {/* Header */}
                <div className="p-4 lg:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-2xl">
                  <div className="flex items-center gap-3 lg:gap-6">
                    <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-10 w-10 text-muted-foreground">
                      <ArrowLeft size={20} />
                    </Button>
                    <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-muted border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                      <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/150/150`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-lg lg:text-2xl text-white tracking-tight">{activeChat.customerName}</p>
                      <div className="hidden sm:flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-[8px] lg:text-[10px] text-emerald-500 font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-4">
                    <Button variant="outline" className="hidden md:flex border-white/5 bg-white/5 rounded-xl h-10 px-4 font-black text-[9px] lg:text-[10px] uppercase tracking-widest gap-2">
                      <ExternalLink size={14} /> Profile
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-xl h-10 w-10 hover:bg-white/5">
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6 lg:p-12">
                  <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 pb-12">
                    {activeChat.messages.map((msg, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-[85%] lg:max-w-[75%] relative group ${msg.role === 'customer' ? 'order-1' : 'order-2'}`}>
                          <div className={`rounded-[1.5rem] lg:rounded-[2.5rem] p-4 lg:p-7 text-sm lg:text-base leading-relaxed relative shadow-2xl border ${
                            msg.role === 'customer' 
                              ? 'bg-white/[0.04] text-white border-white/5 rounded-tl-none' 
                              : 'bg-primary text-white rounded-tr-none border-primary/20 glow-primary'
                          }`}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-[#0a0a0c] border border-primary/50 flex items-center justify-center text-primary shadow-xl animate-float">
                                <Zap size={14} fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div className={`flex items-center gap-3 mt-3 ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                            <p className="text-[8px] lg:text-[10px] text-muted-foreground font-black tracking-widest uppercase">
                              Sent 12:42 PM
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="px-6 lg:px-12 pb-6 lg:pb-12 pt-2">
                  <div className="max-w-4xl mx-auto space-y-4 lg:space-y-6">
                    {/* Suggested Replies - Hidden on very small screens to save space */}
                    <div className="hidden sm:flex flex-wrap gap-2 lg:gap-3">
                      {["Send pricing catalog", "Check XL black stock", "Offer 10% discount"].map((hint, i) => (
                        <motion.button 
                          key={i}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white hover:border-primary/50 transition-all flex items-center gap-2 group"
                        >
                          <Sparkles size={10} className="text-primary" /> {hint}
                        </motion.button>
                      ))}
                    </div>

                    <GlassCard variant="darker" className="p-2 lg:p-3 border-white/10 shadow-2xl rounded-[2rem] lg:rounded-[3rem] bg-white/[0.02]">
                      <form className="relative flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                        <div className="p-3 lg:p-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors group hidden sm:block">
                          <Zap size={20} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <Input 
                          className="flex-1 h-12 lg:h-16 bg-transparent border-none text-base lg:text-lg placeholder:text-muted-foreground/30 focus-visible:ring-0 px-2" 
                          placeholder="Reply or command AI..." 
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 glow-primary rounded-xl lg:rounded-[1.5rem] w-12 h-12 lg:w-14 lg:h-14 shrink-0 transition-all shadow-xl">
                          <Send size={20} className="lg:size-24" />
                        </Button>
                      </form>
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-12 text-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-8 shadow-2xl">
                  <MessageCircle size={40} className="opacity-10" />
                </div>
                <h2 className="font-headline text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">Select a Neural Thread</h2>
                <p className="max-w-md text-sm lg:text-lg leading-relaxed">Choose a conversation from the sidebar to monitor AI logic and customer sentiment.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
}
