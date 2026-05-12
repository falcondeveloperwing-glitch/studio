'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDemo } from '@/components/demo/demo-context';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Zap,
  Filter,
  ArrowLeft,
  Clock,
  History,
  Tag,
  Loader2
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MOCK_CHATS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function InboxPage() {
  const { toast } = useToast();
  const { isActive, currentStep } = useDemo();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [showMobileList, setShowMobileList] = useState(true);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [chats, setChats] = useState(MOCK_CHATS);

  const activeChat = chats.find(c => c.id === activeChatId);

  // Demo Simulation Logic
  useEffect(() => {
    if (isActive && currentStep === 'inbox') {
      // Auto-select Marcus
      handleSelectChat('1');
      
      const timer = setTimeout(() => {
        setSending(true);
        setTimeout(() => {
          setChats(prev => prev.map(c => {
            if (c.id === '1') {
              return {
                ...c,
                messages: [...c.messages, {
                  role: 'business',
                  content: "Perfect, Marcus! I've sent the secure payment link to your DM. Your 15% bulk discount is applied. Let me know once done!",
                  type: 'text',
                  timestamp: new Date().toISOString()
                }]
              };
            }
            return c;
          }));
          setSending(false);
        }, 3000);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isActive, currentStep]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 1024 && !activeChatId) {
      setActiveChatId(MOCK_CHATS[0].id);
    }
  }, [activeChatId]);

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setShowMobileList(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatId) return;

    setSending(true);
    const text = inputText;
    setInputText('');

    setTimeout(() => {
      setChats(prev => prev.map(c => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: [...c.messages, {
              role: 'business',
              content: text,
              type: 'text',
              timestamp: new Date().toISOString()
            }]
          };
        }
        return c;
      }));
      setSending(false);
    }, 600);
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Initialized",
      description: `Sending ${action} to ${activeChat?.customerName}...`,
    });
  };

  return (
    <div className="h-[calc(100vh-64px)] lg:h-[calc(100vh-100px)] flex flex-col bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden max-w-7xl mx-auto flex-1">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-20 bg-zinc-950">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-bold">Inbox</h1>
          <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-white/10 text-zinc-500 font-bold">
            {chats.length} Active
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => toast({ title: "Filters Active", description: "Showing high-priority conversations." })} className="text-zinc-500 hover:text-white h-8 text-xs gap-2">
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
          "w-full lg:w-80 border-r border-white/5 flex flex-col shrink-0 transition-all bg-zinc-950",
          !showMobileList && "hidden lg:flex"
        )}>
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={12} />
              <Input 
                className="pl-8 h-9 bg-white/5 border-white/10 rounded-lg text-xs placeholder:text-zinc-600 focus-visible:ring-zinc-800" 
                placeholder="Search conversations..." 
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="divide-y divide-white/[0.02]">
              {chats.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => handleSelectChat(chat.id)} 
                  className={cn(
                    "p-4 flex items-start gap-3 cursor-pointer transition-colors relative",
                    activeChatId === chat.id ? "bg-white/5" : "hover:bg-white/[0.02]"
                  )}
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 shrink-0 overflow-hidden relative">
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
                      {chat.messages[chat.messages.length - 1].content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat View */}
        <div className={cn(
          "flex-1 flex flex-col bg-[#09090b]",
          showMobileList && "hidden lg:flex"
        )}>
          {activeChat ? (
            <div className="flex flex-col h-full relative">
              <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-zinc-950 shrink-0 z-10">
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

              <ScrollArea className="flex-1 p-6 bg-[#09090b]">
                <div className="space-y-6 max-w-2xl mx-auto">
                  {activeChat.messages.map((msg, i) => (
                    <div key={i} className={cn("flex flex-col", msg.role === 'customer' ? "items-start" : "items-end")}>
                      <div className="max-w-[80%] relative group">
                        <div className={cn(
                          "rounded-xl px-4 py-2 text-sm leading-relaxed",
                          msg.role === 'customer' 
                            ? "bg-zinc-900 text-zinc-300 border border-white/5" 
                            : "bg-white text-zinc-950 font-medium shadow-sm"
                        )}>
                          {msg.content}
                          {msg.type === 'automated' && (
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-zinc-400" title="AI Responded">
                              <Zap size={8} fill="currentColor" />
                            </div>
                          )}
                        </div>
                        <p className={cn("text-[9px] text-zinc-600 font-bold uppercase mt-1.5", msg.role === 'customer' ? "text-left" : "text-right")}>
                          {msg.role === 'customer' ? 'Customer' : 'ReplyRush AI'} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {sending && (
                    <div className="flex flex-col items-end">
                      <div className="bg-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
                        <Loader2 size={12} className="animate-spin text-zinc-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Sending...</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-white/5 bg-zinc-950/80 backdrop-blur-md shrink-0">
                <div className="max-w-2xl mx-auto">
                  <form className="relative flex items-center gap-2" onSubmit={handleSendMessage}>
                    <Input 
                      className="flex-1 h-10 bg-white/5 border-white/10 rounded-lg text-sm focus-visible:ring-zinc-800 px-4 placeholder:text-zinc-700" 
                      placeholder="Type your message..." 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <Button type="submit" disabled={!inputText.trim()} size="icon" className="bg-white text-zinc-950 hover:bg-zinc-200 rounded-lg w-10 h-10 shrink-0 shadow-xl transition-transform active:scale-95 disabled:opacity-50">
                      <Send size={14} />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 p-8 text-center bg-[#09090b]">
              <History size={32} className="text-zinc-800 mb-4" />
              <h2 className="text-sm font-bold text-white mb-1">Select a conversation</h2>
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Open a thread to start messaging</p>
            </div>
          )}
        </div>

        {/* Insights Panel */}
        {activeChat && (
          <div className="hidden xl:flex w-72 border-l border-white/5 flex-col bg-zinc-950 shrink-0">
            <ScrollArea className="flex-1">
              <div className="p-6">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-6">Customer Insights</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Intent</span>
                    <Badge variant="outline" className="text-[9px] h-5 border-none text-emerald-500 font-bold bg-emerald-500/5">
                      {activeChat.intent.split(' ')[0]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Sentiment</span>
                    <span className="text-[10px] font-bold text-white">{activeChat.sentiment}</span>
                  </div>
                </div>

                <Separator className="my-8 bg-white/5" />

                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Quick Actions</p>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleQuickAction("Bulk Discount")}
                    className="w-full justify-start text-[10px] font-bold uppercase h-9 border-white/5 bg-white/[0.02] hover:bg-white/5 gap-2 transition-all"
                  >
                    <Zap size={12} className="text-zinc-500" /> Send Bulk Discount
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleQuickAction("Schedule Follow-up")}
                    className="w-full justify-start text-[10px] font-bold uppercase h-9 border-white/5 bg-white/[0.02] hover:bg-white/5 gap-2 transition-all"
                  >
                    <Clock size={12} className="text-zinc-500" /> Schedule Follow Up
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleQuickAction("Mark as Priority")}
                    className="w-full justify-start text-[10px] font-bold uppercase h-9 border-white/5 bg-white/[0.02] hover:bg-white/5 gap-2 transition-all"
                  >
                    <Tag size={12} className="text-zinc-500" /> Mark as Priority
                  </Button>
                </div>

                <Separator className="my-8 bg-white/5" />
                
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Order Context</p>
                <div className="p-3 rounded-lg bg-zinc-900 border border-white/5 space-y-2">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-zinc-500 uppercase">Last Order</span>
                    <span className="text-white">#8421</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-zinc-500 uppercase">Total Value</span>
                    <span className="text-white">$2,840.00</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
