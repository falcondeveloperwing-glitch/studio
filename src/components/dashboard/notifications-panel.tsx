
'use client';

import React, { useMemo } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell, Zap, AlertCircle, CheckCircle2, MoreHorizontal, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { query, collection, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

export function NotificationsPanel() {
  const { user } = useUser();
  const db = useFirestore();

  const notificationsQuery = useMemo(() => {
    if (!user) return null;
    return query(
      collection(db, 'users', user.uid, 'notifications'), 
      orderBy('timestamp', 'desc'), 
      limit(20)
    );
  }, [user, db]);

  const { data: notifications, loading } = useCollection(notificationsQuery);
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = async () => {
    if (!user) return;
    const unread = notifications.filter(n => n.unread);
    for (const n of unread) {
      const ref = doc(db, 'users', user.uid, 'notifications', n.id);
      updateDoc(ref, { unread: false });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-zinc-500 hover:text-white hover:bg-white/5">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-zinc-950 border-white/10 shadow-2xl" align="end">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-black uppercase tracking-widest">Notifications</h4>
            {unreadCount > 0 && <Badge className="bg-white/5 border-white/10 text-[9px] h-4">{unreadCount}</Badge>}
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500">
            <MoreHorizontal size={14} />
          </Button>
        </div>
        <ScrollArea className="h-80">
          {loading ? (
            <div className="flex items-center justify-center p-12 text-zinc-500"><Loader2 className="animate-spin" size={16} /></div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest">No notifications</div>
          ) : (
            <div className="divide-y divide-white/[0.02]">
              {notifications.map((n) => (
                <div key={n.id} className={`p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group ${n.unread ? 'bg-white/[0.01]' : ''}`}>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                      n.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                      n.type === 'alert' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                      'bg-white/5 border-white/10 text-zinc-500'
                    }`}>
                      {n.type === 'success' ? <CheckCircle2 size={14} /> : n.type === 'alert' ? <AlertCircle size={14} /> : <Zap size={14} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-[11px] font-bold text-white truncate">{n.title}</p>
                        <span className="text-[9px] text-zinc-600 font-bold uppercase whitespace-nowrap">
                          {n.timestamp ? formatDistanceToNow(new Date(n.timestamp), { addSuffix: true }) : ''}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-normal line-clamp-2">{n.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="p-3 border-t border-white/5">
          <Button 
            variant="ghost" 
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="w-full h-8 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white"
          >
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
