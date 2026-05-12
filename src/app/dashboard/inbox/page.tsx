'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Sparkles, 
  Zap,
  Filter,
  ArrowLeft,
  CheckCircle2,
  Activity,
  User,
  Info,
  TrendingUp,
  Tag,
  Clock,
  History
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MOCK_CHATS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

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
    <div className="h-[calc(100vh-64px)] lg:h-[calc(100vh-100px)] flex flex-col bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden max-w-7xl mx-auto">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-bold">Inbox</h1>
          <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-white/10 text-zinc-500 font-bold">
            {MOCK_CHATS.length} Active
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white h-8 text-xs gap-2">
            <Filter size={12} /> Filter
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-500 h-8 w-8">
            <MoreVertical size={14} />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat List */}
        <div className={cn(
          "w-full lg:w-80 border-r border-white/5 flex flex-col shrink-0 transition-all",
          !showMobileList && "hidden lg:flex"
        )}>
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={12} />
              <Input 
                className="pl-8 h-9 bg-white/5 border-white/10 rounded-lg text-xs placeholder:text-zinc-600 focus-visible:ring-zinc-700" 
                placeholder="Search..." 
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="divide-y divide-white/[0.02]">
              {MOCK_CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => handleSelectChat(chat.id)} 
                  className={cn(
                    "p-4 flex items-start gap-3 cursor-pointer transition-colors relative",
                    activeChatId === chat.id ? "bg-white/5" : "hover:bg-white/[0.02]"
                  )}
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/5 shrink-0 overflow-hidden relative">
                    <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/100/100`} alt="" className="w-full h-full object-cover" />
                    {chat.unread && (
                      <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white border-2 border-zinc-950" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className={cn("text-xs truncate font-bold", chat.unread ? "text-white" : "text-zinc-400")}>
                        {chat.customerName}
                      </p>
                      <span className="text-[9px] text-zinc-600 font-bold uppercase">
                        {chat.id === '1' ? '2m' : '1h'}
                      </span>
                    </div>
                    <p className={cn("text-[11px] truncate leading-tight", chat.unread ? "text-zinc-300" : "text-zinc-500")}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat View */}
        <div className={cn(
          "flex-1 flex flex-col bg-zinc-950",
          showMobileList && "hidden lg:flex"
        )}>
          {activeChat ? (
            <div className="flex flex-col h-full relative">
              <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-zinc-950 shrink-0">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-8 w-8 text-zinc-500">
                    <ArrowLeft size={16} />
                  </Button>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/100/100`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-white">{activeChat.customerName}</h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">@{activeChat.customerUsername}</p>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6 max-w-2xl mx-auto">
                  {activeChat.messages.map((msg, i) => (
                    <div key={i} className={cn("flex flex-col", msg.role === 'customer' ? "items-start" : "items-end")}>
                      <div className="max-w-[80%] relative group">
                        <div className={cn(
                          "rounded-xl px-4 py-2 text-sm leading-relaxed",
                          msg.role === 'customer' 
                            ? "bg-white/5 text-zinc-300 border border-white/10" 
                            : "bg-white text-zinc-950 font-medium"
                        )}>
                          {msg.content}
                          {msg.type === 'automated' && (
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-zinc-400" title="Automated">
                              <Zap size={8} fill="currentColor" />
                            </div>
                          )}
                        </div>
                        <p className={cn("text-[9px] text-zinc-600 font-bold uppercase mt-1.5", msg.role === 'customer' ? "text-left" : "text-right")}>
                          {msg.role === 'customer' ? 'Customer' : 'ReplyRush'} • 12:42 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-white/5 bg-zinc-950/50 shrink-0">
                <div className="max-w-2xl mx-auto">
                  <form className="relative flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                    <Input 
                      className="flex-1 h-10 bg-white/5 border-white/10 rounded-lg text-sm focus-visible:ring-zinc-700 px-4 placeholder:text-zinc-700" 
                      placeholder="Type a message..." 
                    />
                    <Button type="submit" size="icon" className="bg-white text-zinc-950 hover:bg-zinc-200 rounded-lg w-10 h-10 shrink-0">
                      <Send size={14} />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 p-8 text-center">
              <History size={32} className="text-zinc-800 mb-4" />
              <h2 className="text-sm font-bold text-white mb-1">Select a conversation</h2>
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Select a thread to start messaging</p>
            </div>
          )}
        </div>

        {/* Insights Panel */}
        {activeChat && (
          <div className="hidden xl:flex w-72 border-l border-white/5 flex-col bg-zinc-950 shrink-0">
            <div className="p-6">
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-6">Customer Insights</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">Intent</span>
                  <Badge variant="outline" className="text-[9px] h-5 border-white/10 text-emerald-500 font-bold">
                    {activeChat.intent.split(' ')[0]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">Sentiment</span>
                  <span className="text-[10px] font-bold text-white">{activeChat.sentiment}</span>
                </div>
              </div>

              <Separator className="my-8 bg-white/5" />

              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Quick Actions</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-[10px] font-bold uppercase h-9 border-white/10 bg-white/5 hover:bg-white/10 gap-2">
                  <Zap size={12} className="text-zinc-500" /> Send Discount
                </Button>
                <Button variant="outline" className="w-full justify-start text-[10px] font-bold uppercase h-9 border-white/10 bg-white/5 hover:bg-white/10 gap-2">
                  <Clock size={12} className="text-zinc-500" /> Follow Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}