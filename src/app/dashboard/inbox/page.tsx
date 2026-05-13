'use client';

import React, { useState, useEffect } from 'react';
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
  Loader2,
  User as UserIcon
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

  useEffect(() => {
    if (isActive && currentStep === 'inbox') {
      const selectTimer = setTimeout(() => {
        setActiveChatId('1');
        setShowMobileList(false);
      }, 1500);
      
      const typeTimer = setTimeout(() => {
        setSending(true);
        const fullMessage = "Perfect, Marcus! I've dispatched the secure payment link to your DM. Your 15% bulk discount is applied. Let me know once complete!";
        
        setTimeout(() => {
          setChats(prev => prev.map(c => {
            if (c.id === '1') {
              return {
                ...c,
                messages: [...c.messages, {
                  role: 'business',
                  content: fullMessage,
                  type: 'text',
                  timestamp: new Date().toISOString()
                }]
              };
            }
            return c;
          }));
          setSending(false);
          toast({
            title: "Inquiry Resolved",
            description: "AI successfully converted bulk inquiry to checkout.",
          });
        }, 4500 + Math.random() * 2000);
      }, 7000);

      return () => {
        clearTimeout(selectTimer);
        clearTimeout(typeTimer);
      };
    }
  }, [isActive, currentStep, toast]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 1024 && !activeChatId && !isActive) {
      setActiveChatId(MOCK_CHATS[0].id);
    }
  }, [activeChatId, isActive]);

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
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden w-full max-w-7xl mx-auto transition-all duration-300">
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-zinc-950/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-bold tracking-tight">Inbox</h1>
          <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-white/10 text-zinc-500 font-bold px-2 py-0">
            {chats.length} Threads
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex text-zinc-500 hover:text-white h-8 text-[11px] gap-2 font-bold uppercase tracking-widest">
            <Filter size={12} /> Filter
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-500 h-8 w-8 hover:bg-white/5">
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
                className="pl-8 h-9 bg-white/5 border-white/10 rounded-lg text-[11px] placeholder:text-zinc-700" 
                placeholder="Search..." 
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
                    "p-4 flex items-start gap-3 cursor-pointer transition-colors relative active:bg-white/[0.08]",
                    activeChatId === chat.id ? "bg-white/5" : "hover:bg-white/[0.02]"
                  )}
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-900 border border-white/5 shrink-0 overflow-hidden relative grayscale">
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
                      <span className="text-[9px] text-zinc-600 font-black uppercase tracking-tighter">
                        {chat.id === '1' ? 'Now' : '1h'}
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

        {/* Chat Window */}
        <div className={cn(
          "flex-1 flex flex-col bg-[#09090b] transition-all relative overflow-hidden",
          showMobileList && "hidden lg:flex"
        )}>
          {activeChat ? (
            <div className="flex flex-col h-full relative">
              <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-zinc-950 shrink-0 z-10">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => setShowMobileList(true)} className="lg:hidden h-8 w-8 text-zinc-500">
                    <ArrowLeft size={16} />
                  </Button>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 overflow-hidden grayscale">
                    <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/100/100`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-[11px] font-black text-white uppercase tracking-wider">{activeChat.customerName}</h2>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">@{activeChat.customerUsername}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-4">
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <UserIcon size={12} className="text-zinc-500" />
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        {activeChat.assignedTo}
                      </span>
                   </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4 sm:p-6">
                <div className="space-y-4 max-w-2xl mx-auto w-full">
                  {activeChat.messages.map((msg, i) => {
                    const isSameSenderAsPrev = i > 0 && activeChat.messages[i-1].role === msg.role;
                    return (
                      <div key={i} className={cn(
                        "flex flex-col", 
                        msg.role === 'customer' ? "items-start" : "items-end",
                        isSameSenderAsPrev ? "mt-1" : "mt-8"
                      )}>
                        <div className="max-w-[90%] sm:max-w-[85%] relative group">
                          <div className={cn(
                            "rounded-xl px-4 py-2.5 text-xs leading-relaxed transition-all duration-300 active:scale-[0.99] break-words",
                            msg.role === 'customer' 
                              ? "bg-zinc-900 text-zinc-400 border border-white/5" 
                              : "bg-white text-zinc-950 font-medium shadow-2xl"
                          )}>
                            {msg.content}
                            {msg.type === 'automated' && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-zinc-400 shadow-xl" title="Automated Logic">
                                <Zap size={10} fill="currentColor" />
                              </div>
                            )}
                          </div>
                          {!isSameSenderAsPrev && (
                            <p className={cn("text-[9px] text-zinc-600 font-black uppercase mt-2 tracking-widest", msg.role === 'customer' ? "text-left" : "text-right")}>
                              {msg.role === 'customer' ? 'Inquiry' : 'Autopilot'} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {sending && (
                    <div className="flex flex-col items-end mt-4">
                      <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 flex items-center gap-3">
                        <Loader2 size={12} className="animate-spin text-zinc-500" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Composing...</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-white/5 bg-zinc-950/50 backdrop-blur-xl shrink-0">
                <div className="max-w-2xl mx-auto">
                  <form className="relative flex items-center gap-2" onSubmit={handleSendMessage}>
                    <Input 
                      className="flex-1 h-11 bg-white/5 border-white/10 rounded-xl text-xs px-5" 
                      placeholder="Type a manual response..." 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <Button type="submit" disabled={!inputText.trim()} size="icon" className="bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl w-11 h-11 shrink-0 shadow-2xl active:scale-95 disabled:opacity-30">
                      <Send size={16} />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 p-8 text-center bg-[#09090b]">
              <History size={32} className="text-zinc-900 mb-6" />
              <h2 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-2">Workspace Idle</h2>
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest max-w-[200px]">Select a thread to begin</p>
            </div>
          )}
        </div>

        {/* Intelligence Panel (Hidden on Mobile/Tablet) */}
        {activeChat && (
          <div className="hidden xl:flex w-72 border-l border-white/5 flex-col bg-zinc-950 shrink-0">
            <ScrollArea className="flex-1">
              <div className="p-6">
                <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-8">Customer Intelligence</p>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Intent Score</span>
                      <Badge variant="outline" className="text-[9px] h-5 border-none text-emerald-500 font-black bg-emerald-500/5 px-2">
                        {activeChat.intent.split(' ')[0]}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Sentiment</span>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">{activeChat.sentiment}</span>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex flex-col gap-2">
                       <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Ownership</span>
                       <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                             <UserIcon size={10} />
                          </div>
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">{activeChat.assignedTo}</span>
                       </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-10 bg-white/5" />

                <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-6">Actions</p>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-10 border-white/5 bg-white/[0.02] hover:bg-white/5 gap-3 active:scale-[0.98]"
                  >
                    <Zap size={14} className="text-zinc-600" /> Apply Tier 2
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-10 border-white/5 bg-white/[0.02] hover:bg-white/5 gap-3 active:scale-[0.98]"
                  >
                    <Clock size={14} className="text-zinc-600" /> Mark Follow Up
                  </Button>
                </div>

                <Separator className="my-10 bg-white/5" />
                
                <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-6">History</p>
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-4">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-zinc-600 uppercase tracking-widest">Total Value</span>
                    <span className="text-white tracking-widest">{activeChat.value}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-zinc-600 uppercase tracking-widest">Status</span>
                    <span className="text-white uppercase tracking-widest">Elite</span>
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
