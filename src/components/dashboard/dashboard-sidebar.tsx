'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Inbox, 
  BrainCircuit, 
  Zap, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles,
  Command,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalAuth } from '@/hooks/use-local-auth';

const navItems = [
  { label: 'Intelligence', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Omni-Inbox', icon: Inbox, href: '/dashboard/inbox' },
  { label: 'Knowledge Base', icon: BrainCircuit, href: '/dashboard/knowledge' },
  { label: 'Workflows', icon: Zap, href: '/dashboard/automations' },
  { label: 'Deep Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Neural Settings', icon: Settings, href: '/dashboard/settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useLocalAuth();

  return (
    <div className="w-[340px] h-screen border-r border-white/[0.08] flex flex-col bg-background/80 backdrop-blur-3xl sticky top-0 z-[60]">
      <div className="absolute inset-0 noise z-0" />
      
      <div className="p-12 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-5 group">
          <div className="w-14 h-14 rounded-[1.5rem] bg-primary flex items-center justify-center glow-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
            <Zap className="text-white fill-white" size={28} />
          </div>
          <div>
            <span className="font-headline font-bold text-3xl tracking-tighter text-white">ReplyRush</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.3em]">Operational</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-8 py-4 space-y-16 relative z-10">
        <div>
          <p className="px-6 text-[11px] font-black text-muted-foreground/40 uppercase tracking-[0.5em] mb-8">Intelligence Fleet</p>
          <nav className="space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div whileHover={{ x: 6 }} className={cn(
                    "flex items-center justify-between px-6 py-5 rounded-[2rem] transition-all duration-500 group relative overflow-hidden",
                    isActive 
                      ? "bg-white/[0.08] text-white shadow-2xl ring-1 ring-white/10" 
                      : "text-muted-foreground/60 hover:bg-white/[0.03] hover:text-white"
                  )}>
                    <div className="flex items-center gap-5">
                      <item.icon size={22} className={cn(
                        "transition-all duration-500",
                        isActive ? "text-primary scale-110 glow-primary" : "group-hover:text-white"
                      )} />
                      <span className="font-bold text-lg tracking-tight">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={16} className="text-primary animate-pulse" />}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r-full glow-primary shadow-[0_0_20px_#6814f7]" />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-6">
          <Button variant="outline" className="w-full h-16 border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.06] rounded-[1.75rem] flex items-center justify-between px-8 group border-dashed transition-all duration-700">
            <div className="flex items-center gap-4">
              <Command size={20} className="text-muted-foreground transition-transform group-hover:rotate-12" />
              <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">Neural Terminal</span>
            </div>
            <span className="text-[11px] font-black px-3 py-1.5 rounded-xl bg-white/10 text-muted-foreground group-hover:text-white group-hover:bg-primary transition-all shadow-inner">⌘ K</span>
          </Button>
        </div>
      </div>

      <div className="p-10 relative z-10">
        <div className="glass p-8 rounded-[2.5rem] border-primary/30 relative overflow-hidden group mb-10 cursor-pointer shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <ShieldCheck className="text-primary animate-pulse" size={20} />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Elite Priority</span>
          </div>
          <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed relative z-10">Neural fleet is currently prioritizing high-intent threads.</p>
        </div>

        <div onClick={logout} className="flex items-center justify-between bg-white/[0.02] border border-white/[0.08] p-5 rounded-[2.25rem] group hover:bg-white/[0.06] transition-all duration-500 cursor-pointer shadow-2xl">
          <div className="flex items-center gap-5 min-w-0">
            <div className="w-14 h-14 rounded-full border-2 border-white/10 overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-700">
              <img src={user?.avatar || `https://picsum.photos/seed/${user?.email}/150/150`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-white truncate group-hover:text-primary transition-colors">{user?.displayName || 'Member'}</p>
              <p className="text-[10px] text-muted-foreground/50 truncate font-black uppercase tracking-[0.3em]">{user?.role || 'User'}</p>
            </div>
          </div>
          <LogOut size={22} className="text-muted-foreground group-hover:text-primary transition-all mr-2 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}