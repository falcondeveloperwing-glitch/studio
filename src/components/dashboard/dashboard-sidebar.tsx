'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Inbox, 
  BrainCircuit, 
  Zap, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalAuth } from '@/hooks/use-local-auth';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Inbox', icon: Inbox, href: '/dashboard/inbox' },
  { label: 'Knowledge Base', icon: BrainCircuit, href: '/dashboard/knowledge' },
  { label: 'Automations', icon: Zap, href: '/dashboard/automations' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useLocalAuth();

  return (
    <div className="w-64 h-screen border-r border-white/5 flex flex-col bg-zinc-950 sticky top-0 z-50">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <Zap className="text-black fill-black" size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">ReplyRush</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive 
                  ? "bg-zinc-900 text-white font-medium" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
              )}>
                <item.icon size={18} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <div className="p-3 bg-zinc-900/50 border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-zinc-400" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Pro Fleet</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-normal">Your AI agents are monitoring 142 active threads.</p>
        </div>

        <button 
          onClick={logout} 
          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900 transition-colors group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-zinc-800">
              <img src={user?.avatar || `https://picsum.photos/seed/${user?.email}/100/100`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xs font-medium text-white truncate">{user?.displayName || 'User'}</p>
              <p className="text-[10px] text-zinc-500 truncate uppercase tracking-tighter">Business</p>
            </div>
          </div>
          <LogOut size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}
