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
  Filter,
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MOCK_CHATS } from '@/lib/mock-data';

export default function InboxPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [showMobileList, setShowMobileList] = useState(true);

  const activeChat = MOCK_CHATS.find(c => c.id === activeChatId);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 1024 && !activeChatId) {
      setActiveChatId(MOCK_CHATS[0].id);
    }
  }, [activeChatId]);

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setShowMobileList(false);
  };

  return (
    <div className="h-full flex flex-col p-8 lg:p-16 animate-in fade-in duration-700 max-w-[1700px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-bold tracking-tighter mb-4">Neural Inbox</h1>
          <p className="text-zinc-500 text-lg font-medium">Real-time supervision of high-revenue DM negotiations.</p>
        </div>
        <div className="flex gap-4 pb-1">
          <Button variant="outline" className="h-12 border-white/10 bg-white/[0.02] text-xs font-bold gap-3 rounded-xl px-6">
            <Filter size={18} /> Segment Leads
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 h-12 px-8 text-xs font-bold gap-3 rounded-xl shadow-xl">
            <Smartphone size={18} /> Broadcast Sequence
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden border border-white/5 rounded-[2.5rem] bg-zinc-950 shadow-2xl min-h-[700px]">
        {/* Chat List */}
        <div className={`w-full lg:w-[400px] border-r border-white/5 flex flex-col transition-all duration-300 ${!showMobileList && 'hidden lg:flex'}`}>
          <div className="p-8 border-b border-white/5 bg-white/[0.01]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <Input className="pl-11 h-12 bg-white/[0.03] border-white/5 rounded-xl text-sm focus-visible:ring-white/10 placeholder:text-zinc-600" placeholder="Search operational threads..." />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="divide-y divide-white/[0.02]">
              {MOCK_CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => handleSelectChat(chat.id)} 
                  className={`p-8 flex items-center gap-5 cursor-pointer transition-all relative group ${activeChatId === chat.id ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'}`}
                >
                  {activeChatId === chat.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />}
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/5 shrink-0 overflow-hidden relative">
                    <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover grayscale opacity-80" />
                    {chat.unread && <div className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-zinc-950 shadow-xl" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-sm truncate ${chat.unread ? 'font-bold text-white' : 'text-zinc-400 font-medium'}`}>{chat.customerName}</p>
                      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest whitespace-nowrap ml-2">Active</span>
                    </div>
                    <p className={`text-xs truncate leading-relaxed ${chat.unread ? 'text-zinc-300 font-medium' : 'text-zinc-600'}`}>{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat View */}
        <div className={`flex-1 flex flex-col bg-white/[0.005] ${showMobileList && 'hidden lg:flex'}`}>
          <AnimatePresence mode="wait">
            {activeChat ? (
              <motion.div key={activeChat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col h-full">
                <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-10">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-12 w-12 text-zinc-500 hover:bg-white/5">
                      <ArrowLeft size={24} />
                    </Button>
                    <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white mb-1">{activeChat.customerName}</h2>
                      <div className="flex items-center gap-3 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                        <div className="flex items-center gap-1.5 text-emerald-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xl" /> High Intent
                        </div>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        {activeChat.intent}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 text-zinc-400">
                      ID: {activeChat.id}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-white rounded-xl h-12 w-12 hover:bg-white/5">
                      <MoreVertical size={22} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-12">
                  <div className="space-y-12 max-w-4xl mx-auto">
                    {activeChat.messages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.role === 'customer' ? 'items-start' : 'items-end'}`}>
                        <div className={`max-w-[80%] relative group`}>
                          <div className={`rounded-[1.5rem] px-7 py-5 text-sm leading-relaxed shadow-sm transition-all ${
                            msg.role === 'customer' 
                              ? 'bg-zinc-900 text-zinc-300 rounded-bl-none border border-white/[0.03]' 
                              : 'bg-white text-black rounded-br-none font-medium'
                          }`}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-blue-500 shadow-2xl" title="Autonomous AI Logic">
                                <Zap size={12} fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div className={`flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                              {msg.role === 'customer' ? 'External' : 'Neural Agent'} • 24m ago
                            </span>
                            {msg.role !== 'customer' && <CheckCircle2 size={12} className="text-zinc-700" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-12 border-t border-white/5 bg-zinc-950/80 backdrop-blur-xl">
                  <div className="max-w-4xl mx-auto space-y-10">
                    <div className="flex flex-wrap gap-3">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest self-center mr-4">Neural Suggestions</span>
                      {["Send pricing audit", "Apply loyalty tier discount", "Escalate to logistics HQ"].map((hint, i) => (
                        <button key={i} className="px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] font-bold text-zinc-500 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all flex items-center gap-3 group">
                          <Sparkles size={14} className="text-zinc-700 group-hover:text-blue-400 transition-colors" /> {hint}
                        </button>
                      ))}
                    </div>
                    <form className="relative flex items-center gap-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="relative flex-1">
                        <Input 
                          className="w-full h-16 bg-white/[0.03] border-white/5 rounded-2xl text-base focus-visible:ring-white/10 px-8 placeholder:text-zinc-600 shadow-inner" 
                          placeholder="Supervise AI agent or type manual override..." 
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-700">
                          <Activity size={20} />
                        </div>
                      </div>
                      <Button type="submit" size="icon" className="bg-white text-black hover:bg-zinc-200 rounded-2xl w-16 h-16 shrink-0 shadow-2xl transition-all active:scale-95">
                        <Send size={24} />
                      </Button>
                    </form>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 p-12 text-center bg-zinc-950">
                <div className="w-24 h-24 rounded-[2rem] bg-white/[0.01] border border-white/5 flex items-center justify-center mb-10 shadow-inner">
                  <MessageCircle size={40} className="text-zinc-800" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Select Infrastructure Thread</h2>
                <p className="text-sm max-w-sm text-zinc-500 leading-relaxed font-medium">Initialize a conversation monitor to observe high-intent lead recovery and autonomous agent performance.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
