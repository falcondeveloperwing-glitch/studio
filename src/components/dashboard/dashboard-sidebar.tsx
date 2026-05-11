"use client";

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
  Sparkles,
  Command
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Inbox', icon: Inbox, href: '/dashboard/inbox' },
  { label: 'AI Knowledge', icon: BrainCircuit, href: '/dashboard/knowledge' },
  { label: 'Automations', icon: Zap, href: '/dashboard/automations' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 h-screen border-r border-white/[0.05] flex flex-col bg-[#020203] sticky top-0 z-50">
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-500">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <div>
            <span className="font-headline font-bold text-xl tracking-tight text-white">ReplyRush</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">v2.4 Pro</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-4 py-4 space-y-8">
        <div>
          <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Management</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                    isActive 
                      ? "bg-white/[0.05] text-white" 
                      : "text-muted-foreground hover:bg-white/[0.03] hover:text-white"
                  )}>
                    <item.icon size={18} className={cn(
                      "transition-all duration-300",
                      isActive ? "text-primary scale-110" : "group-hover:text-white"
                    )} />
                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full glow-primary" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-4">
          <Button variant="outline" className="w-full h-11 border-white/5 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-between px-4 group">
            <div className="flex items-center gap-2">
              <Command size={14} className="text-muted-foreground" />
              <span className="text-xs font-bold text-white">Shortcuts</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-muted-foreground group-hover:text-white">⌘ K</span>
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="glass p-5 rounded-[2rem] border-primary/20 relative overflow-hidden group mb-6 cursor-pointer">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-700" />
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <Sparkles className="text-primary" size={16} />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Pro Status</span>
          </div>
          <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed relative z-10">You've reached your lead limit for this month.</p>
          <Button size="sm" className="w-full h-9 bg-primary hover:bg-primary/90 text-[10px] font-bold uppercase tracking-widest rounded-xl relative z-10">Expand Pipeline</Button>
        </div>

        <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.05] p-3 rounded-[1.5rem] group hover:bg-white/[0.05] transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden">
              <img src="https://picsum.photos/seed/admin/100/100" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">John Smith</p>
              <p className="text-[10px] text-muted-foreground truncate font-medium">john@nike.com</p>
            </div>
          </div>
          <LogOut size={16} className="text-muted-foreground group-hover:text-white transition-colors mr-2" />
        </div>
      </div>
    </div>
  );
}
