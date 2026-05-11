"use client";

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Sparkles, 
  Zap,
  MessageCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const MOCK_CHATS = [
  { id: 1, name: 'Jessica Miller', username: '@jess_miller', lastMsg: 'How much for the sneakers?', time: '2m', unread: true, status: 'AI Handled' },
  { id: 2, name: 'Marcus Chen', username: '@marcus.eth', lastMsg: 'Is delivery available to UK?', time: '14m', unread: false, status: 'Manual' },
  { id: 3, name: 'Sarah Wilson', username: '@sarahdesigns', lastMsg: 'Thanks for the quick reply!', time: '1h', unread: false, status: 'AI Handled' },
  { id: 4, name: 'David G.', username: '@david_g', lastMsg: 'Price check on aisle 4 please.', time: '3h', unread: false, status: 'Escalated' },
  { id: 5, name: 'Elena R.', username: '@elena_run', lastMsg: 'Sent you the receipt.', time: '5h', unread: false, status: 'AI Handled' },
];

const MOCK_MESSAGES = [
  { id: 1, role: 'customer', content: 'Hi! I saw your ad for the Nike Air Max. Are they still in stock?', time: '10:05 AM' },
  { id: 2, role: 'ai', content: 'Hello! Yes, the Nike Air Max is currently in stock in sizes 7-12. Would you like to see our color options?', time: '10:05 AM', type: 'automated' },
  { id: 3, role: 'customer', content: 'Great! Do you have the midnight blue one in size 10?', time: '10:06 AM' },
  { id: 4, role: 'ai', content: 'Checking our inventory... Yes! We have 2 pairs left in Midnight Blue, size 10. They are priced at $149.99 with free shipping.', time: '10:06 AM', type: 'automated' },
  { id: 5, role: 'customer', content: 'How much for the sneakers?', time: '10:08 AM' },
];

const SUGGESTED_REPLIES = [
  "The Nike Air Max Midnight Blue is $149.99.",
  "Yes, we have them! Would you like a checkout link?",
  "I can offer a 10% discount if you order in the next hour."
];

