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
  Video, 
  Sparkles, 
  Zap,
  MessageCircle,
  Clock,
  ExternalLink
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
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-headline text-2xl font-bold">Inbox</h1>
          <p className="text-sm text-muted-foreground">Manage your customer conversations with AI assistance.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-xl gap-2">
          <MessageCircle size={16} /> New Conversation
        </Button>
      </div>

      <GlassCard className="flex-1 p-0 flex overflow-hidden border-white/5 bg-white/[0.02]">
        {/* Sidebar */}
        <div className="w-80 border-r border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input className="pl-10 h-10 bg-white/5 border-white/10 rounded-xl text-sm" placeholder="Search conversations..." />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {MOCK_CHATS.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors hover:bg-white/5 ${activeChat.id === chat.id ? 'bg-white/5 border-l-4 border-primary' : ''}`}
              >
                <div className="w-12 h-12 rounded-full bg-muted border border-white/10 flex items-center justify-center font-bold text-xs shrink-0">
                  {chat.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-sm truncate">{chat.name}</p>
                    <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={`text-[9px] px-1.5 py-0 rounded-md border-white/10 h-4 ${chat.status === 'AI Handled' ? 'text-primary' : 'text-amber-500'}`}>
                      {chat.status}
                    </Badge>
                    {chat.unread && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted border border-white/10 flex items-center justify-center font-bold text-xs">
                {activeChat.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-bold text-sm">{activeChat.name}</p>
                <p className="text-[10px] text-primary flex items-center gap-1">
                  <Clock size={10} /> Active now · Instagram
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
                <ExternalLink size={18} />
              </Button>
              <Button variant="outline" size="sm" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs gap-1.5 h-9">
                <Phone size={14} fill="currentColor" /> Redirect to WhatsApp
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
                <MoreVertical size={18} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold bg-white/5 px-3 py-1 rounded-full">Today</span>
              </div>
              {MOCK_MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[70%] group ${msg.role === 'customer' ? 'order-1' : 'order-2'}`}>
                    <div className={`rounded-2xl p-4 text-sm relative ${
                      msg.role === 'customer' 
                        ? 'bg-secondary text-white rounded-tl-none' 
                        : 'bg-primary text-white rounded-tr-none glow-primary'
                    }`}>
                      {msg.content}
                      {msg.type === 'automated' && (
                        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-background border border-primary flex items-center justify-center text-primary shadow-lg">
                          <Zap size={12} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <p className={`text-[10px] text-muted-foreground mt-1.5 ${msg.role === 'customer' ? 'text-left' : 'text-right'}`}>
                      {msg.time} {msg.type === 'automated' ? '· AI Automated' : ''}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl px-4 py-3 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce delay-200" />
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* AI Suggestions Overlay */}
          <div className="px-6 py-4 space-y-3 bg-gradient-to-t from-background via-background/90 to-transparent border-t border-white/5">
            <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2">
              <Sparkles size={14} /> AI SUGGESTED REPLIES
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_REPLIES.map((reply, i) => (
                <button 
                  key={i}
                  className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-xl text-xs font-medium hover:bg-primary/20 transition-all text-left max-w-[300px]"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-background border-t border-white/5">
            <div className="relative">
              <Input 
                className="pr-24 h-14 bg-white/5 border-white/10 rounded-2xl text-sm placeholder:text-muted-foreground focus-visible:ring-primary" 
                placeholder="Type a message or use AI suggestions above..." 
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                  <Zap size={18} />
                </Button>
                <Button size="icon" className="bg-primary hover:bg-primary/90 glow-primary rounded-xl w-10 h-10">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}