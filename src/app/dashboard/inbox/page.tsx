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
    <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col bg-zinc-950 overflow-hidden">
      {/* Top Header - Minimal SaaS Style */}
      <div className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold tracking-tight">Display Inbox</h1>
          <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-zinc-800 text-zinc-500 font-bold bg-zinc-900/50">
            {MOCK_CHATS.length} Active Threads
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white hover:bg-zinc-800 h-8 px-3 text-xs gap-2">
            <Filter size={14} /> View Filter
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-500 h-8 w-8">
            <MoreVertical size={16} />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Chat List */}
        <div className={cn(
          "w-full lg:w-[320px] xl:w-[380px] border-r border-zinc-800 flex flex-col shrink-0 transition-all bg-zinc-950",
          !showMobileList && "hidden lg:flex"
        )}>
          <div className="p-4 border-b border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <Input 
                className="pl-9 h-10 bg-zinc-900/50 border-zinc-800 rounded-lg text-xs placeholder:text-zinc-600 focus-visible:ring-zinc-700" 
                placeholder="Search conversations..." 
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="divide-y divide-zinc-900">
              {MOCK_CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => handleSelectChat(chat.id)} 
                  className={cn(
                    "p-4 flex items-start gap-3 cursor-pointer transition-colors relative group",
                    activeChatId === chat.id ? "bg-zinc-900" : "hover:bg-zinc-900/40"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 shrink-0 overflow-hidden relative">
                    <img 
                      src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/100/100`} 
                      alt="" 
                      className="w-full h-full object-cover opacity-80" 
                    />
                    {chat.unread && (
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-zinc-200 border-2 border-zinc-950 shadow-lg" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className={cn("text-xs truncate", chat.unread ? "font-bold text-white" : "text-zinc-400 font-medium")}>
                        {chat.customerName}
                      </p>
                      <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
                        {chat.id === '1' ? '2m' : '1h'}
                      </span>
                    </div>
                    <p className={cn("text-[11px] truncate leading-tight", chat.unread ? "text-zinc-300 font-medium" : "text-zinc-500")}>
                      {chat.lastMessage}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-[8px] h-4 px-1.5 border-zinc-800 text-zinc-600 uppercase font-black tracking-tighter">
                        {chat.intent.split(' ')[0]}
                      </Badge>
                      {chat.status === 'Escalated' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Column 2: Chat View */}
        <div className={cn(
          "flex-1 flex flex-col bg-zinc-950/20",
          showMobileList && "hidden lg:flex"
        )}>
          <AnimatePresence mode="wait">
            {activeChat ? (
              <motion.div 
                key={activeChat.id} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col h-full relative"
              >
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80 backdrop-blur-xl shrink-0">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-8 w-8 text-zinc-500">
                      <ArrowLeft size={18} />
                    </Button>
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/100/100`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white leading-tight">{activeChat.customerName}</h2>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        <span className="text-zinc-600">@{activeChat.customerUsername}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span className="text-zinc-400">{activeChat.intent}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white h-9 w-9">
                      <MoreVertical size={18} />
                    </Button>
                  </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-6 lg:p-10">
                  <div className="space-y-8 max-w-3xl mx-auto">
                    {activeChat.messages.map((msg, i) => (
                      <div key={i} className={cn("flex flex-col", msg.role === 'customer' ? "items-start" : "items-end")}>
                        <div className="max-w-[85%] lg:max-w-[75%] relative group">
                          <div className={cn(
                            "rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm transition-all",
                            msg.role === 'customer' 
                              ? "bg-zinc-900 text-zinc-300 rounded-bl-none border border-zinc-800" 
                              : "bg-white text-zinc-950 rounded-br-none font-medium"
                          )}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400" title="AI Automated Response">
                                <Zap size={10} fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div className={cn(
                            "flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity",
                            msg.role === 'customer' ? "justify-start" : "justify-end"
                          )}>
                            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
                              {msg.role === 'customer' ? 'Customer' : msg.type === 'automated' ? 'Neural Agent' : 'Business'} • 12:42 PM
                            </span>
                            {msg.role !== 'customer' && <CheckCircle2 size={10} className="text-zinc-700" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-6 border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-md shrink-0">
                  <div className="max-w-3xl mx-auto space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest self-center mr-2">Suggestions</span>
                      {["Send pricing audit", "Apply loyalty discount", "Escalate to logistics"].map((hint, i) => (
                        <button key={i} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all flex items-center gap-2 group">
                          <Sparkles size={12} className="text-zinc-700 group-hover:text-zinc-400" /> {hint}
                        </button>
                      ))}
                    </div>
                    <form className="relative flex items-center gap-3" onSubmit={(e) => e.preventDefault()}>
                      <div className="relative flex-1">
                        <Input 
                          className="w-full h-12 bg-zinc-900/80 border-zinc-800 rounded-xl text-sm focus-visible:ring-zinc-700 px-5 placeholder:text-zinc-700" 
                          placeholder="Type manual override or supervise AI..." 
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700">
                          <Activity size={16} />
                        </div>
                      </div>
                      <Button type="submit" size="icon" className="bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl w-12 h-12 shrink-0 shadow-lg">
                        <Send size={18} />
                      </Button>
                    </form>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 p-12 text-center bg-zinc-950">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                  <History size={32} className="text-zinc-800" />
                </div>
                <h2 className="text-lg font-bold text-white mb-2 tracking-tight">Select Infrastructure Thread</h2>
                <p className="text-xs max-w-[240px] text-zinc-500 leading-relaxed font-medium">Observe high-intent lead recovery and autonomous agent performance across the fleet.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Column 3: Customer Insights (Hidden on small screens) */}
        {activeChat && (
          <div className="hidden xl:flex w-[320px] border-l border-zinc-800 flex-col bg-zinc-950 shrink-0">
            <div className="p-6 border-b border-zinc-800">
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Customer Integrity</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://picsum.photos/seed/${activeChat.avatarSeed}/100/100`} alt="" className="w-full h-full object-cover grayscale" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeChat.customerName}</h3>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">@{activeChat.customerUsername}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase">
                    <TrendingUp size={12} className="text-zinc-600" /> Intent Level
                  </div>
                  <Badge className={cn(
                    "text-[9px] font-black uppercase h-5",
                    activeChat.intent.includes('High') ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  )}>
                    {activeChat.intent.split(' ')[0]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase">
                    <Activity size={12} className="text-zinc-600" /> Sentiment
                  </div>
                  <span className="text-[10px] font-bold text-white">{activeChat.sentiment}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase">
                    <Tag size={12} className="text-zinc-600" /> Projected Value
                  </div>
                  <span className="text-[10px] font-bold text-white">{activeChat.value}</span>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-8">
                <div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Suggested Actions</p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-[10px] font-bold uppercase tracking-widest h-10 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-all gap-3">
                      <Zap size={14} className="text-zinc-600" /> Send Discount Link
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-[10px] font-bold uppercase tracking-widest h-10 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-all gap-3">
                      <Clock size={14} className="text-zinc-600" /> Schedule Follow-up
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-[10px] font-bold uppercase tracking-widest h-10 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-all gap-3">
                      <User size={14} className="text-zinc-600" /> Human Override
                    </Button>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Recent Activity</p>
                  <div className="space-y-4">
                    {[
                      { action: 'Viewed Checkout', time: '14m ago' },
                      { action: 'Applied BULK15 Code', time: '22m ago' },
                      { action: 'IG Story Interaction', time: '2h ago' }
                    ].map((act, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[11px] text-zinc-400 font-medium">{act.action}</span>
                        <span className="text-[9px] text-zinc-600 font-bold uppercase">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-zinc-800 bg-zinc-900/20">
              <Button variant="ghost" className="w-full h-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-zinc-800 gap-2">
                <Info size={14} /> Full Customer Audit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
