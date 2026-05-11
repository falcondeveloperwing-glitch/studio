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
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MOCK_CHATS } from '@/lib/mock-data';

export default function InboxPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
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
    <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Inbox</h1>
          <p className="text-sm text-zinc-500">Unified dashboard for all Instagram DMs.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 px-4 text-xs font-bold gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 h-10 px-4 text-xs font-bold gap-2">
            <MessageCircle size={16} /> New Broadcast
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden border border-white/5 rounded-2xl bg-zinc-950 shadow-sm">
        {/* Chat List */}
        <div className={`w-full lg:w-80 border-r border-white/5 flex flex-col transition-all duration-300 ${!showMobileList && 'hidden lg:flex'}`}>
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
              <Input className="pl-9 h-10 bg-zinc-900/50 border-white/10 rounded-lg text-sm" placeholder="Search threads..." />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="divide-y divide-white/5">
              {MOCK_CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => handleSelectChat(chat.id)} 
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${activeChatId === chat.id ? 'bg-zinc-900' : 'hover:bg-zinc-900/50'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 shrink-0 overflow-hidden relative">
                    <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
                    {chat.unread && <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-blue-500 border-2 border-zinc-900" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className={`text-sm truncate ${chat.unread ? 'font-bold text-white' : 'text-zinc-400'}`}>{chat.customerName}</p>
                      <span className="text-[10px] text-zinc-600 font-medium">2m</span>
                    </div>
                    <p className={`text-xs truncate ${chat.unread ? 'text-zinc-300' : 'text-zinc-500'}`}>{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat View */}
        <div className={`flex-1 flex flex-col bg-zinc-950/50 ${showMobileList && 'hidden lg:flex'}`}>
          <AnimatePresence mode="wait">
            {activeChat ? (
              <motion.div key={activeChat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col h-full">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-8 w-8 text-zinc-500">
                      <ArrowLeft size={20} />
                    </Button>
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">{activeChat.customerName}</h2>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active • {activeChat.intent}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white rounded-lg h-9 w-9">
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6 max-w-4xl mx-auto">
                    {activeChat.messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] ${msg.role === 'customer' ? 'order-1' : 'order-2'}`}>
                          <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            msg.role === 'customer' 
                              ? 'bg-zinc-900 text-zinc-200 rounded-bl-none border border-white/5' 
                              : 'bg-white text-black rounded-br-none font-medium'
                          }`}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-blue-500 shadow-xl">
                                <Zap size={10} fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <p className={`text-[10px] text-zinc-600 font-bold mt-2 uppercase tracking-wider ${msg.role === 'customer' ? 'text-left' : 'text-right'}`}>
                            {msg.role === 'customer' ? 'Customer' : 'AI Assistant'} • 12:42 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-6 border-t border-white/5 bg-zinc-950/80 backdrop-blur-md">
                  <div className="max-w-4xl mx-auto space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["Send pricing catalog", "Check stock", "Apply discount"].map((hint, i) => (
                        <button key={i} className="px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-[10px] font-bold text-zinc-500 hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
                          <Sparkles size={12} className="text-zinc-600" /> {hint}
                        </button>
                      ))}
                    </div>
                    <form className="relative flex items-center gap-3" onSubmit={(e) => e.preventDefault()}>
                      <Input 
                        className="flex-1 h-12 bg-zinc-900/50 border-white/10 text-sm focus-visible:ring-1 focus-visible:ring-white/20 px-4" 
                        placeholder="Reply as AI or override manually..." 
                      />
                      <Button type="submit" size="icon" className="bg-white text-black hover:bg-zinc-200 rounded-lg w-12 h-12 shrink-0 shadow-lg">
                        <Send size={18} />
                      </Button>
                    </form>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-4">
                  <MessageCircle size={32} className="text-zinc-800" />
                </div>
                <h2 className="text-lg font-bold text-white mb-2">Select a thread</h2>
                <p className="text-sm max-w-xs text-zinc-500 leading-relaxed">Choose a conversation from the sidebar to view messages and intent analysis.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