export default function InboxPage() {
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);

  return (
    <div className="h-full flex flex-col p-8 lg:p-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight mb-2">Omni-Inbox</h1>
          <p className="text-muted-foreground text-lg">Centralized AI command center for all DM channels.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-white/5 bg-white/5 rounded-2xl h-12 px-6 font-bold gap-2">
            <Filter size={18} /> Filters
          </Button>
          <Button className="bg-primary hover:bg-primary/90 glow-primary rounded-2xl gap-2 h-12 px-6 font-bold">
            <MessageCircle size={18} /> New Chat
          </Button>
        </div>
      </div>

      <GlassCard className="flex-1 p-0 flex overflow-hidden border-white/[0.03] bg-white/[0.01]" variant="darker">
        {/* Sidebar */}
        <div className="w-96 border-r border-white/5 flex flex-col bg-black/20">
          <div className="p-6 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input className="pl-12 h-12 bg-white/[0.03] border-white/10 rounded-2xl text-sm font-medium focus-visible:ring-primary/50" placeholder="Search threads..." />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {MOCK_CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 rounded-3xl mb-1 relative group ${activeChat.id === chat.id ? 'bg-white/[0.05] shadow-[0_4px_12px_rgba(0,0,0,0.5)]' : 'hover:bg-white/[0.02]'}`}
                >
                  <div className="w-14 h-14 rounded-full bg-muted border border-white/10 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden relative group-hover:border-primary/50 transition-colors">
                    <img src={`https://picsum.photos/seed/${chat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
                    {chat.unread && <div className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-primary border-4 border-black" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`font-bold text-sm truncate ${chat.unread ? 'text-white' : 'text-muted-foreground group-hover:text-white transition-colors'}`}>{chat.name}</p>
                      <span className="text-[10px] text-muted-foreground font-medium">{chat.time}</span>
                    </div>
                    <p className={`text-xs truncate ${chat.unread ? 'text-white font-medium' : 'text-muted-foreground'}`}>{chat.lastMsg}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={`text-[9px] px-2 py-0 rounded-full border-none h-4 font-bold tracking-widest uppercase ${chat.status === 'AI Handled' ? 'bg-primary/10 text-primary' : 'bg-amber-500/10 text-amber-500'}`}>
                        {chat.status}
                      </Badge>
                    </div>
                  </div>
                  {activeChat.id === chat.id && (
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full glow-primary" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative bg-black/40">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted border border-white/10 flex items-center justify-center font-bold text-xs overflow-hidden">
                <img src={`https://picsum.photos/seed/${activeChat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-lg text-white tracking-tight">{activeChat.name}</p>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live DM
                  </span>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">• Instagram</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-white/5 bg-white/5 rounded-xl h-10 px-4 text-xs font-bold gap-2 group">
                <ExternalLink size={14} className="group-hover:text-primary transition-colors" /> Profile
              </Button>
              <Button className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl h-10 px-4 text-xs font-bold gap-2">
                <Phone size={14} fill="currentColor" /> Move to Voice
              </Button>
              <Separator orientation="vertical" className="h-6 bg-white/10 mx-2" />
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-xl">
                <MoreVertical size={20} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex justify-center mb-8">
                <Badge variant="outline" className="bg-white/5 border-white/10 rounded-full px-4 py-1 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                  Yesterday
                </Badge>
              </div>
              
              {MOCK_MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'customer' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                  <div className={`max-w-[70%] group ${msg.role === 'customer' ? 'order-1' : 'order-2'}`}>
                    <div className={`rounded-3xl p-5 text-sm leading-relaxed relative ${
                      msg.role === 'customer' 
                        ? 'bg-white/[0.05] text-white border border-white/5 rounded-tl-none' 
                        : 'bg-primary text-white rounded-tr-none glow-primary shadow-[0_8px_24px_rgba(104,20,247,0.3)]'
                    }`}>
                      {msg.content}
                      {msg.type === 'automated' && (
                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#0a0a0c] border border-primary/50 flex items-center justify-center text-primary shadow-2xl animate-float">
                          <Zap size={14} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <div className={`flex items-center gap-2 mt-3 ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                      <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                        {msg.time}
                      </p>
                      {msg.type === 'automated' && (
                        <Badge variant="outline" className="h-4 px-2 text-[8px] bg-primary/10 text-primary border-none font-bold tracking-tighter">AI AGENT</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-start">
                <div className="bg-white/[0.05] border border-white/5 rounded-2xl px-5 py-4 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce shadow-[0_0_8px_hsl(var(--primary))]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-100 shadow-[0_0_8px_hsl(var(--primary))]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-200 shadow-[0_0_8px_hsl(var(--primary))]" />
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* AI Suggestions Overlay */}
          <div className="p-8 space-y-4 bg-gradient-to-t from-[#020203] via-[#020203]/90 to-transparent border-t border-white/[0.03]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary tracking-widest uppercase">
                <Sparkles size={14} className="animate-pulse" /> Neural Reply Suggestions
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors">Generate More</Badge>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
              {SUGGESTED_REPLIES.map((reply, i) => (
                <button 
                  key={i}
                  className="px-6 py-3 bg-white/[0.03] border border-white/10 text-white rounded-[1.25rem] text-xs font-bold hover:bg-white/[0.08] hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 text-left shrink-0 max-w-[320px] shadow-lg backdrop-blur-md group"
                >
                  <span className="line-clamp-2">{reply}</span>
                  <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] text-primary uppercase font-black">Use Suggestion</span>
                    <ChevronRight size={10} className="text-primary" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-8 pb-8 pt-2">
            <GlassCard variant="darker" className="p-2 border-white/10 shadow-2xl rounded-[2rem] bg-white/[0.02]">
              <div className="relative flex items-center gap-2">
                <div className="p-3 text-muted-foreground hover:text-white cursor-pointer transition-colors">
                  <Zap size={20} />
                </div>
                <Input 
                  className="flex-1 h-14 bg-transparent border-none text-base placeholder:text-muted-foreground/50 focus-visible:ring-0" 
                  placeholder="Type a message or pick an AI suggestion above..." 
                />
                <Button size="icon" className="bg-primary hover:bg-primary/90 glow-primary rounded-2xl w-12 h-12 shrink-0 group">
                  <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
