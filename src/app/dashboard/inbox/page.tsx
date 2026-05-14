
'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Send, 
  MoreVertical, 
  ArrowLeft,
  History,
  Loader2,
  ChevronDown
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, addDoc, updateDoc, serverTimestamp, limit } from 'firebase/firestore';

export default function InboxPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const db = useFirestore();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [showMobileList, setShowMobileList] = useState(true);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [limitCount, setLimitCount] = useState(25);

  // Paginated conversations fetch
  const conversationsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(db, 'users', user.uid, 'conversations'), 
      orderBy('updatedAt', 'desc'),
      limit(limitCount)
    );
  }, [user, db, limitCount]);

  const { data: conversations, loading: conversationsLoading } = useCollection(conversationsQuery);

  // Messages fetch for active chat
  const messagesQuery = useMemoFirebase(() => {
    if (!user || !activeChatId) return null;
    return query(
      collection(db, 'users', user.uid, 'conversations', activeChatId, 'messages'), 
      orderBy('timestamp', 'asc'),
      limit(50)
    );
  }, [user, activeChatId, db]);

  const { data: messages, loading: messagesLoading } = useCollection(messagesQuery);

  const activeChat = conversations.find(c => c.id === activeChatId);

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setShowMobileList(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatId || !user) return;

    setSending(true);
    const text = inputText;
    setInputText('');

    try {
      addDoc(collection(db, 'users', user.uid, 'conversations', activeChatId, 'messages'), {
        role: 'business',
        content: text,
        type: 'text',
        timestamp: new Date().toISOString()
      });

      updateDoc(doc(db, 'users', user.uid, 'conversations', activeChatId), {
        lastMessage: text,
        updatedAt: serverTimestamp(),
        unread: false
      });
    } catch (err) {
      toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden w-full max-w-7xl mx-auto transition-all duration-300">
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-zinc-950/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-bold tracking-tight">Inbox</h1>
          <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-white/10 text-zinc-500 font-bold px-2 py-0">
            {conversations.length} Threads Loaded
          </Badge>
        </div>
        <div className="flex items-center gap-2">
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
          {conversationsLoading ? (
            <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-zinc-700" /></div>
          ) : (
            <ScrollArea className="flex-1">
              <div className="divide-y divide-white/[0.02]">
                {conversations.map((chat: any) => (
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
                      </div>
                      <p className={cn("text-[11px] truncate leading-tight", chat.unread ? "text-zinc-300" : "text-zinc-500")}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
                {conversations.length >= limitCount && (
                  <button 
                    onClick={() => setLimitCount(prev => prev + 25)}
                    className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    Load More <ChevronDown size={12} />
                  </button>
                )}
              </div>
            </ScrollArea>
          )}
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
              </div>

              <ScrollArea className="flex-1 p-4 sm:p-6">
                <div className="space-y-4 max-w-2xl mx-auto w-full">
                  {messagesLoading ? (
                    <div className="flex justify-center"><Loader2 className="animate-spin text-zinc-700" /></div>
                  ) : (
                    messages.map((msg: any, i: number) => (
                      <div key={i} className={cn(
                        "flex flex-col", 
                        msg.role === 'customer' ? "items-start" : "items-end",
                        "mt-4"
                      )}>
                        <div className="max-w-[90%] relative group">
                          <div className={cn(
                            "rounded-xl px-4 py-2.5 text-xs leading-relaxed break-words",
                            msg.role === 'customer' 
                              ? "bg-zinc-900 text-zinc-400 border border-white/5" 
                              : "bg-white text-zinc-950 font-medium"
                          )}>
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {sending && (
                    <div className="flex flex-col items-end mt-4">
                      <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 flex items-center gap-3">
                        <Loader2 size={12} className="animate-spin text-zinc-500" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Syncing...</span>
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
                    <Button type="submit" disabled={!inputText.trim()} size="icon" className="bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl w-11 h-11 shrink-0 shadow-2xl">
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
      </div>
    </div>
  );
}
