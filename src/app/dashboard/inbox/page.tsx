
'use client';

import React, { useState } from 'react';
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
  const [activeChatId, setActiveChatId] = useState<string | null>(MOCK_CHATS[0].id);
  const [messageInput, setMessageInput] = useState('');

  const activeChat = MOCK_CHATS.find(c => c.id === activeChatId);

  return (
    <div className="h-full flex flex-col p-12 space-y-10 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-headline text-5xl font-bold tracking-tight mb-3"
          >
            Neural Inbox
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xl"
          >
            Monitor and intervene in AI-driven Instagram conversations.
          </motion.p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-white/5 bg-white/5 rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest gap-2">
            <Filter size={18} /> Filters
          </Button>
          <Button className="bg-primary hover:bg-primary/90 glow-primary rounded-2xl h-14 px-8 font-black text-sm tracking-tight gap-2">
            <MessageCircle size={18} /> New Thread
          </Button>
        </div>
      </div>

      <GlassCard className="flex-1 p-0 flex overflow-hidden border-white/[0.04] bg-black/40 min-h-[700px] rounded-[3rem] shadow-2xl" variant="darker">
        {/* Sidebar */}
        <div className="w-[400px] border-r border-white/5 flex flex-col bg-white/[0.01]">
          <div className="p-8 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input className="pl-14 h-14 bg-white/[0.03] border-white/10 rounded-2xl text-base font-medium focus-visible:ring-primary/40 placeholder:text-muted-foreground/50" placeholder="Search threads..." />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {MOCK_CHATS.map((chat) => (
                <motion.div 
                  key={chat.id} 
                  onClick={() => setActiveChatId(chat.id)}
                  whileHover={{ x: 5 }}
                  className={`p-6 flex items-center gap-5 cursor-pointer transition-all duration-500 rounded-[2rem] relative group ${activeChatId === chat.id ? 'bg-white/[0.07] shadow-xl' : 'hover:bg-white/[0.02]'}`}
                >
                  <div className="w-16 h-16 rounded-full bg-muted border border-white/10 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden relative group-hover:border-primary/50 transition-colors">
                    <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/150/150`} alt="Avatar" className="w-full h-full object-cover" />
                    {chat.unread && <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary border-4 border-[#0a0a0c]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className={`font-bold text-base truncate ${chat.unread ? 'text-white' : 'text-muted-foreground group-hover:text-white transition-colors'}`}>{chat.customerName}</p>
                      <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">2m</span>
                    </div>
                    <p className={`text-sm truncate mb-3 ${chat.unread ? 'text-white/90 font-medium' : 'text-muted-foreground'}`}>{chat.lastMessage}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-[9px] px-3 py-0.5 rounded-full border-none h-5 font-black tracking-[0.2em] uppercase ${chat.status === 'AI Handled' ? 'bg-primary/15 text-primary' : 'bg-amber-500/15 text-amber-500'}`}>
                        {chat.status}
                      </Badge>
                      {chat.unread && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    </div>
                  </div>
                  {activeChatId === chat.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r-full glow-primary" />
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative bg-black/20">
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
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-2xl">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-muted border border-white/10 flex items-center justify-center font-bold text-xs overflow-hidden shadow-2xl">
                      <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/150/150`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl text-white tracking-tight mb-1">{activeChat.customerName}</p>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-black uppercase tracking-widest">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live DM
                        </span>
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">• Instagram</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="border-white/5 bg-white/5 rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest gap-2 group">
                      <ExternalLink size={16} className="group-hover:text-primary transition-colors" /> View Profile
                    </Button>
                    <Button className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest gap-2">
                      <Phone size={16} fill="currentColor" /> Move to WhatsApp
                    </Button>
                    <Separator orientation="vertical" className="h-8 bg-white/10 mx-2" />
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-2xl h-12 w-12 hover:bg-white/5">
                      <MoreVertical size={24} />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-12">
                  <div className="max-w-4xl mx-auto space-y-12 pb-12">
                    {activeChat.messages.map((msg, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-[75%] relative group ${msg.role === 'customer' ? 'order-1' : 'order-2'}`}>
                          <div className={`rounded-[2.5rem] p-7 text-base leading-relaxed relative shadow-2xl border ${
                            msg.role === 'customer' 
                              ? 'bg-white/[0.04] text-white border-white/5 rounded-tl-none' 
                              : 'bg-primary text-white rounded-tr-none border-primary/20 glow-primary'
                          }`}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#0a0a0c] border border-primary/50 flex items-center justify-center text-primary shadow-[0_10px_30px_rgba(104,20,247,0.5)] animate-float">
                                <Zap size={18} fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div className={`flex items-center gap-3 mt-4 ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                            <p className="text-[10px] text-muted-foreground font-black tracking-widest uppercase">
                              {msg.timestamp === 'Just now' ? 'Active now' : 'Sent 12:42 PM'}
                            </p>
                            {msg.type === 'automated' && (
                              <Badge variant="outline" className="h-5 px-3 text-[9px] bg-primary/10 text-primary border-none font-black tracking-[0.2em] uppercase">Neural Agent</Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Live Typing Placeholder */}
                    <div className="flex justify-start animate-pulse">
                      <div className="bg-white/5 rounded-full px-5 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Instagram size={12} /> User is typing
                        <div className="flex gap-1">
                          <span className="w-1 h-1 rounded-full bg-primary" />
                          <span className="w-1 h-1 rounded-full bg-primary delay-75" />
                          <span className="w-1 h-1 rounded-full bg-primary delay-150" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="px-12 pb-12 pt-4">
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Suggested Replies */}
                    <div className="flex flex-wrap gap-3">
                      {["Send pricing catalog", "Check XL black stock", "Offer 10% discount", "Escalate to human"].map((hint, i) => (
                        <motion.button 
                          key={i}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white hover:border-primary/50 transition-all flex items-center gap-2 group"
                        >
                          <Sparkles size={12} className="text-primary group-hover:animate-pulse" /> {hint}
                        </motion.button>
                      ))}
                    </div>

                    <GlassCard variant="darker" className="p-3 border-white/10 shadow-2xl rounded-[3rem] bg-white/[0.02]">
                      <form className="relative flex items-center gap-3" onSubmit={(e) => e.preventDefault()}>
                        <div className="p-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors group">
                          <Zap size={24} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <Input 
                          className="flex-1 h-16 bg-transparent border-none text-lg placeholder:text-muted-foreground/30 focus-visible:ring-0 px-2" 
                          placeholder="Command AI or type a response..." 
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 glow-primary rounded-[1.5rem] w-14 h-14 shrink-0 group transition-all duration-500 shadow-xl">
                          <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                      </form>
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-24 text-center">
                <div className="w-32 h-32 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-10 shadow-2xl">
                  <MessageCircle size={60} className="opacity-10" />
                </div>
                <h2 className="font-headline text-3xl font-bold text-white mb-4 tracking-tight">Select a Neural Thread</h2>
                <p className="max-w-md text-lg leading-relaxed">Choose a conversation from the sidebar to monitor real-time AI logic and customer sentiment analysis.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
}
