
"use client";

import React, { useState, useMemo } from 'react';
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
  ExternalLink,
  ChevronRight,
  Filter,
  Loader2
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, orderBy, limit, doc, addDoc, serverTimestamp } from 'firebase/firestore';

export default function InboxPage() {
  const { user } = useUser();
  const db = useFirestore();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Fetch Conversations
  const convQuery = useMemo(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'conversations'), orderBy('updatedAt', 'desc'), limit(20));
  }, [db, user]);

  const { data: chats, loading: chatsLoading } = useCollection(convQuery);

  // Fetch Messages for active chat
  const messagesQuery = useMemo(() => {
    if (!db || !user || !activeChatId) return null;
    return query(collection(db, 'users', user.uid, 'conversations', activeChatId, 'messages'), orderBy('timestamp', 'asc'));
  }, [db, user, activeChatId]);

  const { data: messages, loading: messagesLoading } = useCollection(messagesQuery);

  const activeChat = useMemo(() => chats?.find(c => c.id === activeChatId), [chats, activeChatId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !user || !activeChatId || !db) return;

    const content = messageInput;
    setMessageInput('');

    const messagesRef = collection(db, 'users', user.uid, 'conversations', activeChatId, 'messages');
    addDoc(messagesRef, {
      role: 'business',
      content,
      type: 'text',
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="h-full flex flex-col p-8 lg:p-12 space-y-8 animate-in fade-in duration-700">
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
              {chatsLoading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>
              ) : chats && chats.length > 0 ? (
                chats.map((chat) => (
                  <div 
                    key={chat.id} 
                    onClick={() => setActiveChatId(chat.id)}
                    className={`p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 rounded-3xl mb-1 relative group ${activeChatId === chat.id ? 'bg-white/[0.05] shadow-[0_4px_12px_rgba(0,0,0,0.5)]' : 'hover:bg-white/[0.02]'}`}
                  >
                    <div className="w-14 h-14 rounded-full bg-muted border border-white/10 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden relative group-hover:border-primary/50 transition-colors">
                      <img src={`https://picsum.photos/seed/${chat.avatarSeed || chat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
                      {chat.unread && <div className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-primary border-4 border-black" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-bold text-sm truncate ${chat.unread ? 'text-white' : 'text-muted-foreground group-hover:text-white transition-colors'}`}>{chat.customerName}</p>
                        <span className="text-[10px] text-muted-foreground font-medium">Just now</span>
                      </div>
                      <p className={`text-xs truncate ${chat.unread ? 'text-white font-medium' : 'text-muted-foreground'}`}>{chat.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-[9px] px-2 py-0 rounded-full border-none h-4 font-bold tracking-widest uppercase ${chat.status === 'AI Handled' ? 'bg-primary/10 text-primary' : 'bg-amber-500/10 text-amber-500'}`}>
                          {chat.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground italic">No conversations found.</div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative bg-black/40">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted border border-white/10 flex items-center justify-center font-bold text-xs overflow-hidden">
                    <img src={`https://picsum.photos/seed/${activeChat.avatarSeed || activeChat.id}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white tracking-tight">{activeChat.customerName}</p>
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
                  {messagesLoading ? (
                    <div className="flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
                  ) : messages?.map((msg) => (
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
                            Just now
                          </p>
                          {msg.type === 'automated' && (
                            <Badge variant="outline" className="h-4 px-2 text-[8px] bg-primary/10 text-primary border-none font-bold tracking-tighter">AI AGENT</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="px-8 pb-8 pt-2">
                <GlassCard variant="darker" className="p-2 border-white/10 shadow-2xl rounded-[2rem] bg-white/[0.02]">
                  <form className="relative flex items-center gap-2" onSubmit={handleSendMessage}>
                    <div className="p-3 text-muted-foreground hover:text-white cursor-pointer transition-colors">
                      <Zap size={20} />
                    </div>
                    <Input 
                      className="flex-1 h-14 bg-transparent border-none text-base placeholder:text-muted-foreground/50 focus-visible:ring-0" 
                      placeholder="Type a message or pick an AI suggestion..." 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 glow-primary rounded-2xl w-12 h-12 shrink-0 group">
                      <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </form>
                </GlassCard>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <MessageCircle size={40} className="opacity-20" />
              </div>
              <h2 className="font-headline text-2xl font-bold text-white mb-2">No Active Chat</h2>
              <p className="max-w-xs">Select a customer from the left to start viewing the AI logic and reply history.</p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
