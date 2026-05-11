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
  User,
  Sparkles
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
    <div className="w-64 h-screen border-r border-white/10 flex flex-col bg-sidebar sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-primary">
            <Zap className="text-white fill-white" size={16} />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">ReplyRush</span>
        </Link>
      </div>

      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}>
                  <item.icon size={20} className={cn(
                    "transition-colors",
                    isActive ? "text-primary" : "group-hover:text-white"
                  )} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(104,20,247,0.5)]" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <div className="glass p-4 rounded-xl border-primary/20 relative overflow-hidden group mb-4">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 blur-2xl rounded-full" />
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-primary" size={16} />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Pro Plan</span>
          </div>
          <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">Unlock advanced AI personality models and unlimited leads.</p>
          <Button size="sm" className="w-full h-8 bg-primary hover:bg-primary/90 text-[11px] font-bold uppercase tracking-wider">Upgrade</Button>
        </div>

        <Separator className="bg-white/5 mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-muted border border-white/10 flex items-center justify-center text-xs font-bold">
              JS
            </div>
            <div>
              <p className="text-xs font-bold">John Smith</p>
              <p className="text-[10px] text-muted-foreground">john@nike.com</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/5 h-8 w-8">
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}