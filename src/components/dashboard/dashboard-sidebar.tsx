'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Inbox, 
  Database, 
  Zap, 
  BarChart3, 
  Settings, 
  LogOut,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { useLocalAuth } from '@/hooks/use-local-auth';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Inbox', icon: Inbox, href: '/dashboard/inbox' },
  { label: 'Knowledge Base', icon: Database, href: '/dashboard/knowledge' },
  { label: 'Automations', icon: Zap, href: '/dashboard/automations' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useLocalAuth();

  return (
    <div className="w-64 h-screen border-r border-white/5 flex flex-col bg-zinc-950 sticky top-0 z-50 overflow-hidden">
      <div className="p-8 pb-10">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20 shadow-2xl">
            <Zap className="text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" size={20} />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight text-white uppercase">
            Reply<span className="text-zinc-500">Rush</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 group/item",
                isActive 
                  ? "bg-white/5 text-white font-semibold" 
                  : "text-zinc-500 hover:text-white hover:bg-white/[0.02]"
              )}>
                <item.icon size={18} className={cn("transition-colors", isActive ? "text-white" : "text-zinc-600 group-hover/item:text-zinc-400")} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={14} className="text-zinc-500" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Workspace</span>
          </div>
          <p className="text-[11px] text-zinc-600 leading-normal font-medium">Monitoring 142 active customer conversations.</p>
        </div>

        <button 
          onClick={logout} 
          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.03] transition-colors group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-zinc-900 shadow-lg">
              <img src={user?.avatar || `https://picsum.photos/seed/${user?.email}/100/100`} alt="Profile" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xs font-bold text-white truncate">{user?.displayName || 'Admin'}</p>
              <p className="text-[9px] text-zinc-500 truncate uppercase font-bold tracking-widest">Premium Fleet</p>
            </div>
          </div>
          <LogOut size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}
