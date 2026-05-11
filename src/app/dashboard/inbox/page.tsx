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
  Clock
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
    <div className="h-full flex flex-col p-6 lg:p-12 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Neural Inbox</h1>
          <p className="text-sm text-zinc-500">Manage all AI-assisted commerce threads in real-time.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 border-zinc-800 bg-zinc-900/50 text-xs font-bold gap-2">
            <Filter size={16} /> Filters
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 h-10 px-6 text-xs font-bold gap-2 rounded-xl">
            <Smartphone size={16} /> New Broadcast
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden border border-zinc-800 rounded-2xl bg-zinc-950/50 shadow-2xl">
        {/* Chat List */}
        <div className={`w-full lg:w-96 border-r border-zinc-800 flex flex-col transition-all duration-300 ${!showMobileList && 'hidden lg:flex'}`}>
          <div className="p-6 border-b border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
              <Input className="pl-9 h-11 bg-zinc-900/50 border-zinc-800 rounded-xl text-sm focus-visible:ring-white/20" placeholder="Search threads..." />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="divide-y divide-zinc-900">
              {MOCK_CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => handleSelectChat(chat.id)} 
                  className={`p-6 flex items-center gap-4 cursor-pointer transition-all relative ${activeChatId === chat.id ? 'bg-zinc-900/50' : 'hover:bg-zinc-900/20'}`}
                >
                  {activeChatId === chat.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />}
                  <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 shrink-0 overflow-hidden relative">
                    <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
                    {chat.unread && <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-blue-500 border-2 border-zinc-950 shadow-lg" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm truncate ${chat.unread ? 'font-bold text-white' : 'text-zinc-400 font-medium'}`}>{chat.customerName}</p>
                      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">2m</span>
                    </div>
                    <p className={`text-xs truncate leading-relaxed ${chat.unread ? 'text-zinc-300' : 'text-zinc-500'}`}>{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat View */}
        <div className={`flex-1 flex flex-col bg-zinc-950/20 ${showMobileList && 'hidden lg:flex'}`}>
          <AnimatePresence mode="wait">
            {activeChat ? (
              <motion.div key={activeChat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col h-full">
                <div className="px-8 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
                  <div className="flex items-center gap-5">
                    <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-10 w-10 text-zinc-500 hover:bg-zinc-900">
                      <ArrowLeft size={20} />
                    </Button>
                    <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white mb-0.5">{activeChat.customerName}</h2>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase font-black tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Active • {activeChat.intent}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white rounded-xl h-10 w-10">
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-8">
                  <div className="space-y-8 max-w-4xl mx-auto">
                    {activeChat.messages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.role === 'customer' ? 'items-start' : 'items-end'}`}>
                        <div className={`max-w-[75%] relative group`}>
                          <div className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                            msg.role === 'customer' 
                              ? 'bg-zinc-900 text-zinc-200 rounded-bl-none border border-zinc-800' 
                              : 'bg-white text-black rounded-br-none font-medium'
                          }`}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-500 shadow-xl" title="AI Automated Response">
                                <Zap size={10} fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div className={`flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                              {msg.role === 'customer' ? 'Customer' : 'AI Assistant'} • 12:42 PM
                            </span>
                            {msg.role !== 'customer' && <CheckCircle2 size={10} className="text-zinc-700" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-8 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest self-center mr-2">Suggestions</span>
                      {["Send pricing catalog", "Check XL inventory", "Apply 10% credit"].map((hint, i) => (
                        <button key={i} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/50 transition-all flex items-center gap-2">
                          <Sparkles size={12} className="text-zinc-600" /> {hint}
                        </button>
                      ))}
                    </div>
                    <form className="relative flex items-center gap-4" onSubmit={(e) => e.preventDefault()}>
                      <Input 
                        className="flex-1 h-14 bg-zinc-900/50 border-zinc-800 rounded-xl text-sm focus-visible:ring-white/20 px-5 placeholder:text-zinc-600" 
                        placeholder="Type a message or use AI suggest..." 
                      />
                      <Button type="submit" size="icon" className="bg-white text-black hover:bg-zinc-200 rounded-xl w-14 h-14 shrink-0 shadow-2xl transition-all active:scale-95">
                        <Send size={20} />
                      </Button>
                    </form>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-2xl">
                  <MessageCircle size={32} className="text-zinc-800" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Initialize Thread</h2>
                <p className="text-sm max-w-xs text-zinc-500 leading-relaxed font-medium">Select a conversation from the sidebar to view automated intelligence and thread context.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
