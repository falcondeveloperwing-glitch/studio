'use client';

import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell, Zap, AlertCircle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const notifications = [
  {
    id: '1',
    title: 'High Intent Lead',
    description: 'Marcus Sterling is ready to checkout ($1,020).',
    time: '2m ago',
    type: 'success',
    unread: true
  },
  {
    id: '2',
    title: 'Automation Triggered',
    description: 'Price Inquiry logic applied to Elena Rossi.',
    time: '15m ago',
    type: 'info',
    unread: true
  },
  {
    id: '3',
    title: 'Lead Escalated',
    description: 'Manual review required for order #8492.',
    time: '1h ago',
    type: 'alert',
    unread: false
  },
  {
    id: '4',
    title: 'Monthly Report Ready',
    description: 'Your July performance summary is available.',
    time: '4h ago',
    type: 'info',
    unread: false
  }
];

export function NotificationsPanel() {
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-zinc-500 hover:text-white hover:bg-white/5">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-zinc-950 border-white/10 shadow-2xl" align="end">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-widest">Notifications</h4>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500">
            <MoreHorizontal size={14} />
          </Button>
        </div>
        <ScrollArea className="h-80">
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
                      <span className="text-[9px] text-zinc-600 font-bold uppercase whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-normal line-clamp-2">{n.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 border-t border-white/5">
          <Button variant="ghost" className="w-full h-8 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
